import { type NextRequest, NextResponse } from "next/server"

// Updated AI Provider configurations with correct endpoints
const providers = [
  {
    id: "together",
    name: "Together AI",
    description: "Leading open-source models with competitive pricing",
    endpoint: "https://api.together.xyz/v1/chat/completions",
    models: [
      "meta-llama/Llama-2-7b-chat-hf",
      "meta-llama/Llama-2-13b-chat-hf",
      "meta-llama/Llama-2-70b-chat-hf",
      "mistralai/Mixtral-8x7B-Instruct-v0.1",
      "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    ],
    status: "active",
    features: ["chat", "completion", "fine-tuning"],
  },
  {
    id: "groq",
    name: "Groq",
    description: "Ultra-fast inference for real-time applications",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    models: ["llama2-70b-4096", "mixtral-8x7b-32768", "gemma-7b-it"],
    status: "active",
    features: ["chat", "ultra-fast"],
  },
  {
    id: "codestral-chat",
    name: "Codestral Chat",
    description: "Specialized chat model for code generation and assistance",
    endpoint: "https://codestral.mistral.ai/v1/chat/completions",
    models: ["codestral-latest"],
    status: "active",
    features: ["chat", "code-generation"],
  },
  {
    id: "codestral-fim",
    name: "Codestral FIM",
    description: "Fill-in-Middle completions for code editing",
    endpoint: "https://codestral.mistral.ai/v1/fim/completions",
    models: ["codestral-latest"],
    status: "active",
    features: ["fim", "code-completion"],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description: "Efficient and powerful language models",
    endpoint: "https://api.mistral.ai/v1/chat/completions",
    models: ["mistral-large-latest", "mistral-medium-latest", "mistral-small-latest"],
    status: "active",
    features: ["chat", "completion"],
  },
  {
    id: "xai",
    name: "xAI (Grok)",
    description: "Grok AI model with real-time knowledge",
    endpoint: "https://api.x.ai/v1/chat/completions",
    models: ["grok-beta"],
    status: "active",
    features: ["chat", "real-time"],
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      providers,
      total: providers.length,
      endpoints: {
        "Together AI": "https://api.together.xyz/v1/chat/completions",
        Groq: "https://api.groq.com/openai/v1/chat/completions",
        "Codestral Chat": "https://codestral.mistral.ai/v1/chat/completions",
        "Codestral FIM": "https://codestral.mistral.ai/v1/fim/completions",
        "Mistral AI": "https://api.mistral.ai/v1/chat/completions",
        "xAI Grok": "https://api.x.ai/v1/chat/completions",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch providers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { provider, model, messages, apiKey, type = "chat" } = await request.json()

    // Validate required fields
    if (!provider || !model || !messages || !apiKey) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Find the provider configuration
    const providerConfig = providers.find((p) => p.id === provider)
    if (!providerConfig) {
      return NextResponse.json({ success: false, error: "Invalid provider" }, { status: 400 })
    }

    let requestBody: any
    const headers: any = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }

    // Handle different request types
    if (type === "fim" && provider === "codestral-fim") {
      // Fill-in-Middle request
      requestBody = {
        model,
        prompt: messages.prompt,
        suffix: messages.suffix,
        temperature: 0.7,
        max_tokens: 2000,
      }
    } else {
      // Standard chat completion
      requestBody = {
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }
    }

    // Make request to the AI provider
    const response = await fetch(providerConfig.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Provider API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()

    // Handle different response formats
    let responseContent: string
    if (type === "fim") {
      responseContent = data.choices?.[0]?.text || "No completion generated"
    } else {
      responseContent = data.choices?.[0]?.message?.content || "No response generated"
    }

    return NextResponse.json({
      success: true,
      response: responseContent,
      usage: data.usage,
      provider: providerConfig.name,
      model,
      type,
      metadata: {
        endpoint: providerConfig.endpoint,
        features: providerConfig.features,
      },
    })
  } catch (error) {
    console.error("Provider API error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
