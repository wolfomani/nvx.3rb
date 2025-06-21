echo "🧪 Testing dev.3db Platform Setup"
echo "=================================="

# Test Node.js
echo "📋 Node.js Information:"
node --version
npm --version
echo ""

# Test environment variables
echo "🔑 Environment Variables:"
if [ -f ".env.local" ]; then
    echo "✅ .env.local exists"
    echo "   Variables count: $(grep -c "=" .env.local)"
else
    echo "❌ .env.local missing"
fi
echo ""

# Test dependencies
echo "📦 Dependencies:"
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
    echo "   Size: $(du -sh node_modules | cut -f1)"
else
    echo "❌ node_modules missing - run 'npm install'"
fi
echo ""

# Test key files
echo "📁 Project Files:"
files=("package.json" "next.config.mjs" "app/layout.tsx" "app/page.tsx")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
    fi
done
echo ""

# Test API keys
echo "🔐 API Keys Status:"
source .env.local 2>/dev/null || true

keys=("TOGETHER_API_KEY" "GROQ_API_KEY" "MISTRAL_API_KEY" "XAI_API_KEY" "DATABASE_URL")
for key in "${keys[@]}"; do
    if [ -n "${!key}" ]; then
        echo "✅ $key: Set"
    else
        echo "❌ $key: Missing"
    fi
done
echo ""

# Test build
echo "🏗️  Testing Build:"
if npm run build --silent > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - check for errors"
fi
echo ""

echo "🎯 Setup Status: Ready for development!"
echo "   Run './start-dev.sh' to start the server"
