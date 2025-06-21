# =============================================================================
# Artix Linux Development Environment Setup Script
# For dev.3db AI Platform - Complete Installation
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_header() {
    echo -e "\n${PURPLE}=== $1 ===${NC}\n"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_warning "Running as root. This script should be run as a regular user with sudo privileges."
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Update system
update_system() {
    log_header "Updating Artix Linux System"
    
    log_info "Updating package database..."
    sudo pacman -Sy --noconfirm
    
    log_info "Upgrading system packages..."
    sudo pacman -Su --noconfirm
    
    log_success "System updated successfully"
}

# Install base development tools
install_base_tools() {
    log_header "Installing Base Development Tools"
    
    local packages=(
        "base-devel"
        "git"
        "curl"
        "wget"
        "unzip"
        "vim"
        "nano"
        "htop"
        "tree"
        "jq"
        "openssl"
    )
    
    log_info "Installing base development packages..."
    for package in "${packages[@]}"; do
        log_info "Installing $package..."
        sudo pacman -S --noconfirm "$package" || log_warning "Failed to install $package"
    done
    
    log_success "Base development tools installed"
}

# Install Node.js and npm
install_nodejs() {
    log_header "Installing Node.js and npm"
    
    log_info "Installing Node.js and npm..."
    sudo pacman -S --noconfirm nodejs npm
    
    # Verify installation
    node_version=$(node --version 2>/dev/null || echo "not installed")
    npm_version=$(npm --version 2>/dev/null || echo "not installed")
    
    log_info "Node.js version: $node_version"
    log_info "npm version: $npm_version"
    
    if [[ "$node_version" == "not installed" ]]; then
        log_error "Node.js installation failed"
        exit 1
    fi
    
    # Install global packages
    log_info "Installing global npm packages..."
    npm install -g typescript tsx @types/node
    
    log_success "Node.js and npm installed successfully"
}

# Install Docker (optional)
install_docker() {
    log_header "Installing Docker (Optional)"
    
    read -p "Do you want to install Docker? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Installing Docker..."
        sudo pacman -S --noconfirm docker docker-compose
        
        log_info "Starting Docker service..."
        sudo rc-service docker start
        sudo rc-update add docker default
        
        log_info "Adding user to docker group..."
        sudo usermod -aG docker $USER
        
        log_success "Docker installed successfully"
        log_warning "Please log out and log back in for docker group changes to take effect"
    else
        log_info "Skipping Docker installation"
    fi
}

# Setup project directory
setup_project() {
    log_header "Setting Up Project Directory"
    
    local project_dir="$HOME/dev.3db-platform"
    
    if [[ -d "$project_dir" ]]; then
        log_warning "Project directory already exists: $project_dir"
        read -p "Remove existing directory and start fresh? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf "$project_dir"
            log_info "Removed existing project directory"
        else
            log_info "Using existing project directory"
            cd "$project_dir"
            return 0
        fi
    fi
    
    log_info "Creating project directory: $project_dir"
    mkdir -p "$project_dir"
    cd "$project_dir"
    
    # Initialize git repository
    log_info "Initializing git repository..."
    git init
    
    log_success "Project directory setup complete"
}

# Create package.json
create_package_json() {
    log_header "Creating package.json"
    
    cat > package.json << 'EOF'
{
  "name": "dev-3db-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test-apis": "tsx scripts/test-api-keys.ts"
  },
  "dependencies": {
    "next": "14.2.16",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@radix-ui/react-accordion": "latest",
    "@radix-ui/react-alert-dialog": "latest",
    "@radix-ui/react-aspect-ratio": "latest",
    "@radix-ui/react-avatar": "latest",
    "@radix-ui/react-checkbox": "latest",
    "@radix-ui/react-collapsible": "latest",
    "@radix-ui/react-context-menu": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-dropdown-menu": "latest",
    "@radix-ui/react-hover-card": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-menubar": "latest",
    "@radix-ui/react-navigation-menu": "latest",
    "@radix-ui/react-popover": "latest",
    "@radix-ui/react-progress": "latest",
    "@radix-ui/react-radio-group": "latest",
    "@radix-ui/react-scroll-area": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-separator": "latest",
    "@radix-ui/react-slider": "latest",
    "@radix-ui/react-slot": "latest",
    "@radix-ui/react-switch": "latest",
    "@radix-ui/react-tabs": "latest",
    "@radix-ui/react-toast": "latest",
    "@radix-ui/react-toggle": "latest",
    "@radix-ui/react-toggle-group": "latest",
    "@radix-ui/react-tooltip": "latest",
    "@hookform/resolvers": "^3.9.1",
    "@neondatabase/serverless": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "latest",
    "date-fns": "4.1.0",
    "embla-carousel-react": "latest",
    "framer-motion": "latest",
    "input-otp": "latest",
    "jsonwebtoken": "latest",
    "bcryptjs": "latest",
    "lucide-react": "^0.454.0",
    "next-auth": "latest",
    "next-themes": "latest",
    "react-day-picker": "latest",
    "react-hook-form": "latest",
    "react-resizable-panels": "latest",
    "recharts": "latest",
    "sonner": "latest",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "latest",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/jsonwebtoken": "latest",
    "@types/bcryptjs": "latest",
    "typescript": "^5",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5",
    "eslint": "^8",
    "eslint-config-next": "14.2.16",
    "tsx": "^4.6.2"
  }
}
EOF
    
    log_success "package.json created"
}

# Install project dependencies
install_dependencies() {
    log_header "Installing Project Dependencies"
    
    log_info "Installing npm dependencies..."
    npm install
    
    log_info "Installing shadcn/ui..."
    npx shadcn@latest init -y
    
    log_success "Dependencies installed successfully"
}

# Setup environment file
setup_environment() {
    log_header "Setting Up Environment Variables"
    
    # Copy your existing .env content
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
POSTGRES_URL="postgres://neondb_owner:npg_FSw8TjpqKh6W@ep-plain-salad-a4ad7g2y-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://neondb_owner:npg_FSw8TjpqKh6W@ep-plain-salad-a4ad7g2y-pooler.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"

# Redis/KV
KV_URL="rediss://default:AWXWAAIjcDE2OTY2ZGNmN2Q0YjU0NzYxOTY3MTZkOTg3ZGEzYTljM3AxMA@fancy-bison-26070.upstash.io:6379"
KV_REST_API_TOKEN="AWXWAAIjcDE2OTY2ZGNmN2Q0YjU0NzYxOTY3MTZkOTg3ZGEzYTljM3AxMA"
KV_REST_API_URL="https://fancy-bison-26070.upstash.io"

# Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_YlLyq0hMRbHd2KHp_lBQYYPHBsGvyz1Qo0GflvAXCq3QyKb"

# EdgeDB
EDGEDB_INSTANCE="vercel-jQ3uxSCRh2HihGUKu1ebDTTR/edgedb-blue-flower"
EDGEDB_SECRET_KEY="nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pIjpbInZlcmNlbC1qUTN1eFNDUmgySGloR1VLdTFlYkRUVFIvZWRnZWRiLWJsdWUtZmxvd2VyIl0sImVkYi5yLmFsbCI6dHJ1ZSwiaWF0IjoxNzUwNDI2MDcwLCJpc3MiOiJhd3MuZWRnZWRiLmNsb3VkIiwianRpIjoiWFNYWXNrM2FFZkNaVElmQ1NzaDVrdyIsInN1YiI6IlhJNkVsRTNhRWZDWlRNTTZxY2V4NmcifQ.GpG634_i_O6ElIVgJ8do60ALXXSPhFHETrtrARTZeDXort5LtdbaLB2E8JzYjUVcwhx2QU9CM662nsFbiJwoYw"
EOF
    
    log_success "Environment file created"
}

# Create basic Next.js structure
create_nextjs_structure() {
    log_header "Creating Next.js Project Structure"
    
    # Create directories
    mkdir -p {app,components,lib,public,scripts}
    mkdir -p {components/ui,components/auth,components/layout}
    mkdir -p app/{api,auth}
    
    # Create basic files
    cat > next.config.mjs << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
      },
    ],
    unoptimized: true,
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

    cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOF

    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

    log_success "Next.js project structure created"
}

# Setup development scripts
setup_dev_scripts() {
    log_header "Setting Up Development Scripts"
    
    cat > dev.sh << 'EOF'
#!/bin/bash
# Development server startup script

echo "🚀 Starting dev.3db AI Platform..."
echo "📍 Environment: Development"
echo "🌐 URL: http://localhost:3000"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start development server
npm run dev
EOF

    cat > build.sh << 'EOF'
#!/bin/bash
# Production build script

echo "🏗️  Building dev.3db AI Platform for production..."

# Type check
echo "🔍 Running type check..."
npm run type-check

# Build
echo "📦 Building application..."
npm run build

echo "✅ Build completed successfully!"
EOF

    cat > test-apis.sh << 'EOF'
#!/bin/bash
# API testing script

echo "🧪 Testing API connections..."
npm run test-apis
EOF

    # Make scripts executable
    chmod +x dev.sh build.sh test-apis.sh
    
    log_success "Development scripts created"
}

# Final setup and instructions
final_setup() {
    log_header "Final Setup and Instructions"
    
    log_success "🎉 Artix Linux development environment setup complete!"
    echo ""
    log_info "📁 Project location: $(pwd)"
    log_info "🔧 Next steps:"
    echo ""
    echo "  1. Start development server:"
    echo "     ${CYAN}./dev.sh${NC} or ${CYAN}npm run dev${NC}"
    echo ""
    echo "  2. Build for production:"
    echo "     ${CYAN}./build.sh${NC} or ${CYAN}npm run build${NC}"
    echo ""
    echo "  3. Test API connections:"
    echo "     ${CYAN}./test-apis.sh${NC} or ${CYAN}npm run test-apis${NC}"
    echo ""
    echo "  4. Access your application:"
    echo "     ${CYAN}http://localhost:3000${NC}"
    echo ""
    log_info "🔑 Environment variables are already configured in .env.local"
    log_info "📚 Check README.md for detailed documentation"
    echo ""
    log_warning "⚠️  If you installed Docker, please log out and log back in for group changes to take effect"
}

# Main execution
main() {
    log_header "Artix Linux Development Environment Setup"
    log_info "Setting up dev.3db AI Platform development environment..."
    echo ""
    
    check_root
    update_system
    install_base_tools
    install_nodejs
    install_docker
    setup_project
    create_package_json
    install_dependencies
    setup_environment
    create_nextjs_structure
    setup_dev_scripts
    final_setup
}

# Run main function
main "$@"
EOF
