"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

const errorMessages = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") as keyof typeof errorMessages

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900 p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">Authentication Error</CardTitle>
          <CardDescription>{errorMessages[error] || errorMessages.Default}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Please try signing in again or contact support if the problem persists.
            </p>
            <Link href="/auth/signin">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
