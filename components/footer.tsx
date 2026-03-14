import Link from "next/link"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MindForge Learning</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/video-ai" className="text-muted-foreground hover:text-foreground transition-colors">
              Video AI
            </Link>
            <Link href="/myth-vs-fact" className="text-muted-foreground hover:text-foreground transition-colors">
              Myth vs Fact
            </Link>
            <Link href="/3d-explorer" className="text-muted-foreground hover:text-foreground transition-colors">
              3D Explorer
            </Link>
            <Link href="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">
              Quiz
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MindForge Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
