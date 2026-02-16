import { ReactNode } from 'react'

export default function Hero({
  title,
  subtitle,
  image,
  children
}: {
  title: string
  subtitle?: string
  image?: string
  children?: ReactNode
}) {
  return (
    <section
      className="relative bg-primary text-primary-foreground py-24 md:py-32 px-4 overflow-hidden"
      style={image ? {
        backgroundImage: `linear-gradient(135deg, rgba(26, 54, 93, 0.92) 0%, rgba(15, 32, 56, 0.95) 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : {
        background: 'linear-gradient(135deg, #1a365d 0%, #0f2038 100%)'
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-primary-foreground/90 font-light max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}
