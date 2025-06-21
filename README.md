# dev.3db - AI-Powered Development Platform

A comprehensive Next.js 14 AI-powered web platform with multi-provider integration, real-time code editor, and live preview capabilities.

## 🚀 Features

- **Multi-Provider AI Integration**: OpenAI, Groq, Together, Codestral, and Mistral
- **Real-time Code Editor**: Advanced editor with syntax highlighting and auto-completion
- **Live Preview**: Instant preview of code changes with hot reloading
- **Authentication**: JWT + Google OAuth integration
- **Multi-language Support**: Arabic/English with RTL/LTR layouts
- **Glass/Neon Design**: Beautiful modern UI with glass morphism effects
- **Responsive Design**: Fully responsive across all devices
- **Security**: Rate limiting, CSRF protection, and secure API key management
- **Docker Ready**: Complete containerization for easy deployment
- **Vercel Optimized**: Ready for deployment on Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: NextAuth.js + JWT
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Docker + Vercel
- **AI Integration**: Multiple provider support

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Redis (for rate limiting)
- AI provider API keys

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/yourusername/dev-3db-platform.git
   cd dev-3db-platform
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   
   Edit `.env.local` with your configuration:
   - Database connection string
   - JWT secrets
   - Google OAuth credentials
   - AI provider API keys

4. **Set up the database:**
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

5. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

### Using Docker Compose

1. **Clone and configure:**
   \`\`\`bash
   git clone https://github.com/yourusername/dev-3db-platform.git
   cd dev-3db-platform
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

2. **Build and run:**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

3. **Access the application:**
   - Application: http://localhost:3000
   - Database: localhost:5432
   - Redis: localhost:6379

### Production Docker Build

\`\`\`bash
# Build the image
docker build -t dev-3db-platform .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-jwt-secret" \
  dev-3db-platform
\`\`\`

## ☁️ Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/dev-3db-platform)

### Manual Deployment

1. **Install Vercel CLI:**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Deploy:**
   \`\`\`bash
   vercel --prod
   \`\`\`

3. **Set environment variables:**
   Configure all required environment variables in the Vercel dashboard.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret for JWT token signing | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Optional |
| `GROQ_API_KEY` | Groq API key | Optional |
| `TOGETHER_API_KEY` | Together AI API key | Optional |
| `CODESTRAL_API_KEY` | Codestral API key | Optional |
| `MISTRAL_API_KEY` | Mistral AI API key | Optional |

### AI Provider Setup

1. **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. **Groq**: Sign up at [Groq Console](https://console.groq.com/)
3. **Together AI**: Get API access at [Together AI](https://api.together.xyz/)
4. **Codestral**: Access through [Mistral AI](https://mistral.ai/)
5. **Mistral**: Get your key from [Mistral Platform](https://console.mistral.ai/)

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth` - Login/Register
- `GET /api/auth` - Get current user

### AI Provider Endpoints

- `GET /api/providers` - List available providers
- `POST /api/providers` - Send AI request

### Example AI Request

\`\`\`javascript
const response = await fetch('/api/providers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    provider: 'openai',
    model: 'gpt-4',
    messages: [
      { role: 'user', content: 'Hello, world!' }
    ],
    apiKey: 'your-api-key'
  })
})

const data = await response.json()
console.log(data.response)
\`\`\`

## 🎨 Customization

### Themes

The platform uses a glass/neon design theme with customizable colors:

- Primary gradient: `from-[#1e084a] to-[#461c5a]`
- Accent colors: Purple, Teal, Green
- Glass effects with backdrop blur

### Adding New AI Providers

1. Add provider configuration in `/app/api/providers/route.ts`
2. Update the provider list in the UI components
3. Add environment variables for API keys

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API request throttling
- **CSRF Protection**: Cross-site request forgery prevention
- **Input Validation**: Comprehensive request validation
- **API Key Security**: Secure storage and handling of API keys

## 🌐 Internationalization

The platform supports multiple languages:

- **English (EN)**: Default language
- **Arabic (AR)**: Full RTL support

To add a new language:

1. Add translations in `/components/i18n/i18n-provider.tsx`
2. Update the language switcher component
3. Add RTL/LTR support as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.dev3db.com](https://docs.dev3db.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/dev-3db-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/dev-3db-platform/discussions)
- **Email**: support@dev3db.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ by the dev.3db team
