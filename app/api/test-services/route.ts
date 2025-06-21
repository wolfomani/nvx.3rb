import { NextResponse } from "next/server"
import { APITester } from "@/scripts/test-api-keys"

export async function GET() {
  try {
    const tester = new APITester()
    const results = await tester.runAllTests()

    const summary = {
      total: results.length,
      successful: results.filter((r) => r.status === "success").length,
      failed: results.filter((r) => r.status === "error").length,
      warnings: results.filter((r) => r.status === "warning").length,
      results: results,
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary,
      details: results,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
