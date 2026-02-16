import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface HeroProps {
  title: string
  subtitle?: string
  image?: string
  children?: ReactNode
  className?: string
  size?: 'default' | 'large' | 'small'
}

export default function Hero({
  title,
  subtitle,
  image,
  children,
  className,
  size = 'default'
}: HeroProps) {
  const sizeClasses = {
    small: 'py-12 md:py-16',
    default: 'py-16 md:py-24',
    large: 'py-24 md:py-32'
  }

  const titleSizes = {
    small: 'text-3xl md:text-4xl',
    default: 'text-4xl md:text-5xl lg:text-6xl',
    large: 'text-5xl md:text-6xl lg:text-7xl'
  }

  return (
    <section
      className={cn(
        "relative bg-primary text-primary-foreground overflow-hidden",
        sizeClasses[size],
        className
      )}
      style={image ? {
        backgroundImage: `linear-gradient(rgba(26, 54, 93, 0.88), rgba(26, 54, 93, 0.88)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      {/* Decorative Elements */}
      {!image && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title */}
          <h1 className={cn(
            "font-bold mb-4 md:mb-6 leading-tight",
            titleSizes[size]
          )}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Children (e.g., search bar, CTA buttons) */}
          {children && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
