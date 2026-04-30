export interface Customer {
  id?: string
  name: string
  phone: string
  email?: string
  lastOrderAt?: string
  totalOrders: number
  loyaltyPoints: number
  savedAddresses?: Address[]
  preferences?: CustomerPreferences
}

export interface Address {
  id: string
  label: string
  street: string
  city: string
  state: string
  zip: string
}

export interface CustomerPreferences {
  favoriteItems?: string[]
  dietaryRestrictions?: string[]
  spiceLevel?: 'mild' | 'medium' | 'hot'
}
