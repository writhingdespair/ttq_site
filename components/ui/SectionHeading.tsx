import { cn } from '@/lib/utils'
import { SECTION_HEADING } from '@/lib/design-tokens'

interface SectionHeadingProps {
  as?: 'h2' | 'h3'
  children: React.ReactNode
  className?: string
}

export default function SectionHeading({ as: Tag = 'h2', children, className }: SectionHeadingProps) {
  return (
    <Tag className={cn(SECTION_HEADING[Tag], className)}>
      {children}
    </Tag>
  )
}
