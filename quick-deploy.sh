#!/bin/bash

echo "🚀 نشر سريع وآمن..."

# 1. تطبيق الإصلاحات الأمنية
echo "🔒 تطبيق الإصلاحات..."
chmod +x apply-security-fixes.sh
./apply-security-fixes.sh

# 2. التحقق من الأمان
echo "🔍 التحقق من الأمان..."
chmod +x verify-security.sh
./verify-security.sh

# 3. اختبار سريع
echo "🧪 اختبار سريع..."
npm run lint 2>/dev/null && echo "✓ Linting نجح" || echo "⚠️ تحذيرات Linting"

# 4. Push إلى Git
echo "📤 رفع التغييرات..."
git push

echo ""
echo "✅ النشر مكتمل!"
echo "🌐 تحقق من Vercel Dashboard لإضافة متغيرات البيئة"
echo "📖 راجع vercel-env-setup.md للتفاصيل"
