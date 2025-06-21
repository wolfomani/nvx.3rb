import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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

export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json()

    if (action === "login") {
      // Find user
      const user = users.find((u) => u.email === email)
      if (!user) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        token,
        user: userWithoutPassword,
      })
    }

    if (action === "register") {
      const { name } = await request.json()

      // Check if user already exists
      const existingUser = users.find((u) => u.email === email)
      if (existingUser) {
        return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff`,
      }

      users.push(newUser)

      // Generate JWT token
      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "7d" })

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = newUser

      return NextResponse.json({
        success: true,
        token,
        user: userWithoutPassword,
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as any

    // Find user
    const user = users.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
  }
}
