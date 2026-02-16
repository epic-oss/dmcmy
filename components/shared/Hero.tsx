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
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
      style={image ? {
        backgroundImage: `linear-gradient(135deg, rgba(26, 54, 93, 0.95) 0%, rgba(15, 32, 56, 0.97) 100%), url(${image})`,
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

      <div className="container max-w-[1280px] mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
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
