# =============================================================================
# Artix Linux Setup Script for Existing nvx.3rb Repository
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_header() { echo -e "\n${PURPLE}=== $1 ===${NC}\n"; }

# Check if we're in the right directory
check_repository() {
    log_header "Checking Repository"
    
    if [[ ! -d "nvx.3rb" ]]; then
        log_error "nvx.3rb directory not found!"
        log_info "Please run this script from the directory containing nvx.3rb"
        log_info "Current directory: $(pwd)"
        exit 1
    fi
    
    cd nvx.3rb
    log_success "Found nvx.3rb repository"
    log_info "Current directory: $(pwd)"
}

# Install system dependencies
install_system_deps() {
    log_header "Installing System Dependencies"
    
    log_info "Updating package database..."
    sudo pacman -Sy --noconfirm
    
    local packages=(
        "nodejs"
        "npm" 
        "git"
        "curl"
        "wget"
        "unzip"
        "base-devel"
    )
    
    for package in "${packages[@]}"; do
        log_info "Installing $package..."
        sudo pacman -S --noconfirm "$package" || log_warning "Failed to install $package"
    done
    
    # Verify Node.js installation
    node_version=$(node --version 2>/dev/null || echo "not installed")
    npm_version=$(npm --version 2>/dev/null || echo "not installed")
    
    log_info "Node.js version: $node_version"
    log_info "npm version: $npm_version"
    
    if [[ "$node_version" == "not installed" ]]; then
        log_error "Node.js installation failed"
        exit 1
    fi
    
    log_success "System dependencies installed"
}

# Setup environment variables
setup_environment() {
    log_header "Setting Up Environment Variables"
    
    # Check if .env exists in home directory
    if [[ -f "$HOME/.env" ]]; then
        log_info "Found .env file in home directory, copying..."
        cp "$HOME/.env" .env.local
        log_success "Environment variables copied from $HOME/.env"
    elif [[ -f ".env" ]]; then
        log_info "Found .env file in repository, renaming to .env.local..."
        mv .env .env.local
        log_success "Environment variables configured"
    else
        log_warning "No .env file found, creating template..."
        cat > .env.local << 'EOF'
# Google OAuth
GOOGLE_CLIENT_ID="83220633911-0f9bi6pbjn1dk9s6mte62ivucl6vvfoo.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"

# NextAuth
NEXTAUTH_SECRET="dev3db-super-secret-key-2024"
NEXTAUTH_URL="http://localhost:3000"

# AI Providers
TOGETHER_API_KEY="1bce60114d699d9ab9cefe3fa0e6799d468c9653ed1859617672e2c686c7706b"
GROQ_API_KEY="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"
MISTRAL_API_KEY="bXgjjPQ9sXZY8zCtncPzhKJPc3XSilLR"
XAI_API_KEY="xai-BlV6nlcakzA0mAPqpgtmCnv8YJimjTT36DpimSYPBpnGJdFrcAjm5v4NvXc0XjkcHgnaJpjIArstHd7F"

# Database
DATABASE_URL="postgres://neondb_owner:npg_FSw8TjpqKh6W@ep-plain-salad-a4ad7g2y-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
EOF
        log_info "Please update .env.local with your actual API keys"
    fi
}

# Install project dependencies
install_dependencies() {
    log_header "Installing Project Dependencies"
    
    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        log_warning "No package.json found, creating one..."
        npm init -y
    fi
    
    log_info "Installing dependencies..."
    npm install
    
    # Install additional dependencies if needed
    log_info "Installing additional dependencies..."
    npm install --save-dev tsx @types/node
    
    log_success "Dependencies installed successfully"
}

# Setup development scripts
setup_scripts() {
    log_header "Setting Up Development Scripts"
    
    # Create development script
    cat > dev.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting dev.3db AI Platform..."
echo "📍 Environment: Development"
echo "🌐 URL: http://localhost:3000"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start development server
npm run dev
EOF

    # Create build script
    cat > build.sh << 'EOF'
#!/bin/bash
echo "🏗️  Building dev.3db AI Platform..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
npm run build

echo "✅ Build completed!"
EOF

    # Create API test script
    cat > test-apis.sh << 'EOF'
#!/bin/bash
echo "🧪 Testing API connections..."

# Check if test script exists
if [ -f "scripts/test-api-keys.ts" ]; then
    npx tsx scripts/test-api-keys.ts
else
    echo "⚠️  Test script not found. Creating basic test..."
    node -e "
    console.log('🔍 Checking environment variables...');
    const requiredVars = ['TOGETHER_API_KEY', 'GROQ_API_KEY', 'MISTRAL_API_KEY', 'XAI_API_KEY'];
    requiredVars.forEach(varName => {
        const value = process.env[varName];
        console.log(\`\${varName}: \${value ? '✅ Set' : '❌ Missing'}\`);
    });
    "
fi
EOF

    # Make scripts executable
    chmod +x dev.sh build.sh test-apis.sh
    
    log_success "Development scripts created"
}

# Fix common issues
fix_common_issues() {
    log_header "Fixing Common Issues"
    
    # Create missing directories
    mkdir -p {public,styles,components,lib,app}
    
    # Fix package.json scripts if needed
    if [[ -f "package.json" ]]; then
        log_info "Updating package.json scripts..."
        
        # Use node to update package.json
        node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        pkg.scripts = pkg.scripts || {};
        pkg.scripts.dev = pkg.scripts.dev || 'next dev';
        pkg.scripts.build = pkg.scripts.build || 'next build';
        pkg.scripts.start = pkg.scripts.start || 'next start';
        pkg.scripts.lint = pkg.scripts.lint || 'next lint';
        
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
        console.log('✅ Package.json scripts updated');
        "
    fi
    
    # Create basic next.config.mjs if missing
    if [[ ! -f "next.config.mjs" && ! -f "next.config.js" ]]; then
        log_info "Creating next.config.mjs..."
        cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
EOF
    fi
    
    log_success "Common issues fixed"
}

# Test the setup
test_setup() {
    log_header "Testing Setup"
    
    # Test Node.js
    log_info "Testing Node.js..."
    node --version
    
    # Test npm
    log_info "Testing npm..."
    npm --version
    
    # Test if we can run npm scripts
    if [[ -f "package.json" ]]; then
        log_info "Testing npm scripts..."
        npm run --silent 2>/dev/null || log_warning "Some npm scripts may not work"
    fi
    
    # Check environment variables
    log_info "Checking environment variables..."
    if [[ -f ".env.local" ]]; then
        log_success ".env.local file exists"
    else
        log_warning ".env.local file missing"
    fi
    
    log_success "Setup test completed"
}

# Final instructions
show_instructions() {
    log_header "Setup Complete! 🎉"
    
    echo ""
    log_success "Your dev.3db AI Platform is ready for development!"
    echo ""
    log_info "📁 Project location: $(pwd)"
    echo ""
    log_info "🚀 Quick start commands:"
    echo ""
    echo "  ${CYAN}# Start development server${NC}"
    echo "  ${CYAN}./dev.sh${NC} or ${CYAN}npm run dev${NC}"
    echo ""
    echo "  ${CYAN}# Build for production${NC}"
    echo "  ${CYAN}./build.sh${NC} or ${CYAN}npm run build${NC}"
    echo ""
    echo "  ${CYAN}# Test API connections${NC}"
    echo "  ${CYAN}./test-apis.sh${NC}"
    echo ""
    echo "  ${CYAN}# Access your application${NC}"
    echo "  ${CYAN}http://localhost:3000${NC}"
    echo ""
    log_info "🔧 Configuration files:"
    echo "  • .env.local - Environment variables"
    echo "  • package.json - Project dependencies"
    echo "  • next.config.mjs - Next.js configuration"
    echo ""
    log_warning "📝 Next steps:"
    echo "  1. Review and update .env.local with your API keys"
    echo "  2. Run './dev.sh' to start development"
    echo "  3. Open http://localhost:3000 in your browser"
    echo ""
}

# Main execution
main() {
    log_header "Artix Linux Setup for nvx.3rb Repository"
    
    check_repository
    install_system_deps
    setup_environment
    install_dependencies
    setup_scripts
    fix_common_issues
    test_setup
    show_instructions
}

# Run main function
main "$@"
