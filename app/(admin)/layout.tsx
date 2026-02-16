import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { siteConfig } from '@/lib/config'
import { Shield, LayoutDashboard, Building2, Upload, GitPullRequest, Home, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Admin user IDs from environment variable (comma-separated)
const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(',').map(id => id.trim()) || []

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check if user is authenticated
  if (!user) {
    redirect('/login')
  }

  // Check if user is admin
  if (!ADMIN_USER_IDS.includes(user.id)) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-primary text-primary-foreground sticky top-0 z-40">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6" />
            <div>
              <Link href="/admin" className="text-2xl font-bold hover:text-accent transition-colors">
                {siteConfig.name} Admin
              </Link>
              <Badge variant="secondary" className="ml-3 bg-accent text-accent-foreground">
                Admin Panel
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <Button type="submit" variant="secondary" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/30 hidden md:block">
          <nav className="p-4 space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/companies">
              <Button variant="ghost" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-3" />
                Companies
              </Button>
            </Link>
            <Link href="/admin/import">
              <Button variant="ghost" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-3" />
                CSV Import
              </Button>
            </Link>
            <Link href="/admin/claims">
              <Button variant="ghost" className="w-full justify-start">
                <GitPullRequest className="h-4 w-4 mr-3" />
                Claim Requests
              </Button>
            </Link>
            <div className="pt-4 mt-4 border-t">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-3" />
                  View Site
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
