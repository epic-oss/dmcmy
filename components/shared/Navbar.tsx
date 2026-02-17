'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { serviceCategories, destinations } from '@/lib/config'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [destinationsOpen, setDestinationsOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
            <Image src="/logo/dmcmylogo.png" alt="DMCMY" width={36} height={36} className="w-9 h-9" />
            <span className="text-2xl font-bold">DMCMY</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/listings" className="px-3 py-2 rounded-md text-sm hover:text-accent transition-colors">
              Browse DMCs
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm hover:text-accent transition-colors outline-none">
                  Services <ChevronDown className="h-3.5 w-3.5 mt-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto" align="start">
                {serviceCategories.map((service) => (
                  <DropdownMenuItem key={service.slug} asChild>
                    <Link href={`/services/${service.slug}`} className="w-full">
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Destinations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-2 rounded-md text-sm hover:text-accent transition-colors outline-none">
                  Destinations <ChevronDown className="h-3.5 w-3.5 mt-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto" align="start">
                {destinations.map((dest) => (
                  <DropdownMenuItem key={dest.slug} asChild>
                    <Link href={`/destinations/${dest.slug}`} className="w-full">
                      {dest.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/guides" className="px-3 py-2 rounded-md text-sm hover:text-accent transition-colors">
              Guides
            </Link>

            <Link href="/pricing" className="px-3 py-2 rounded-md text-sm hover:text-accent transition-colors">
              Pricing
            </Link>

            <Link href="/submit" className="ml-2">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-primary font-semibold"
              >
                List Your DMC
              </Button>
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md hover:text-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-primary-foreground/20">
          <nav className="container max-w-[1280px] mx-auto px-4 py-4 space-y-1">

            <Link
              href="/listings"
              className="block px-3 py-2.5 rounded-md text-sm hover:text-accent hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Browse DMCs
            </Link>

            {/* Services Accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm hover:text-accent hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-primary-foreground/20 pl-3">
                  {serviceCategories.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block py-1.5 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Destinations Accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm hover:text-accent hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setDestinationsOpen(!destinationsOpen)}
              >
                Destinations
                <ChevronDown className={`h-4 w-4 transition-transform ${destinationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {destinationsOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-primary-foreground/20 pl-3">
                  {destinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      href={`/destinations/${dest.slug}`}
                      className="block py-1.5 text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {dest.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/guides"
              className="block px-3 py-2.5 rounded-md text-sm hover:text-accent hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Guides
            </Link>

            <Link
              href="/pricing"
              className="block px-3 py-2.5 rounded-md text-sm hover:text-accent hover:bg-primary-foreground/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            <div className="pt-2">
              <Link href="/submit" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold">
                  List Your DMC
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
