"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { LanguageSwitcher } from "@/components/i18n/language-switcher"
import { UserMenu } from "@/components/auth/user-menu"
import { Menu, X, Code, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Code className="h-8 w-8 text-purple-400" />
              <Sparkles className="h-4 w-4 text-teal-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              dev.3db
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/docs" className="text-white/80 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/templates" className="text-white/80 hover:text-white transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4"
            >
              <nav className="flex flex-col space-y-4">
                <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/docs" className="text-white/80 hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/templates" className="text-white/80 hover:text-white transition-colors">
                  Templates
                </Link>
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
                  Pricing
                </Link>
                <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                  <LanguageSwitcher />
                  <ThemeToggle />
                  <UserMenu />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
