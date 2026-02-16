'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import InquiryModal from './InquiryModal'
import { MessageSquare, Sparkles } from 'lucide-react'

export default function FloatingQuoteButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 shadow-2xl rounded-full px-6 py-7 md:px-8 md:py-7 bg-gold-gradient hover:shadow-accent/50 hover:scale-105 transition-all duration-300 text-primary font-bold text-base md:text-lg group animate-pulse-slow"
        size="lg"
      >
        <Sparkles className="mr-2 h-5 w-5 md:h-6 md:w-6 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline">Get Free Quotes</span>
        <span className="md:hidden">Quote</span>
      </Button>

      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="floating_button"
      />

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(212, 168, 84, 0.7);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(212, 168, 84, 0);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
