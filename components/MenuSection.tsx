'use client'

import { menuCategories } from '@/lib/data/menu'
import { MenuGroup } from '@/lib/models/menu'
import MenuItemRow from '@/components/menu/MenuItemRow'
import { useScrollReveal } from '@/lib/hooks/use-scroll-reveal'

function MenuGroupBlock({ group }: { group: MenuGroup }) {
  return (
    <div className="mt-5">
      <h4 className="text-label-sm text-white/40 uppercase tracking-wider mb-3">{group.name}</h4>
      <div>
        {group.items.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function MenuSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 })

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

          <div className="space-y-5xl">
            {menuCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-3xl">
                  <h3 className="font-display text-display-sm md:text-display-md text-white text-balance">
                    {category.title}
                  </h3>
                  <p className="mt-sm text-body-sm text-tertiary max-w-2xl">{category.subtitle}</p>
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
