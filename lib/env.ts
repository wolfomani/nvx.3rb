// Environment variable validation
export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL || process.env.POSTGRES_URL,

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // AI Providers
  TOGETHER_API_KEY: process.env.TOGETHER_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
  XAI_API_KEY: process.env.XAI_API_KEY,

  // Storage
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,

  // Optional
  EDGEDB_INSTANCE: process.env.EDGEDB_INSTANCE,
  EDGEDB_SECRET_KEY: process.env.EDGEDB_SECRET_KEY,
}

// Validation warnings (only in development)
if (process.env.NODE_ENV === "development") {
  const missing = []

  if (!env.GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID")
  if (!env.GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET")
  if (!env.JWT_SECRET) missing.push("JWT_SECRET or NEXTAUTH_SECRET")

  if (missing.length > 0) {
    console.warn("⚠️  Missing environment variables:", missing.join(", "))
    console.warn("📝 Copy .env.local.example to .env.local and fill in the values")
  }
}
