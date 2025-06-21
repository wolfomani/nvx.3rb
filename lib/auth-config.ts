import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Mock user database (replace with real database in production)
const users = [
  {
    id: "1",
    email: "user@example.com",
    password: "$2a$10$rOzJqZxjRZ8VqWzZqZxjRZ8VqWzZqZxjRZ8VqWzZqZxjRZ8VqWzZq", // 'password'
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find((u) => u.email === credentials.email)
        if (!user) {
          return null
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password)
        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      if (account?.provider === "google") {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.accessToken = token.accessToken as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Auto-create user from Google profile
        const existingUser = users.find((u) => u.email === user.email)
        if (!existingUser) {
          const newUser = {
            id: Date.now().toString(),
            email: user.email!,
            password: "", // No password for OAuth users
            name: user.name!,
            avatar: user.image!,
          }
          users.push(newUser)
        }
      }
      return true
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
}
