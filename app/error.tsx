"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-white">Something went wrong!</CardTitle>
          <CardDescription className="text-white/70">
            An unexpected error occurred. Please try again or contact support if the problem persists.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error.digest && (
            <div className="text-sm text-white/60">
              Error ID: <code className="font-mono bg-white/10 px-2 py-1 rounded">{error.digest}</code>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={reset}
              className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button variant="outline" asChild className="flex-1 border-white/20 text-white hover:bg-white/10">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
