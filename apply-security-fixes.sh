#!/bin/bash

echo "🔒 تطبيق الإصلاحات الأمنية..."

# 1. تشغيل الإصلاح الآمن للمتغيرات
echo "📝 إعداد متغيرات البيئة الآمنة..."
chmod +x fix-env-secure.sh
./fix-env-secure.sh

# 2. إزالة الملفات الحساسة من Git
echo "🧹 تنظيف الملفات الحساسة..."
git rm --cached fix-env.sh 2>/dev/null || true
git rm --cached .env 2>/dev/null || true
git rm --cached .env.local 2>/dev/null || true

# 3. تحديث .gitignore
echo "📋 تحديث .gitignore..."
cat >> .gitignore << 'EOF'

# Sensitive environment files
.env
.env.local
.env.production
.env.staging
fix-env.sh
*-env.sh

# Sensitive scripts
deploy-safe.sh
fix-env-secure.sh
EOF

# 4. التحقق من صحة التكوين
echo "✅ التحقق من التكوين..."
if [ -f "lib/env-config.ts" ]; then
    echo "✓ ملف env-config.ts موجود"
else
    echo "✗ ملف env-config.ts مفقود"
fi

if [ -f "components/providers/client-providers.tsx" ]; then
    echo "✓ ملف client-providers.tsx موجود"
else
    echo "✗ ملف client-providers.tsx مفقود"
fi

# 5. اختبار البناء
echo "🔨 اختبار البناء..."
npm run build 2>/dev/null && echo "✓ البناء نجح" || echo "⚠️ فشل البناء - تحقق من الأخطاء"

# 6. إنشاء commit آمن
echo "📦 إنشاء commit آمن..."
git add .
git commit -m "security: Remove sensitive env vars from client code

- Separate server and client environment variables
- Remove sensitive data from client-side code
- Add secure environment configuration
- Update .gitignore for sensitive files"

echo "🎉 تم تطبيق الإصلاحات الأمنية بنجاح!"
echo ""
echo "📋 الخطوات التالية:"
echo "1. تحقق من ملف vercel-env-setup.md"
echo "2. أضف المتغيرات في Vercel Dashboard"
echo "3. قم بـ push التغييرات: git push"
echo "4. أعد نشر المشروع على Vercel"
