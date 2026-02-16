'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import InquiryModal from './InquiryModal'
import { MessageSquareQuote } from 'lucide-react'

export default function FloatingQuoteButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 shadow-2xl hover:shadow-3xl rounded-full px-5 py-6 md:px-7 md:py-6 transition-all duration-300 hover:scale-105 group"
        size="lg"
      >
        <MessageSquareQuote className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-semibold">Get Free Quotes</span>
        <span className="sm:hidden font-semibold">Quote</span>
      </Button>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="floating_button"
      />
    </>
  )
}
