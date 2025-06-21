"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface TestResult {
  service: string
  status: "success" | "error" | "warning"
  message: string
  responseTime?: number
  details?: any
}

interface ServiceTestResponse {
  success: boolean
  timestamp: string
  summary: {
    total: number
    successful: number
    failed: number
    warnings: number
  }
  details: TestResult[]
}

export function ServiceStatus() {
  const [testResults, setTestResults] = useState<ServiceTestResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const runTests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test-services")
      const data = await response.json()
      setTestResults(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to run tests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-500/20 text-green-400 border-green-500/30",
      error: "bg-red-500/20 text-red-400 border-red-500/30",
      warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    }

    return <Badge className={variants[status] || "bg-gray-500/20 text-gray-400"}>{status.toUpperCase()}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Service Status</h2>
          <p className="text-white/70">Monitor the health of all connected services and APIs</p>
        </div>
        <Button
          onClick={runTests}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
        >
          {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          {isLoading ? "Testing..." : "Run Tests"}
        </Button>
      </div>

      {lastUpdated && <p className="text-sm text-white/50">Last updated: {lastUpdated.toLocaleString()}</p>}

      {testResults && (
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{testResults.summary.successful}</p>
                    <p className="text-sm text-white/70">Successful</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{testResults.summary.failed}</p>
                    <p className="text-sm text-white/70">Failed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{testResults.summary.warnings}</p>
                    <p className="text-sm text-white/70">Warnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">{testResults.summary.total}</p>
                    <p className="text-sm text-white/70">Total Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <div className="grid gap-4">
            {testResults.details.map((result, index) => (
              <motion.div
                key={result.service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <CardTitle className="text-white">{result.service}</CardTitle>
                          <CardDescription className="text-white/70">{result.message}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {result.responseTime && (
                          <Badge variant="outline" className="border-white/20 text-white/70">
                            {result.responseTime}ms
                          </Badge>
                        )}
                        {getStatusBadge(result.status)}
                      </div>
                    </div>
                  </CardHeader>

                  {result.details && (
                    <CardContent>
                      <div className="bg-black/20 rounded-lg p-4">
                        <pre className="text-sm text-white/80 overflow-x-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isLoading && !testResults && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
            <p className="text-white/70">Running service tests...</p>
          </div>
        </div>
      )}
    </div>
  )
}
