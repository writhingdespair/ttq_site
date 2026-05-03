'use client'

import { menuCategories } from '@/lib/data/menu'
import MenuItemCard from '@/components/menu/MenuItemRow'
import MenuCategoryNav from '@/components/menu/MenuCategoryNav'
import Footer from '@/components/Footer'
import { useMenuScrollSpy } from '@/lib/hooks/use-menu-scroll-spy'

export default function MenuPage() {
  const { activeId, sectionRefs, scrollToCategory } = useMenuScrollSpy()

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
          activeId={activeId}
          onSelect={scrollToCategory}
        />

        <div className="mx-auto max-w-4xl px-6 py-4xl md:py-5xl">
          <div className="space-y-6xl">
            {menuCategories.map((category) => (
              <section
                key={category.id}
                ref={(el) => { sectionRefs.current[category.id] = el }}
                data-category-id={category.id}
                id={category.id}
              >
                <div className="mb-3xl">
                  <h2 className="font-display text-display-sm md:text-display-md text-white text-balance">
                    {category.title}
                  </h2>
                  <p className="mt-sm text-body-sm text-tertiary max-w-xl">{category.subtitle}</p>
                  <div className="mt-lg h-px bg-white/[0.06]" />
                </div>

                {category.items.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {category.groups && category.groups.map((group) => (
                  <div key={group.name} className="mt-5">
                    <h3 className="text-label-sm text-white/40 uppercase tracking-wider mb-4">{group.name}</h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {group.items.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
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
