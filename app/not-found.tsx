import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
            <Search className="h-6 w-6 text-purple-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-white">Page Not Found</CardTitle>
          <CardDescription className="text-white/70">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
