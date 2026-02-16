import { ReactNode } from "react"
import Link from "next/link"
import FloatingQuoteButton from "@/components/shared/FloatingQuoteButton"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-accent transition-colors">
            DMCMY
          </Link>
          <nav className="flex gap-6">
            <Link href="/listings" className="hover:text-accent transition-colors">
              Browse DMCs
            </Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">
              Pricing
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-muted py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DMCMY. All rights reserved.
        </div>
      </footer>

      {/* Floating Quote Button */}
      <FloatingQuoteButton />
    </div>
  )
}
