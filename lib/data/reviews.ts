export interface Review {
  name: string
  location: string
  rating: number
  text: string
  featured?: boolean
}

export const reviews: Review[] = [
  {
    name: 'Maria L.',
    location: 'New Paltz, NY',
    rating: 5,
    text: 'Best birria tacos in the Hudson Valley, hands down. The consomé is rich and the tortillas are clearly handmade. We drive 20 minutes just for this.',
    featured: true,
  },
  {
    name: 'James R.',
    location: 'Poughkeepsie, NY',
    rating: 5,
    text: 'The Cubana torta is stacked. Real telera bread, perfect ratios, and the chorizo has actual spice. Finally found a spot that reminds me of Mexico City.',
  },
  {
    name: 'The Chen Family',
    location: 'Highland, NY',
    rating: 5,
    text: 'We eat here every Sunday after the rail trail. The family is so welcoming and the lengua tacos are buttery tender. Our kids love the quesadillas de queso.',
  },
  {
    name: 'Derek S.',
    location: 'Kingston, NY',
    rating: 4,
    text: 'Incredible al pastor and great value. Only wish they had more seating near the truck. We usually take it to go and eat by the river.',
  },
]
