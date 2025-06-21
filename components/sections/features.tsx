"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Sparkles, Globe, Shield, Zap, Users, Palette, Database, GitBranch, Layers } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Code,
    title: "Real-time Code Editor",
    description: "Advanced code editor with syntax highlighting, auto-completion, and live collaboration.",
    badge: "Core",
    color: "text-purple-400",
  },
  {
    icon: Sparkles,
    title: "Multi-Provider AI",
    description: "Integrate with OpenAI, Groq, Together, Codestral, and Mistral for diverse AI capabilities.",
    badge: "AI",
    color: "text-teal-400",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Full Arabic and English support with RTL/LTR layouts and comprehensive translations.",
    badge: "i18n",
    color: "text-green-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "JWT authentication, rate limiting, CSRF protection, and secure API key management.",
    badge: "Security",
    color: "text-red-400",
  },
  {
    icon: Zap,
    title: "Live Preview",
    description: "Instant preview of your code changes with hot reloading and error highlighting.",
    badge: "Performance",
    color: "text-yellow-400",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration features with project sharing and team management.",
    badge: "Social",
    color: "text-blue-400",
  },
  {
    icon: Palette,
    title: "Glass/Neon Design",
    description: "Beautiful glass morphism UI with neon accents and smooth animations.",
    badge: "Design",
    color: "text-pink-400",
  },
  {
    icon: Database,
    title: "Project Management",
    description: "Organize your projects with file trees, version control, and deployment tracking.",
    badge: "Organization",
    color: "text-indigo-400",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Built-in Git integration with branch management and deployment workflows.",
    badge: "DevOps",
    color: "text-orange-400",
  },
  {
    icon: Layers,
    title: "Component Library",
    description: "Extensive component library with customizable themes and responsive design.",
    badge: "UI/UX",
    color: "text-cyan-400",
  },
]

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                build faster
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              A comprehensive platform with all the tools and features you need for modern web development.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    <Badge variant="secondary" className="bg-white/10 text-white/80">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
