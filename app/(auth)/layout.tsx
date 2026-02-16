import { ReactNode } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header className="border-b bg-background">
        <div className="container py-4">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
            {siteConfig.name}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {siteConfig.currentYear} {siteConfig.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
