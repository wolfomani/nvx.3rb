"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useI18n } from "./i18n-provider"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Languages className="h-4 w-4 mr-2" />
          {locale === "en" ? "EN" : "عر"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass border-white/20">
        <DropdownMenuItem onClick={() => setLocale("en")} className="text-white hover:bg-white/10">
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("ar")} className="text-white hover:bg-white/10">
          🇸🇦 العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
