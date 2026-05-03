'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export function useMenuScrollSpy() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const lastActiveRef = useRef<string | null>(null)

  const getHeaderOffset = useCallback(() => {
    return window.innerWidth >= 768 ? 120 : 112
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    const setup = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('data-category-id')
              if (id && id !== lastActiveRef.current) {
                lastActiveRef.current = id
                setActiveId(id)
              }
            }
          }
        },
        { rootMargin: `-${getHeaderOffset()}px 0px -60% 0px`, threshold: 0 }
      )

      const refs = sectionRefs.current
      Object.values(refs).forEach((el) => {
        if (el) observer!.observe(el)
      })
    }

    setup()
    window.addEventListener('resize', setup)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', setup)
    }
  }, [getHeaderOffset])

  const scrollToCategory = useCallback((id: string) => {
    const el = sectionRefs.current[id]
    if (!el) return
    const headerOffset = getHeaderOffset()
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }, [getHeaderOffset])

  return { activeId, sectionRefs, scrollToCategory }
}
