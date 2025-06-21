"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white flex items-center justify-center p-4">
          <Card className="w-full max-w-md glass border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <CardTitle className="text-xl font-semibold text-white">Something went wrong!</CardTitle>
              <CardDescription className="text-white/70">
                An unexpected error occurred. Please refresh the page to try again.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
