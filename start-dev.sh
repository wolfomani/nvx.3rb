echo "🚀 Starting dev.3db AI Platform on Artix Linux"
echo "================================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Installing..."
    sudo pacman -S --noconfirm nodejs npm
fi

echo "📋 System Information:"
echo "  Node.js: $(node --version)"
echo "  npm: $(npm --version)"
echo "  OS: $(uname -o)"
echo "  Directory: $(pwd)"
echo ""

# Fix environment variables
echo "🔧 Fixing environment variables..."
bash fix-env.sh

# Install dependencies if needed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check for common issues
echo "🔍 Checking for issues..."

# Check package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    exit 1
fi

# Check Next.js config
if [ ! -f "next.config.mjs" ]; then
    echo "⚠️  Creating next.config.mjs..."
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

echo ""
echo "🌐 Starting development server..."
echo "   URL: http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo ""

# Start development server
npm run dev
