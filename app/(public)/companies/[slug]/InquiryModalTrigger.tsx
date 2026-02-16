'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import InquiryModal from '@/components/shared/InquiryModal'
import { Send } from 'lucide-react'

interface InquiryModalTriggerProps {
  companyId: string
  companyName: string
}

export default function InquiryModalTrigger({ companyId, companyName }: InquiryModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full"
        size="lg"
      >
        <Send className="mr-2 h-5 w-5" />
        Request Quote
      </Button>

      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        source="company_specific_inquiry"
        companyId={companyId}
        companyName={companyName}
      />
    </>
  )
}
