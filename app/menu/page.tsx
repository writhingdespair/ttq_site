'use client'

import { useState, useRef, useEffect } from 'react'
import { menuCategories } from '@/lib/data/menu'
import MenuItemRow from '@/components/menu/MenuItemRow'
import MenuCategoryNav from '@/components/menu/MenuCategoryNav'
import Footer from '@/components/Footer'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(menuCategories[0]?.id || null)
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
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToCategory = (id: string) => {
    const el = sectionRefs.current[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <div className="pt-16 md:pt-[72px]">
        <div className="py-4xl md:py-5xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-label-md text-terra-300 uppercase tracking-widest mb-3">
              Full Menu
            </p>
            <h1 className="font-display text-display-xl text-white text-balance">
              Everything we make
            </h1>
            <p className="mt-md max-w-xl mx-auto text-body-base text-secondary">
              Browse our complete menu. Add items to your cart and order online for pickup.
            </p>
          </div>
        </div>

        <MenuCategoryNav
          categories={menuCategories}
          activeId={activeCategory}
          onSelect={scrollToCategory}
        />

        <div className="mx-auto max-w-3xl px-6 py-4xl md:py-5xl">
          <div className="space-y-6xl">
            {menuCategories.map((category) => (
              <section
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el }}
                data-category-id={category.id}
              >
                <div className="mb-3xl">
                  <h2 className="font-display text-display-sm md:text-display-md text-white text-balance">
                    {category.title}
                  </h2>
                  <p className="mt-sm text-body-sm text-tertiary max-w-xl">{category.subtitle}</p>
                  <div className="mt-lg h-px bg-white/[0.06]" />
                </div>

                <div>
                  {category.items.map((item) => (
                    <MenuItemRow
                      key={item.id}
                      item={item}
                      highlighted={item.tags?.includes('signature')}
                    />
                  ))}
                </div>

                {category.groups && category.groups.map((group) => (
                  <div key={group.name} className="mt-5">
                    <h3 className="text-label-sm text-white/40 uppercase tracking-wider mb-3">{group.name}</h3>
                    <div>
                      {group.items.map((item) => (
                        <MenuItemRow
                          key={item.id}
                          item={item}
                          highlighted={item.tags?.includes('signature')}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
