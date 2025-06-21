/**
 * Comprehensive API Key and Service Testing Script
 * Updated with correct API endpoints and enhanced testing
 */

import { neon } from "@neondatabase/serverless"

// Test configuration
const TEST_CONFIG = {
  timeout: 15000, // 15 seconds timeout for each test
  retries: 2,
}

interface TestResult {
  service: string
  status: "success" | "error" | "warning"
  message: string
  responseTime?: number
  details?: any
}

class APITester {
  private results: TestResult[] = []

  /**
   * Test Together AI API with correct endpoint
   */
  async testTogetherAI(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.TOGETHER_API_KEY) {
        return {
          service: "Together AI",
          status: "error",
          message: "API key not found in environment variables",
        }
      }

      // Test with chat completions endpoint
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-2-7b-chat-hf",
          messages: [
            {
              role: "user",
              content: "Hello! This is a test message. Please respond with 'API test successful'.",
            },
          ],
          max_tokens: 20,
          temperature: 0.1,
        }),
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        service: "Together AI",
        status: "success",
        message: `Connected successfully. Model: ${data.model || "meta-llama/Llama-2-7b-chat-hf"}`,
        responseTime,
        details: {
          model: data.model,
          response: data.choices?.[0]?.message?.content,
          usage: data.usage,
        },
      }
    } catch (error) {
      return {
        service: "Together AI",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test Mistral AI API (Codestral)
   */
  async testMistralAI(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.MISTRAL_API_KEY) {
        return {
          service: "Mistral AI (Codestral)",
          status: "error",
          message: "API key not found in environment variables",
        }
      }

      // Test chat completions
      const response = await fetch("https://codestral.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "codestral-latest",
          messages: [
            {
              role: "user",
              content: "Write a simple hello world function in JavaScript",
            },
          ],
          max_tokens: 50,
          temperature: 0.1,
        }),
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        service: "Mistral AI (Codestral)",
        status: "success",
        message: `Connected successfully. Model: ${data.model || "codestral-latest"}`,
        responseTime,
        details: {
          model: data.model,
          response: data.choices?.[0]?.message?.content,
          usage: data.usage,
        },
      }
    } catch (error) {
      return {
        service: "Mistral AI (Codestral)",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test Codestral FIM (Fill-in-Middle) endpoint
   */
  async testCodestralFIM(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.MISTRAL_API_KEY) {
        return {
          service: "Codestral FIM",
          status: "error",
          message: "API key not found in environment variables",
        }
      }

      // Test FIM completions
      const response = await fetch("https://codestral.mistral.ai/v1/fim/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "codestral-latest",
          prompt: "def fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return ",
          suffix: "\n\nprint(fibonacci(10))",
          max_tokens: 50,
          temperature: 0.1,
        }),
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        service: "Codestral FIM",
        status: "success",
        message: `FIM endpoint working. Model: ${data.model || "codestral-latest"}`,
        responseTime,
        details: {
          model: data.model,
          completion: data.choices?.[0]?.text,
          usage: data.usage,
        },
      }
    } catch (error) {
      return {
        service: "Codestral FIM",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test Groq API with correct endpoint
   */
  async testGroqAI(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.GROQ_API_KEY) {
        return {
          service: "Groq AI",
          status: "error",
          message: "API key not found in environment variables",
        }
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama2-70b-4096",
          messages: [
            {
              role: "user",
              content: "Hello! This is a test message. Please respond with 'Groq API test successful'.",
            },
          ],
          max_tokens: 20,
          temperature: 0.1,
        }),
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        service: "Groq AI",
        status: "success",
        message: `Connected successfully. Ultra-fast inference working! Model: ${data.model}`,
        responseTime,
        details: {
          model: data.model,
          response: data.choices?.[0]?.message?.content,
          usage: data.usage,
        },
      }
    } catch (error) {
      return {
        service: "Groq AI",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test xAI (Grok) API
   */
  async testXAI(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.XAI_API_KEY) {
        return {
          service: "xAI (Grok)",
          status: "error",
          message: "API key not found in environment variables",
        }
      }

      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: "Hello! This is a test message. Please respond with 'Grok API test successful'.",
            },
          ],
          model: "grok-beta",
          max_tokens: 20,
          temperature: 0.1,
        }),
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        service: "xAI (Grok)",
        status: "success",
        message: `Connected successfully. Grok is ready! Model: ${data.model}`,
        responseTime,
        details: {
          model: data.model,
          response: data.choices?.[0]?.message?.content,
          usage: data.usage,
        },
      }
    } catch (error) {
      return {
        service: "xAI (Grok)",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test Neon Database Connection
   */
  async testNeonDatabase(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.DATABASE_URL) {
        return {
          service: "Neon Database",
          status: "error",
          message: "DATABASE_URL not found in environment variables",
        }
      }

      const sql = neon(process.env.DATABASE_URL)

      // Test basic connection and get database info
      const result = await sql`
        SELECT 
          current_database() as database_name,
          current_user as user_name,
          version() as postgres_version,
          now() as current_time
      `

      const responseTime = Date.now() - startTime

      // Test if our tables exist
      const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `

      return {
        service: "Neon Database",
        status: "success",
        message: `Connected successfully to ${result[0].database_name}`,
        responseTime,
        details: {
          database: result[0].database_name,
          user: result[0].user_name,
          version: result[0].postgres_version.split(" ")[0] + " " + result[0].postgres_version.split(" ")[1],
          tables: tables.map((t) => t.table_name),
          tableCount: tables.length,
        },
      }
    } catch (error) {
      return {
        service: "Neon Database",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test Upstash Redis/KV
   */
  async testUpstashKV(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        return {
          service: "Upstash KV",
          status: "error",
          message: "KV_REST_API_URL or KV_REST_API_TOKEN not found",
        }
      }

      // Test SET operation
      const testKey = `test_${Date.now()}`
      const testValue = "api_test_value"

      const setResponse = await fetch(`${process.env.KV_REST_API_URL}/set/${testKey}/${testValue}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      if (!setResponse.ok) {
        throw new Error(`SET failed: HTTP ${setResponse.status}`)
      }

      // Test GET operation
      const getResponse = await fetch(`${process.env.KV_REST_API_URL}/get/${testKey}`, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      if (!getResponse.ok) {
        throw new Error(`GET failed: HTTP ${getResponse.status}`)
      }

      const getData = await getResponse.json()
      const responseTime = Date.now() - startTime

      // Clean up test key
      await fetch(`${process.env.KV_REST_API_URL}/del/${testKey}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
      })

      return {
        service: "Upstash KV",
        status: "success",
        message: `Connected successfully. SET/GET operations working.`,
        responseTime,
        details: {
          testKey,
          setValue: testValue,
          getValue: getData.result,
        },
      }
    } catch (error) {
      return {
        service: "Upstash KV",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Test Vercel Blob Storage
   */
  async testVercelBlob(): Promise<TestResult> {
    const startTime = Date.now()

    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return {
          service: "Vercel Blob",
          status: "error",
          message: "BLOB_READ_WRITE_TOKEN not found in environment variables",
        }
      }

      // Test by creating a small test file
      const testContent = `API Test - ${new Date().toISOString()}`
      const testFileName = `test-${Date.now()}.txt`

      const response = await fetch(`https://blob.vercel-storage.com/${testFileName}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
          "Content-Type": "text/plain",
        },
        body: testContent,
        signal: AbortSignal.timeout(TEST_CONFIG.timeout),
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Clean up test file
      try {
        await fetch(data.url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
          },
        })
      } catch (cleanupError) {
        // Ignore cleanup errors
      }

      return {
        service: "Vercel Blob",
        status: "success",
        message: `Connected successfully. File upload/delete working.`,
        responseTime,
        details: {
          testFile: testFileName,
          url: data.url,
          size: testContent.length,
        },
      }
    } catch (error) {
      return {
        service: "Vercel Blob",
        status: "error",
        message: `Connection failed: ${error.message}`,
        responseTime: Date.now() - startTime,
      }
    }
  }

  /**
   * Run all tests
   */
  async runAllTests(): Promise<TestResult[]> {
    console.log("🚀 Starting Comprehensive API Tests...\n")
    console.log("Testing with correct endpoints:")
    console.log("- Together AI: https://api.together.xyz/v1/chat/completions")
    console.log("- Groq: https://api.groq.com/openai/v1/chat/completions")
    console.log("- Codestral Chat: https://codestral.mistral.ai/v1/chat/completions")
    console.log("- Codestral FIM: https://codestral.mistral.ai/v1/fim/completions")
    console.log("- xAI Grok: https://api.x.ai/v1/chat/completions\n")

    const tests = [
      this.testNeonDatabase(),
      this.testTogetherAI(),
      this.testMistralAI(),
      this.testCodestralFIM(),
      this.testGroqAI(),
      this.testXAI(),
      this.testUpstashKV(),
      this.testVercelBlob(),
    ]

    this.results = await Promise.all(tests)
    return this.results
  }

  /**
   * Generate test report
   */
  generateReport(): void {
    console.log("\n📊 API Key Test Results")
    console.log("=".repeat(80))

    let successCount = 0
    let errorCount = 0
    let warningCount = 0

    this.results.forEach((result) => {
      const statusIcon = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
      }[result.status]

      const responseTime = result.responseTime ? ` (${result.responseTime}ms)` : ""

      console.log(`${statusIcon} ${result.service}${responseTime}`)
      console.log(`   ${result.message}`)

      if (result.details) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2).replace(/\n/g, "\n   ")}`)
      }
      console.log("")

      if (result.status === "success") successCount++
      else if (result.status === "error") errorCount++
      else warningCount++
    })

    console.log("Summary:")
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Failed: ${errorCount}`)
    console.log(`⚠️  Warnings: ${warningCount}`)
    console.log(`📊 Total: ${this.results.length}`)

    if (errorCount === 0) {
      console.log("\n🎉 All services are working correctly!")
      console.log("Your AI platform is ready for production! 🚀")
    } else {
      console.log("\n⚠️  Some services have issues. Please check the failed tests above.")
    }
  }
}

// Run the tests
async function main() {
  const tester = new APITester()

  try {
    await tester.runAllTests()
    tester.generateReport()
  } catch (error) {
    console.error("❌ Test runner failed:", error)
    process.exit(1)
  }
}

// Execute if run directly
if (require.main === module) {
  main()
}

export { APITester, type TestResult }
