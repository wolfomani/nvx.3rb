#!/bin/bash

echo "🔍 التحقق من الأمان..."

# التحقق من عدم وجود متغيرات حساسة في ملفات العميل
echo "🔒 فحص الملفات للمتغيرات الحساسة..."

SENSITIVE_VARS=(
    "TOGETHER_API_KEY"
    "GROQ_API_KEY" 
    "MISTRAL_API_KEY"
    "XAI_API_KEY"
    "DATABASE_URL"
    "POSTGRES_URL"
    "KV_REST_API_TOKEN"
    "BLOB_READ_WRITE_TOKEN"
    "GOOGLE_CLIENT_SECRET"
    "NEXTAUTH_SECRET"
)

CLIENT_DIRS=("app" "components" "hooks")
FOUND_ISSUES=0

for var in "${SENSITIVE_VARS[@]}"; do
    for dir in "${CLIENT_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            # البحث في ملفات TypeScript/JavaScript
            MATCHES=$(grep -r "$var" "$dir" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null || true)
            if [ ! -z "$MATCHES" ]; then
                echo "⚠️  وُجد متغير حساس $var في:"
                echo "$MATCHES"
                FOUND_ISSUES=1
            fi
        fi
    done
done

if [ $FOUND_ISSUES -eq 0 ]; then
    echo "✅ لم يتم العثور على متغيرات حساسة في ملفات العميل"
else
    echo "❌ تم العثور على متغيرات حساسة - يجب إصلاحها"
fi

# التحقق من وجود الملفات المطلوبة
echo ""
echo "📁 التحقق من الملفات المطلوبة..."

REQUIRED_FILES=(
    "lib/env-config.ts"
    "components/providers/client-providers.tsx"
    ".env.example"
    "vercel-env-setup.md"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file موجود"
    else
        echo "✗ $file مفقود"
    fi
done

# التحقق من .gitignore
echo ""
echo "📋 التحقق من .gitignore..."
if grep -q "fix-env.sh" .gitignore; then
    echo "✓ الملفات الحساسة مُستبعدة من Git"
else
    echo "⚠️ قد تحتاج لتحديث .gitignore"
fi

echo ""
echo "🎯 تقرير الأمان مكتمل!"
