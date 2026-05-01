import { MenuCategory, MenuItem } from '@/lib/models/menu'

const taqueriaItems: MenuItem[] = [
  { id: 'ta1', name: 'Taco de Pollo', price: 4, description: 'Citrus-marinated grilled chicken, hand-chopped, on double corn tortillas.', image: '/images/menu/taco-de-pollo.jpg' },
  { id: 'ta2', name: 'Taco de Carne (Bistek)', price: 4, description: 'Grilled steak chopped hot off the plancha with sweet onion.', image: '/images/menu/taco-de-carne-bistek.jpg' },
  { id: 'ta3', name: 'Taco de Carne Enchilada', price: 4, description: 'Pork marinated in guajillo and árbol chiles — a slow, building heat.', tags: ['spicy'], image: '/images/menu/taco-de-carne-enchilada.jpg' },
  { id: 'ta4', name: 'Taco de Tinga', price: 4, description: 'Shredded chicken simmered in tomato, smoky chipotle and house chorizo.', image: '/images/menu/taco-de-tinga.jpg' },
  { id: 'ta5', name: 'Taco de Champiñones', price: 4, description: 'Sautéed mushrooms with garlic, epazote and a touch of chile de árbol.', tags: ['veg'], image: '/images/menu/taco-de-champinones.jpg' },
  { id: 'ta6', name: 'Taco de Longaniza', price: 4, description: 'Slow-cured pork sausage rendered crisp on the comal.', image: '/images/menu/taco-de-longaniza.jpg' },
  { id: 'ta7', name: 'Taco de Cecina', price: 4, description: 'Thin-pounded, dry-aged salted beef, flash-seared on the comal.', image: '/images/menu/taco-de-cecina.jpg' },
  { id: 'ta8', name: 'Taco de Carnitas', price: 4, description: 'Pork shoulder confit in its own fat, pulled and lightly crisped.', tags: ['popular'], image: '/images/menu/taco-de-carnitas.jpg' },
  { id: 'ta9', name: 'Taco al Pastor', price: 4, description: 'Pineapple-marinated pork shaved off the trompo, finished with a squeeze of lime.', tags: ['signature'], image: '/images/menu/taco-al-pastor.jpg' },
  { id: 'ta10', name: 'Taco de Lengua', price: 5, description: 'Slow-braised beef tongue, tender and buttery with a clean finish.', image: '/images/menu/taco-de-lengua.jpg' },
  { id: 'ta11', name: 'Taco de Sudadero', price: 5, description: 'Braised brisket cut, crisped on the plancha until the edges char.', image: '/images/menu/taco-de-sudadero.jpg' },
  { id: 'ta12', name: 'Taco de Birria', price: 5, description: 'Slow-stewed beef in a deep, brick-red guajillo broth — served with consomé for dipping.', tags: ['signature', 'popular'], image: '/images/menu/taco-de-birria.jpg' },
]

const quesadillaItems: MenuItem[] = [
  { id: 'q1', name: 'Quesadilla Mixta', price: 10, description: 'Two proteins of your choice, melted Oaxaca cheese, hand-pressed corn tortilla.', tags: ['signature'], image: '/images/menu/quesadilla-mixta.jpg' },
  { id: 'q2', name: 'Quesadilla de Longaniza', price: 10, description: 'Pork sausage with melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-longaniza.jpg' },
  { id: 'q3', name: 'Quesadilla de Carnitas', price: 10, description: 'Roast pork with melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-carnitas.jpg' },
  { id: 'q4', name: 'Quesadilla de Bistek', price: 10, description: 'Grilled steak with melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-bistek.jpg' },
  { id: 'q5', name: 'Quesadilla de Cecina', price: 10, description: 'Salted, dry-aged beef with melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-cecina.jpg' },
  { id: 'q6', name: 'Quesadilla de Chicharrón', price: 10, description: 'Slow-cooked pork skin with melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-chicharron.jpg' },
  { id: 'q7', name: 'Quesadilla de Lengua', price: 10, description: 'Slow-braised beef tongue with melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-lengua.jpg' },
  { id: 'q8', name: 'Quesadilla de Carne Enchilada', price: 10, description: 'Spicy chile-marinated pork with melted Oaxaca cheese.', tags: ['spicy'], image: '/images/menu/quesadilla-de-carne-enchilada.jpg' },
  { id: 'q9', name: 'Quesadilla de Sudadero', price: 10, description: 'Braised brisket cut, crisped on the plancha, melted Oaxaca cheese.', image: '/images/menu/quesadilla-de-sudadero.jpg' },
  { id: 'q10', name: 'Quesadilla de Queso', price: 10, description: 'Pure melted Oaxaca cheese, blistered on the comal.', tags: ['veg'], image: '/images/menu/quesadilla-de-queso.jpg' },
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
      { id: 'b1', name: 'Burrito', price: 12, description: 'Large flour tortilla, rice, black beans, pico de gallo, Oaxaca cheese and your choice of protein.', tags: ['signature', 'popular'], image: '/images/menu/burrito.jpg' },
      { id: 'e1', name: 'Sincronizada', price: 7, description: 'Ham and Oaxaca cheese pressed between two flour tortillas, griddled until the edges crisp.', image: '/images/menu/sincronizada.jpg' },
      { id: 'e2', name: 'Gringa al Pastor', price: 7, description: 'Two flour tortillas, melted quesillo, al pastor and grilled pineapple — pressed until the cheese crisps.', tags: ['signature'], image: '/images/menu/gringa-al-pastor.jpg' },
      { id: 'e3', name: 'Carne Asada', price: 20, description: 'Grilled skirt steak plated with rice, beans, charred onion, jalapeños toreados and a stack of fresh tortillas.', tags: ['signature'], image: '/images/menu/carne-asada.jpg' },
    ],
  },
  {
    id: 'antojitos',
    title: 'Antojitos',
    subtitle: 'Street snacks from the comal — tostadas, sopes, gorditas and tlacoyos.',
    items: [
      { id: 'a1', name: 'Tostada', price: 5, description: 'Crispy fried corn tortilla layered with refried beans, lettuce, crema, queso fresco and your choice of protein.', image: '/images/menu/tostada.jpg' },
      { id: 'a2', name: 'Sope', price: 10, description: 'Thick masa base with raised edges, beans, lettuce, crema, queso fresco and your choice of protein.', image: '/images/menu/sope.jpg' },
      { id: 'a3', name: 'Gordita', price: 10, description: 'Griddled masa pocket split open and stuffed with beans, cheese and your choice of filling.', image: '/images/menu/gordita.jpg' },
      { id: 'a4', name: 'Tlacoyo', price: 10, description: 'Oval blue-corn masa stuffed with beans, topped with nopales, queso fresco and salsa verde.', tags: ['veg'], image: '/images/menu/tlacoyo.jpg' },
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
          { id: 't1', name: 'Cubana', price: 15, description: 'Milanesa, pierna, salchicha, jamón, queso blanco y amarillo, chorizo, huevo y quesillo.', tags: ['signature'], image: '/images/menu/cubana.jpg' },
          { id: 't3', name: 'Guerrero', price: 12, description: 'Chuleta, chorizo con rajas de jalapeño y quesillo.', tags: ['signature'], image: '/images/menu/guerrero.jpg' },
          { id: 't19', name: 'Especial', price: 12, description: 'Bistec, pierna y quesillo.', tags: ['signature'], image: '/images/menu/especial.jpg' },
        ],
      },
      {
        name: 'Milanesa Based',
        items: [
          { id: 't5', name: 'Rusa', price: 12, description: 'Milanesa, huevo y quesillo.', image: '/images/menu/rusa.jpg' },
          { id: 't10', name: 'Satélite', price: 12, description: 'Milanesa, queso amarillo y quesillo.', image: '/images/menu/satelite.jpg' },
          { id: 't11', name: 'Mega', price: 12, description: 'Milanesa, piña y quesillo.', image: '/images/menu/mega.jpg' },
          { id: 't12', name: 'Tuluqueña', price: 12, description: 'Milanesa, chorizo y quesillo.', image: '/images/menu/tuluquena.jpg' },
          { id: 't13', name: 'Pachuqueña', price: 12, description: 'Milanesa, salchicha y quesillo.', image: '/images/menu/pachuquena.jpg' },
          { id: 't15', name: 'Texana', price: 12, description: 'Milanesa, chuleta y quesillo.', image: '/images/menu/texana.jpg' },
        ],
      },
      {
        name: 'Steak & Pork Based',
        items: [
          { id: 't2', name: 'Mexicana', price: 12, description: 'Pierna, chorizo con rajas de jalapeño y quesillo.', image: '/images/menu/mexicana.jpg' },
          { id: 't4', name: 'Pastor', price: 12, description: 'Lomo, piña y quesillo.', image: '/images/menu/pastor.jpg' },
          { id: 't14', name: 'Camelia', price: 12, description: 'Pierna, huevo y quesillo.', image: '/images/menu/camelia.jpg' },
          { id: 't17', name: 'Lucero', price: 12, description: 'Pierna, queso amarillo y quesillo.', image: '/images/menu/lucero.jpg' },
          { id: 't18', name: 'Trevi', price: 12, description: 'Pierna, salchicha y quesillo.', image: '/images/menu/trevi.jpg' },
          { id: 't20', name: 'Norteña', price: 12, description: 'Bistec, tocino y quesillo.', image: '/images/menu/nortena.jpg' },
          { id: 't21', name: 'Ranchera', price: 12, description: 'Bistec, lomo y quesillo.', image: '/images/menu/ranchera.jpg' },
          { id: 't22', name: 'Fresqui', price: 12, description: 'Bistec, chuleta y quesillo.', image: '/images/menu/fresqui.jpg' },
          { id: 't23', name: 'Árabe', price: 12, description: 'Lomo, chuleta y quesillo.', image: '/images/menu/arabe.jpg' },
          { id: 't16', name: 'Gabacha', price: 12, description: 'Chuleta, jamón y quesillo.', image: '/images/menu/gabacha.jpg' },
          { id: 't24', name: 'Hawaiana', price: 12, description: 'Chuleta, piña y quesillo.', image: '/images/menu/hawaiana.jpg' },
        ],
      },
      {
        name: 'Classic & Vegetarian',
        items: [
          { id: 't6', name: 'Alemana', price: 12, description: 'Chorizo, salchicha y quesillo.', image: '/images/menu/alemana.jpg' },
          { id: 't7', name: 'Española', price: 12, description: 'Chorizo, huevo y quesillo.', image: '/images/menu/espanola.jpg' },
          { id: 't8', name: 'Suiza', price: 12, description: 'Queso blanco y amarillo, quesillo.', tags: ['veg'], image: '/images/menu/suiza.jpg' },
          { id: 't9', name: 'Italiana', price: 12, description: 'Jamón, queso amarillo y quesillo.', image: '/images/menu/italiana.jpg' },
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    subtitle: 'Sodas, aguas and the basics — bottled Mexican sodas, can sodas and water to cut through the heat.',
    items: [
      { id: 'be1', name: 'Soda de Botella', price: 3, description: "Bottled Mexican soda. Jarritos, Mexican Coke or Sidral Mundet — ask the kitchen what's cold.", tags: ['signature', 'veg'], image: '/images/menu/soda-de-botella.jpg' },
      { id: 'be2', name: 'Soda de Lata', price: 2, description: 'Can soda — Coke, Sprite, Fanta and other classics.', tags: ['veg'], image: '/images/menu/soda-de-lata.jpg' },
      { id: 'be3', name: 'Agua', price: 2, description: 'Bottled still water.', tags: ['veg'], image: '/images/menu/agua.jpg' },
    ],
  },
]
