interface EnvConfig {
  // Public variables (safe for client)
  app: {
    name: string
    version: string
    environment: string
  }

  // URLs and endpoints (public)
  urls: {
    base: string
    api: string
  }
}

// Only export safe, public environment variables
export const envConfig: EnvConfig = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "dev.3db",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
  },

  urls: {
    base: process.env.NEXTAUTH_URL || "http://localhost:3000",
    api: process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/api` : "http://localhost:3000/api",
  },
}

// Server-side only environment variables
// These should NEVER be imported in client components
export const serverEnv = {
  // Database
  database: {
    url: process.env.DATABASE_URL,
    postgresUrl: process.env.POSTGRES_URL,
  },

  // AI Providers
  ai: {
    together: process.env.TOGETHER_API_KEY,
    groq: process.env.GROQ_API_KEY,
    mistral: process.env.MISTRAL_API_KEY,
    xai: process.env.XAI_API_KEY,
  },

  // Authentication
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  // Storage
  storage: {
    kvUrl: process.env.KV_REST_API_URL,
    kvToken: process.env.KV_REST_API_TOKEN,
    blobToken: process.env.BLOB_READ_WRITE_TOKEN,
  },
}

// Validation function (server-side only)
export function validateServerEnv() {
  const missing: string[] = []

  if (!serverEnv.auth.secret) missing.push("NEXTAUTH_SECRET")
  if (!serverEnv.database.url) missing.push("DATABASE_URL")

  if (missing.length > 0) {
    console.warn("⚠️  Missing environment variables:", missing.join(", "))
  }

  return missing.length === 0
}
