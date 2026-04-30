'use client'

import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'terra'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-white text-black hover:bg-white/90 hover:shadow-elevation-2 active:bg-white/80',
  secondary: 'bg-white/10 text-white hover:bg-white/[0.14] hover:shadow-elevation-1 active:bg-white/[0.08]',
  ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/[0.06]',
  terra: 'bg-terra-500 text-white hover:bg-terra-400 hover:shadow-glow-terra active:bg-terra-600',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-label-sm rounded-lg gap-1.5',
  md: 'h-11 px-5 text-label-md rounded-xl gap-2',
  lg: 'h-14 px-7 text-body-base rounded-full gap-2.5',
}

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) {
  return (
    <button
      className={cn(
        'btn',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  href,
  children,
  ...props
}: ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; className?: string }) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(
          'btn no-underline',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'btn no-underline',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...(props as any)}
    >
      {children}
    </Link>
  )
}
