export const SPACING = {
  '4xs': '0.125rem',
  '3xs': '0.25rem',
  '2xs': '0.5rem',
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
  '5xl': '6rem',
  '6xl': '8rem',
  '7xl': '10rem',
} as const

export const SECTION_PADDING = {
  hero: 'pt-7xl pb-4xl md:pt-[12rem] md:pb-6xl',
  dense: 'py-4xl md:py-5xl',
  standard: 'py-5xl md:py-6xl',
  relaxed: 'py-6xl md:py-7xl',
  generous: 'py-7xl md:py-8xl',
} as const

export const CONTAINER = {
  narrow: 'mx-auto max-w-3xl px-6',
  default: 'mx-auto max-w-4xl px-6',
  wide: 'mx-auto max-w-6xl px-6',
} as const

export const SECTION_HEADING = {
  h2: 'font-display text-display-md md:text-display-lg text-primary text-balance',
  h3: 'font-display text-display-sm md:text-display-md text-primary text-balance',
} as const

export const BODY = {
  lg: 'text-body-lg text-secondary',
  base: 'text-body-base text-secondary',
  sm: 'text-body-sm text-secondary',
  xs: 'text-body-xs text-tertiary',
} as const

export const TRANSITIONS = {
  fast: 'duration-fast',
  base: 'duration-base',
  slow: 'duration-slow',
  reveal: 'duration-reveal',
} as const

export const EASING = {
  spring: 'ease-spring',
  out: 'ease-out-expo',
  inOut: 'ease-in-out-expo',
} as const
