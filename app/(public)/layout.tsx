import { ReactNode } from "react"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import FloatingQuoteButton from "@/components/shared/FloatingQuoteButton"
import { siteConfig, malaysianStates, serviceCategories } from "@/lib/config"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-primary text-primary-foreground">
        <div className="container max-w-[1280px] mx-auto px-4 md:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg mb-4">About DMCMY</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Malaysia's premier directory connecting businesses with top-rated Destination Management Companies for corporate events, MICE, and luxury travel.
              </p>
              <div className="flex gap-3">
                <a href="#" className="hover:text-accent transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Browse by Service */}
            <div>
              <h3 className="font-bold text-lg mb-4">Browse by Service</h3>
              <ul className="space-y-2 text-sm">
                {serviceCategories.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="text-primary-foreground/80 hover:text-accent transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Browse by State */}
            <div>
              <h3 className="font-bold text-lg mb-4">Browse by State</h3>
              <ul className="space-y-2 text-sm">
                {malaysianStates.slice(0, 6).map((state) => (
                  <li key={state.slug}>
                    <Link href={`/locations/${state.slug}`} className="text-primary-foreground/80 hover:text-accent transition-colors">
                      {state.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary-foreground/80 hover:text-accent transition-colors">
                    {siteConfig.contactEmail}
                  </a>
                </li>
                <li>
                  <Link href="/pricing" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    Pricing for DMCs
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    List Your DMC
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            © {siteConfig.currentYear} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Quote Button */}
      <FloatingQuoteButton />
    </div>
  )
}
