import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md'
}

export default function StarRating({ rating, max = 5, size = 'sm' }: StarRatingProps) {
  const sizeClass = size === 'md' ? 'h-5 w-5' : 'h-3.5 w-3.5'

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-amber-400/15 text-amber-400/15'
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}
