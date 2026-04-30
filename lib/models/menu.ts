export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  tags?: MenuTag[]
  image?: string
}

export type MenuTag = 'signature' | 'veg' | 'spicy' | 'popular'

export interface MenuGroup {
  name: string
  items: MenuItem[]
}

export interface MenuCategory {
  id: string
  title: string
  subtitle: string
  items: MenuItem[]
  groups?: MenuGroup[]
}
