"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Tablet, RefreshCw, ExternalLink, Eye } from "lucide-react"
import { motion } from "framer-motion"

export function LivePreview() {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [count, setCount] = useState(0)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-md"
      default:
        return "w-full"
    }
  }

  return (
    <Card className="glass-card border-white/10 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-teal-400" />
            <CardTitle className="text-white">Live Preview</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Live
            </Badge>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === "desktop" ? "default" : "outline"}
              onClick={() => setViewMode("desktop")}
              className={viewMode === "desktop" ? "bg-purple-600" : "border-white/20 text-white hover:bg-white/10"}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "tablet" ? "default" : "outline"}
              onClick={() => setViewMode("tablet")}
              className={viewMode === "tablet" ? "bg-purple-600" : "border-white/20 text-white hover:bg-white/10"}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "mobile" ? "default" : "outline"}
              onClick={() => setViewMode("mobile")}
              className={viewMode === "mobile" ? "bg-purple-600" : "border-white/20 text-white hover:bg-white/10"}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="h-full bg-white rounded-lg overflow-hidden">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`mx-auto h-full ${getPreviewWidth()}`}
          >
            {/* Simulated Preview Content */}
            <div className="p-8 text-center h-full flex flex-col justify-center bg-gradient-to-br from-purple-50 to-teal-50">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to dev.3db</h1>
                <p className="text-lg mb-6 text-gray-600">You clicked {count} times</p>
                <Button
                  onClick={() => setCount(count + 1)}
                  className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Click me!
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
