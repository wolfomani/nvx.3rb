"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Activity, Zap, Database, Clock } from "lucide-react"

interface UsageStats {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  providerUsage: Array<{
    provider: string
    requests: number
    tokens: number
    cost: number
  }>
  dailyUsage: Array<{
    date: string
    requests: number
    tokens: number
  }>
}

const COLORS = ["#8b5cf6", "#14b8a6", "#22c55e", "#f59e0b", "#ef4444"]

export function APIUsageStats() {
  const [stats, setStats] = useState<UsageStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get usage stats
    const fetchStats = async () => {
      // Mock data - replace with actual API call
      const mockStats: UsageStats = {
        totalRequests: 1247,
        successfulRequests: 1198,
        failedRequests: 49,
        averageResponseTime: 342,
        providerUsage: [
          { provider: "OpenAI GPT-4", requests: 456, tokens: 125000, cost: 12.5 },
          { provider: "Groq Llama2", requests: 321, tokens: 89000, cost: 4.45 },
          { provider: "Together AI", requests: 234, tokens: 67000, cost: 3.35 },
          { provider: "Mistral", requests: 156, tokens: 45000, cost: 2.25 },
          { provider: "xAI Grok", requests: 80, tokens: 23000, cost: 1.15 },
        ],
        dailyUsage: [
          { date: "2024-01-15", requests: 145, tokens: 42000 },
          { date: "2024-01-16", requests: 167, tokens: 48000 },
          { date: "2024-01-17", requests: 189, tokens: 55000 },
          { date: "2024-01-18", requests: 203, tokens: 61000 },
          { date: "2024-01-19", requests: 178, tokens: 52000 },
          { date: "2024-01-20", requests: 234, tokens: 68000 },
          { date: "2024-01-21", requests: 131, tokens: 38000 },
        ],
      }

      setTimeout(() => {
        setStats(mockStats)
        setIsLoading(false)
      }, 1000)
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-white/20 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!stats) return null

  const successRate = (stats.successfulRequests / stats.totalRequests) * 100

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">API Usage Analytics</h2>
        <p className="text-white/70">Monitor your AI provider usage and performance metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalRequests.toLocaleString()}</p>
                <p className="text-sm text-white/70">Total Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">{successRate.toFixed(1)}%</p>
                <p className="text-sm text-white/70">Success Rate</p>
              </div>
            </div>
            <Progress value={successRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-teal-400" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.averageResponseTime}ms</p>
                <p className="text-sm text-white/70">Avg Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {stats.providerUsage.reduce((sum, p) => sum + p.tokens, 0).toLocaleString()}
                </p>
                <p className="text-sm text-white/70">Total Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Usage Chart */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Daily Usage Trend</CardTitle>
            <CardDescription className="text-white/70">Requests and token usage over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.dailyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="requests" fill="#8b5cf6" name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Provider Usage Pie Chart */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Provider Distribution</CardTitle>
            <CardDescription className="text-white/70">Request distribution across AI providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.providerUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ provider, percent }) => `${provider.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="requests"
                >
                  {stats.providerUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Provider Details */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Provider Usage Details</CardTitle>
          <CardDescription className="text-white/70">Detailed breakdown of usage by AI provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.providerUsage.map((provider, index) => (
              <div key={provider.provider} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <div>
                    <p className="font-medium text-white">{provider.provider}</p>
                    <p className="text-sm text-white/70">{provider.requests} requests</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${provider.cost.toFixed(2)}</p>
                  <p className="text-sm text-white/70">{provider.tokens.toLocaleString()} tokens</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
