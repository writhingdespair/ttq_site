import { cn } from '@/lib/utils'
import type { MenuTag } from '@/lib/models/menu'

const TAG_LABELS: Record<MenuTag, string> = {
  signature: 'Signature',
  veg: 'Vegetarian',
  spicy: 'Spicy',
  popular: 'Popular',
}

const TAG_STYLES: Record<MenuTag, string> = {
  signature: 'bg-terra-500/15 text-terra-300 border-terra-500/20',
  veg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  spicy: 'bg-red-500/10 text-red-300 border-red-500/20',
  popular: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
}

export default function Badge({ tag, className }: { tag: MenuTag; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-wider',
      TAG_STYLES[tag],
      className
    )}>
      {TAG_LABELS[tag]}
    </span>
  )
}
