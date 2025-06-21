# Quick setup script for Artix Linux
# This is a simplified version for immediate use

echo "🚀 Quick Setup for dev.3db on Artix Linux"

# Install Node.js and npm
echo "📦 Installing Node.js and npm..."
sudo pacman -S --noconfirm nodejs npm git

# Verify installation
node --version
npm --version

# Create project directory
mkdir -p ~/dev.3db-platform
cd ~/dev.3db-platform

# Initialize project
npm init -y

# Install Next.js and dependencies
echo "📦 Installing Next.js..."
npm install next@14.2.16 react react-dom typescript @types/node @types/react @types/react-dom

# Install shadcn/ui
echo "🎨 Setting up shadcn/ui..."
npx shadcn@latest init -y

# Create your .env.local file (copy from your existing .env)
cp ~/.env .env.local 2>/dev/null || echo "Please create .env.local with your environment variables"

echo "✅ Quick setup complete!"
echo "🌐 Run 'npm run dev' to start development server"
