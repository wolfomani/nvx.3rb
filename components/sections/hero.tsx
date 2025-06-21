"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-white/80">AI-Powered Development Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Build with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
              Create, edit, and deploy applications instantly with our multi-provider AI platform. Real-time
              collaboration meets intelligent code generation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-8 py-3 rounded-full"
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-full"
              >
                View Documentation
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-12">
              <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <Code className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Real-time Editor</span>
              </div>
              <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-teal-400" />
                <span className="text-sm">Live Preview</span>
              </div>
              <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-green-400" />
                <span className="text-sm">Multi-Provider AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
