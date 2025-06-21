"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Save, Share, Settings, Code } from "lucide-react"

export function CodeEditor() {
  const [code, setCode] = useState(`import React from 'react'
import { Button } from '@/components/ui/button'

export default function MyComponent() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to dev.3db
      </h1>
      <p className="text-lg mb-6">
        You clicked {count} times
      </p>
      <Button 
        onClick={() => setCount(count + 1)}
        className="bg-gradient-to-r from-purple-600 to-teal-600"
      >
        Click me!
      </Button>
    </div>
  )
}`)

  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => setIsRunning(false), 1000)
  }

  return (
    <Card className="glass-card border-white/10 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-white">Code Editor</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              TypeScript
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              React
            </Badge>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-2 pt-2">
          <Button size="sm" onClick={handleRun} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-1" />
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <div className="relative h-full">
          {/* Line Numbers */}
          <div className="absolute left-0 top-0 w-12 h-full bg-black/20 border-r border-white/10 text-white/40 text-sm font-mono">
            {code.split("\n").map((_, index) => (
              <div key={index} className="px-2 leading-6">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full pl-14 pr-4 py-4 bg-transparent text-white font-mono text-sm leading-6 resize-none outline-none"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
            }}
            spellCheck={false}
          />

          {/* Syntax Highlighting Overlay (simplified) */}
          <div className="absolute inset-0 pl-14 pr-4 py-4 pointer-events-none font-mono text-sm leading-6 overflow-hidden">
            <pre className="text-transparent">
              <code
                dangerouslySetInnerHTML={{
                  __html: code
                    .replace(
                      /\b(import|export|default|function|const|let|var|return|if|else|for|while|class|extends)\b/g,
                      '<span style="color: #c792ea">$1</span>',
                    )
                    .replace(/\b(React|useState|useEffect)\b/g, '<span style="color: #82aaff">$1</span>')
                    .replace(/'([^']*)'/g, "<span style=\"color: #c3e88d\">'$1'</span>")
                    .replace(/"([^"]*)"/g, '<span style="color: #c3e88d">"$1"</span>')
                    .replace(/\/\/.*$/gm, '<span style="color: #546e7a">$&</span>'),
                }}
              />
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
