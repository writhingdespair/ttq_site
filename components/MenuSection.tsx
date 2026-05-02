'use client'

import { useState, useRef, useEffect } from 'react'
import { menuCategories } from '@/lib/data/menu'
import { MenuGroup } from '@/lib/models/menu'
import MenuItemCard from '@/components/menu/MenuItemRow'
import MenuCategoryNav from '@/components/menu/MenuCategoryNav'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

function MenuGroupBlock({ group }: { group: MenuGroup }) {
  return (
    <div className="mt-5">
      <h4 className="text-label-sm text-white/40 uppercase tracking-wider mb-4">{group.name}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {group.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function MenuSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0 })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-category-id')
            if (id) setActiveCategory(id)
          }
        }
      },
      { rootMargin: `-${window.innerWidth >= 768 ? 120 : 112}px 0px -60% 0px`, threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToCategory = (id: string) => {
    const el = sectionRefs.current[id]
    if (!el) return
    const headerOffset = window.innerWidth >= 768 ? 120 : 112
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="menu" className="py-5xl md:py-6xl bg-black">
      <div className="mx-auto max-w-4xl px-6">
        <div
          ref={ref}
          className={`transition-all duration-reveal ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-3xl md:mb-4xl">
            <p className="text-label-md text-terra-300 uppercase tracking-widest mb-3">
              Our Kitchen
            </p>
            <h2 className="font-display text-display-md md:text-display-lg text-white text-balance">
              The Menu
            </h2>
            <p className="mt-md max-w-xl text-body-base text-secondary">
              Everything is made to order. Call us to place your order for pickup, or add items to your cart for online ordering.
            </p>
          </div>
        </div>

        <MenuCategoryNav
          categories={menuCategories}
          activeId={activeCategory}
          onSelect={scrollToCategory}
        />

        <div
          className={`transition-all duration-reveal ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-5xl pt-4xl">
            {menuCategories.map((category) => (
              <div
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el }}
                data-category-id={category.id}
                id={category.id}
              >
                <div className="mb-3xl">
                  <h3 className="font-display text-display-sm md:text-display-md text-white text-balance">
                    {category.title}
                  </h3>
                  <p className="mt-sm text-body-sm text-tertiary max-w-2xl">{category.subtitle}</p>
                  <div className="mt-lg h-px bg-white/[0.06]" />
                </div>

                {category.items.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {category.groups && category.groups.map((group) => (
                  <MenuGroupBlock key={group.name} group={group} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
