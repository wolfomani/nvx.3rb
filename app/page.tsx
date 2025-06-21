import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { CodeEditor } from "@/components/editor/code-editor"
import { LivePreview } from "@/components/preview/live-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Code Editor</h2>
              <CodeEditor />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Live Preview</h2>
              <LivePreview />
            </div>
          </div>
        </div>
        <Features />
      </main>
    </div>
  )
}
