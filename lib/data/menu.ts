import { MenuCategory, MenuItem } from '@/lib/models/menu'

const taqueriaItems: MenuItem[] = [
  { id: 'ta1', name: 'Taco de Pollo', price: 4, description: 'Citrus-marinated grilled chicken, hand-chopped, on double corn tortillas.' },
  { id: 'ta2', name: 'Taco de Carne (Bistek)', price: 4, description: 'Grilled steak chopped hot off the plancha with sweet onion.' },
  { id: 'ta3', name: 'Taco de Carne Enchilada', price: 4, description: 'Pork marinated in guajillo and árbol chiles — a slow, building heat.', tags: ['spicy'] },
  { id: 'ta4', name: 'Taco de Tinga', price: 4, description: 'Shredded chicken simmered in tomato, smoky chipotle and house chorizo.' },
  { id: 'ta5', name: 'Taco de Champiñones', price: 4, description: 'Sautéed mushrooms with garlic, epazote and a touch of chile de árbol.', tags: ['veg'] },
  { id: 'ta6', name: 'Taco de Longaniza', price: 4, description: 'Slow-cured pork sausage rendered crisp on the comal.' },
  { id: 'ta7', name: 'Taco de Cecina', price: 4, description: 'Thin-pounded, dry-aged salted beef, flash-seared on the comal.' },
  { id: 'ta8', name: 'Taco de Carnitas', price: 4, description: 'Pork shoulder confit in its own fat, pulled and lightly crisped.', tags: ['popular'] },
  { id: 'ta9', name: 'Taco al Pastor', price: 4, description: 'Pineapple-marinated pork shaved off the trompo, finished with a squeeze of lime.', tags: ['signature'] },
  { id: 'ta10', name: 'Taco de Lengua', price: 5, description: 'Slow-braised beef tongue, tender and buttery with a clean finish.' },
  { id: 'ta11', name: 'Taco de Sudadero', price: 5, description: 'Braised brisket cut, crisped on the plancha until the edges char.' },
  { id: 'ta12', name: 'Taco de Birria', price: 5, description: 'Slow-stewed beef in a deep, brick-red guajillo broth — served with consomé for dipping.', tags: ['signature', 'popular'] },
]

const quesadillaItems: MenuItem[] = [
  { id: 'q1', name: 'Quesadilla Mixta', price: 10, description: 'Two proteins of your choice, melted Oaxaca cheese, hand-pressed corn tortilla.', tags: ['signature'] },
  { id: 'q2', name: 'Quesadilla de Longaniza', price: 10, description: 'Pork sausage with melted Oaxaca cheese.' },
  { id: 'q3', name: 'Quesadilla de Carnitas', price: 10, description: 'Roast pork with melted Oaxaca cheese.' },
  { id: 'q4', name: 'Quesadilla de Bistek', price: 10, description: 'Grilled steak with melted Oaxaca cheese.' },
  { id: 'q5', name: 'Quesadilla de Cecina', price: 10, description: 'Salted, dry-aged beef with melted Oaxaca cheese.' },
  { id: 'q6', name: 'Quesadilla de Chicharrón', price: 10, description: 'Slow-cooked pork skin with melted Oaxaca cheese.' },
  { id: 'q7', name: 'Quesadilla de Lengua', price: 10, description: 'Slow-braised beef tongue with melted Oaxaca cheese.' },
  { id: 'q8', name: 'Quesadilla de Carne Enchilada', price: 10, description: 'Spicy chile-marinated pork with melted Oaxaca cheese.', tags: ['spicy'] },
  { id: 'q9', name: 'Quesadilla de Sudadero', price: 10, description: 'Braised brisket cut, crisped on the plancha, melted Oaxaca cheese.' },
  { id: 'q10', name: 'Quesadilla de Queso', price: 10, description: 'Pure melted Oaxaca cheese, blistered on the comal.', tags: ['veg'] },
]

export const menuCategories: MenuCategory[] = [
  {
    id: 'tacos',
    title: 'Tacos',
    subtitle: 'Two corn tortillas, onion, cilantro, lime — hand-pressed double tortillas piled with charcoal-grilled or slow-braised proteins.',
    items: taqueriaItems,
  },
  {
    id: 'quesadillas',
    title: 'Quesadillas',
    subtitle: 'Hand-pressed, blistered on the comal — fresh corn tortilla folded over a generous pour of Oaxaca cheese.',
    items: quesadillaItems,
  },
  {
    id: 'especialidades',
    title: 'Especialidades',
    subtitle: 'House plates, burritos and griddled specialties — rolled heavy or plated with rice and beans.',
    items: [
      { id: 'b1', name: 'Burrito', price: 12, description: 'Large flour tortilla, rice, black beans, pico de gallo, Oaxaca cheese and your choice of protein.', tags: ['signature', 'popular'] },
      { id: 'e1', name: 'Sincronizada', price: 7, description: 'Ham and Oaxaca cheese pressed between two flour tortillas, griddled until the edges crisp.' },
      { id: 'e2', name: 'Gringa al Pastor', price: 7, description: 'Two flour tortillas, melted quesillo, al pastor and grilled pineapple — pressed until the cheese crisps.', tags: ['signature'] },
      { id: 'e3', name: 'Carne Asada', price: 20, description: 'Grilled skirt steak plated with rice, beans, charred onion, jalapeños toreados and a stack of fresh tortillas.', tags: ['signature'] },
    ],
  },
  {
    id: 'antojitos',
    title: 'Antojitos',
    subtitle: 'Street snacks from the comal — tostadas, sopes, gorditas and tlacoyos.',
    items: [
      { id: 'a1', name: 'Tostada', price: 5, description: 'Crispy fried corn tortilla layered with refried beans, lettuce, crema, queso fresco and your choice of protein.' },
      { id: 'a2', name: 'Sope', price: 10, description: 'Thick masa base with raised edges, beans, lettuce, crema, queso fresco and your choice of protein.' },
      { id: 'a3', name: 'Gordita', price: 10, description: 'Griddled masa pocket split open and stuffed with beans, cheese and your choice of filling.' },
      { id: 'a4', name: 'Tlacoyo', price: 10, description: 'Oval blue-corn masa stuffed with beans, topped with nopales, queso fresco and salsa verde.', tags: ['veg'] },
    ],
  },
  {
    id: 'tortas',
    title: 'Tortas y Cemitas',
    subtitle: '24 ways to stack a sandwich — griddled telera and sesame cemita rolls layered with beans, avocado, Oaxaca cheese and your choice of meats.',
    items: [],
    groups: [
      {
        name: 'Signature Tortas',
        items: [
          { id: 't1', name: 'Cubana', price: 15, description: 'Milanesa, pierna, salchicha, jamón, queso blanco y amarillo, chorizo, huevo y quesillo.', tags: ['signature'] },
          { id: 't3', name: 'Guerrero', price: 12, description: 'Chuleta, chorizo con rajas de jalapeño y quesillo.', tags: ['signature'] },
          { id: 't19', name: 'Especial', price: 12, description: 'Bistec, pierna y quesillo.', tags: ['signature'] },
        ],
      },
      {
        name: 'Milanesa Based',
        items: [
          { id: 't5', name: 'Rusa', price: 12, description: 'Milanesa, huevo y quesillo.' },
          { id: 't10', name: 'Satélite', price: 12, description: 'Milanesa, queso amarillo y quesillo.' },
          { id: 't11', name: 'Mega', price: 12, description: 'Milanesa, piña y quesillo.' },
          { id: 't12', name: 'Tuluqueña', price: 12, description: 'Milanesa, chorizo y quesillo.' },
          { id: 't13', name: 'Pachuqueña', price: 12, description: 'Milanesa, salchicha y quesillo.' },
          { id: 't15', name: 'Texana', price: 12, description: 'Milanesa, chuleta y quesillo.' },
        ],
      },
      {
        name: 'Steak & Pork Based',
        items: [
          { id: 't2', name: 'Mexicana', price: 12, description: 'Pierna, chorizo con rajas de jalapeño y quesillo.' },
          { id: 't4', name: 'Pastor', price: 12, description: 'Lomo, piña y quesillo.' },
          { id: 't14', name: 'Camelia', price: 12, description: 'Pierna, huevo y quesillo.' },
          { id: 't17', name: 'Lucero', price: 12, description: 'Pierna, queso amarillo y quesillo.' },
          { id: 't18', name: 'Trevi', price: 12, description: 'Pierna, salchicha y quesillo.' },
          { id: 't20', name: 'Norteña', price: 12, description: 'Bistec, tocino y quesillo.' },
          { id: 't21', name: 'Ranchera', price: 12, description: 'Bistec, lomo y quesillo.' },
          { id: 't22', name: 'Fresqui', price: 12, description: 'Bistec, chuleta y quesillo.' },
          { id: 't23', name: 'Árabe', price: 12, description: 'Lomo, chuleta y quesillo.' },
          { id: 't16', name: 'Gabacha', price: 12, description: 'Chuleta, jamón y quesillo.' },
          { id: 't24', name: 'Hawaiana', price: 12, description: 'Chuleta, piña y quesillo.' },
        ],
      },
      {
        name: 'Classic & Vegetarian',
        items: [
          { id: 't6', name: 'Alemana', price: 12, description: 'Chorizo, salchicha y quesillo.' },
          { id: 't7', name: 'Española', price: 12, description: 'Chorizo, huevo y quesillo.' },
          { id: 't8', name: 'Suiza', price: 12, description: 'Queso blanco y amarillo, quesillo.', tags: ['veg'] },
          { id: 't9', name: 'Italiana', price: 12, description: 'Jamón, queso amarillo y quesillo.' },
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    subtitle: 'Sodas, aguas and the basics — bottled Mexican sodas, can sodas and water to cut through the heat.',
    items: [
      { id: 'be1', name: 'Soda de Botella', price: 3, description: "Bottled Mexican soda. Jarritos, Mexican Coke or Sidral Mundet — ask the kitchen what's cold.", tags: ['signature', 'veg'] },
      { id: 'be2', name: 'Soda de Lata', price: 2, description: 'Can soda — Coke, Sprite, Fanta and other classics.', tags: ['veg'] },
      { id: 'be3', name: 'Agua', price: 2, description: 'Bottled still water.', tags: ['veg'] },
    ],
  },
]
