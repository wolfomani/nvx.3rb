"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface I18nContextType {
  locale: "en" | "ar"
  setLocale: (locale: "en" | "ar") => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.docs": "Documentation",
    "nav.templates": "Templates",
    "nav.pricing": "Pricing",
    "hero.title": "Build with AI Magic",
    "hero.subtitle": "Create, edit, and deploy applications instantly with our multi-provider AI platform.",
    "features.title": "Everything you need to build faster",
  },
  ar: {
    "nav.dashboard": "لوحة التحكم",
    "nav.docs": "التوثيق",
    "nav.templates": "القوالب",
    "nav.pricing": "الأسعار",
    "hero.title": "ابني بسحر الذكاء الاصطناعي",
    "hero.subtitle": "أنشئ وحرر ونشر التطبيقات فوريًا مع منصة الذكاء الاصطناعي متعددة المزودين.",
    "features.title": "كل ما تحتاجه للبناء بشكل أسرع",
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<"en" | "ar">("en")

  const t = (key: string) => {
    return translations[locale][key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      <div dir={locale === "ar" ? "rtl" : "ltr"}>{children}</div>
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
