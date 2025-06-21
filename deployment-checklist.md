# 🚀 قائمة مراجعة النشر

## ✅ قبل النشر

- [ ] تم تشغيل `apply-security-fixes.sh`
- [ ] تم التحقق من الأمان باستخدام `verify-security.sh`
- [ ] لا توجد متغيرات حساسة في ملفات العميل
- [ ] تم تحديث `.gitignore`
- [ ] تم إنشاء `.env.example`

## 🔧 إعداد Vercel

### متغيرات البيئة المطلوبة:

#### 🔐 متغيرات الخادم (سرية):
\`\`\`
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-database-url
TOGETHER_API_KEY=your-together-key
GROQ_API_KEY=your-groq-key
MISTRAL_API_KEY=your-mistral-key
XAI_API_KEY=your-xai-key
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token
BLOB_READ_WRITE_TOKEN=your-blob-token
\`\`\`

#### 🌐 متغيرات العميل (عامة):
\`\`\`
NEXT_PUBLIC_APP_NAME=dev.3db
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
\`\`\`

## 🎯 خطوات النشر

1. **تطبيق الإصلاحات:**
   \`\`\`bash
   chmod +x apply-security-fixes.sh
   ./apply-security-fixes.sh
   \`\`\`

2. **التحقق من الأمان:**
   \`\`\`bash
   chmod +x verify-security.sh
   ./verify-security.sh
   \`\`\`

3. **النشر السريع:**
   \`\`\`bash
   chmod +x quick-deploy.sh
   ./quick-deploy.sh
   \`\`\`

4. **إعداد Vercel:**
   - اذهب إلى Project Settings
   - Environment Variables
   - أضف جميع المتغيرات المطلوبة

5. **إعادة النشر:**
   - Vercel سيعيد النشر تلقائياً
   - أو استخدم `vercel --prod`

## 🔍 التحقق من النجاح

- [ ] الموقع يعمل بدون أخطاء
- [ ] المصادقة تعمل
- [ ] APIs تستجيب
- [ ] لا توجد تحذيرات أمنية

## 🆘 استكشاف الأخطاء

### خطأ "Missing environment variables":
- تأكد من إضافة جميع المتغيرات في Vercel
- تحقق من أسماء المتغيرات

### خطأ "Sensitive environment variable":
- تشغيل `verify-security.sh`
- إزالة أي متغيرات حساسة من ملفات العميل

### خطأ في البناء:
- تشغيل `npm run build` محلياً
- إصلاح أي أخطاء TypeScript

