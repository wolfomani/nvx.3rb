"use client"

import Link from "next/link"
import { Github, MessageCircle, Youtube, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/3RBAI",
      icon: Github,
      description: "Open source projects and contributions",
    },
    {
      name: "Telegram",
      url: "https://t.me/wolfaiOM",
      icon: MessageCircle,
      description: "Join our community discussions",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@abdulaziz-x7r1g",
      icon: Youtube,
      description: "Tutorials and development videos",
    },
    {
      name: "3weep.app",
      url: "https://hamkamai.github.io/3weep.app",
      icon: ExternalLink,
      description: "Our latest project showcase",
    },
  ]

  const quickLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api-docs" },
    { name: "Templates", href: "/templates" },
    { name: "Pricing", href: "/pricing" },
    { name: "Support", href: "/support" },
    { name: "Status", href: "/admin" },
  ]

  const aiProviders = [
    { name: "Together AI", url: "https://api.together.xyz" },
    { name: "Groq", url: "https://groq.com" },
    { name: "Codestral", url: "https://codestral.mistral.ai" },
    { name: "Mistral AI", url: "https://mistral.ai" },
    { name: "xAI Grok", url: "https://x.ai" },
  ]

  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-lg"></div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                dev.3db
              </span>
            </div>
            <p className="text-white/70 text-sm">
              AI-powered development platform with multi-provider integration, real-time collaboration, and intelligent
              code generation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.description}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Providers */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">AI Providers</h3>
            <ul className="space-y-2">
              {aiProviders.map((provider) => (
                <li key={provider.name}>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>{provider.name}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Projects */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Community & Projects</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/3RBAI"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Github className="h-4 w-4 text-purple-400" />
                  <span className="text-white text-sm font-medium">3RBAI</span>
                </div>
                <p className="text-white/60 text-xs mt-1">Open source AI projects</p>
              </a>

              <a
                href="https://hamkamai.github.io/3weep.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-teal-400" />
                  <span className="text-white text-sm font-medium">3weep.app</span>
                </div>
                <p className="text-white/60 text-xs mt-1">Latest project showcase</p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 dev.3db. Built with ❤️ using Next.js, AI SDK, and modern web technologies.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
                System Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
