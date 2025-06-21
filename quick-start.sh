# Quick start script for nvx.3rb on Artix Linux

echo "🚀 Quick Start for nvx.3rb on Artix Linux"

# Check if we're in the right place
if [[ ! -d "nvx.3rb" ]]; then
    echo "❌ nvx.3rb directory not found!"
    echo "Please run: gh repo clone wolfomani/nvx.3rb"
    exit 1
fi

cd nvx.3rb

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    sudo pacman -S --noconfirm nodejs npm
fi

# Copy environment file
if [[ -f "$HOME/.env" ]]; then
    cp "$HOME/.env" .env.local
    echo "✅ Environment variables copied"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create development script
cat > dev.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting development server..."
npm run dev
EOF

chmod +x dev.sh

echo "✅ Setup complete!"
echo "🌐 Run './dev.sh' to start development server"
