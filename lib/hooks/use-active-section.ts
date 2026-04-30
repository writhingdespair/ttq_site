'use client'

import { useState, useEffect } from 'react'

const SECTION_IDS = ['story', 'menu', 'reviews', 'visit']

export function useActiveSection(): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      const scrollY = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(section.id)
          return
        }
      }
      setActiveSection(null)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return activeSection
}
