import type { GalleryItem, Product, Review, Ritual } from '@/types/catalog';

export const products: Product[] = [
  {
    name: 'Amber Body Oil',
    price: 42,
    tag: 'Promotion',
    image: '/photos/sorrel/p-oil.jpg',
    alt: 'Amber glass body-oil bottle with a black pump',
    swatchLabel: 'Scent',
    swatches: [
      { label: 'Neroli', color: '#c98a3d' },
      { label: 'Fig leaf', color: '#8b4a5c' },
      { label: 'Vetiver', color: '#7c8466' },
    ],
    description: 'Cold-pressed body oil for skin that drinks it in.',
  },
  {
    name: 'Rosehip Serum',
    price: 38.5,
    tag: 'New',
    image: '/photos/sorrel/p-serum.jpg',
    alt: 'Small amber dropper bottle of serum',
    swatchLabel: 'Size',
    swatches: [
      { label: '30 ml', color: '#b36a3c' },
      { label: '50 ml', color: '#5a2f3e' },
    ],
    description: 'Rosehip & sea-buckthorn overnight serum.',
  },
  {
    name: 'Oat Milk Fluid',
    price: 29,
    tag: 'Customer favorite',
    image: '/photos/sorrel/p-fluid.jpg',
    alt: 'Tall brushed-aluminium airless pump bottle',
    swatchLabel: 'Finish',
    swatches: [
      { label: 'Dewy', color: '#e3cbb4' },
      { label: 'Matte', color: '#b9a99a' },
      { label: 'Tinted', color: '#d79a7c' },
    ],
    description: 'Oat milk day fluid in a refillable airless pump.',
  },
  {
    name: 'Clay Jar Balm',
    price: 24,
    tag: 'New',
    image: '/photos/sorrel/p-jar.jpg',
    alt: 'Amber glass balm jar with its yellow lid leaning beside it',
    swatchLabel: 'Scent',
    swatches: [
      { label: 'Calendula', color: '#e2b93b' },
      { label: 'Sage', color: '#a5b38a' },
    ],
    description: 'Calendula repair balm in reusable glass.',
  },
  {
    name: 'Soft Peel Tube',
    price: 21.5,
    tag: 'Low waste',
    image: '/photos/sorrel/p-tube.jpg',
    alt: 'Sand-coloured cosmetic tube tipped at an angle',
    swatchLabel: 'Strength',
    swatches: [
      { label: 'Gentle', color: '#e7c7ae' },
      { label: 'Weekly', color: '#c2603a' },
    ],
    description: 'Papaya enzyme soft peel for a weekly reset.',
  },
  {
    name: 'Wash & Lotion Duo',
    price: 46,
    tag: 'Bundle',
    image: '/photos/sorrel/p-duo.jpg',
    alt: 'Two brushed-steel pump bottles side by side',
    swatchLabel: 'Scent',
    swatches: [
      { label: 'Unscented', color: '#cfc7bd' },
      { label: 'Fig leaf', color: '#8b4a5c' },
      { label: 'Neroli', color: '#c98a3d' },
    ],
    description: 'Hand wash & lotion duo with refill pouches.',
  },
];

export const rituals: Ritual[] = [
  { label: 'Face', title: 'Ritual', image: '/photos/sorrel/cat-face.jpg', href: '#shop' },
  { label: 'Body', title: 'Bloom', image: '/photos/sorrel/cat-body.jpg', href: '#shop' },
  { label: 'Bath', title: 'House', image: '/photos/sorrel/cat-bath.jpg', href: '#shop' },
  { label: 'Home', title: 'Glow', image: '/photos/sorrel/cat-home.jpg', href: '#shop' },
];

export const gallery: GalleryItem[] = [
  { title: 'Drop Ritual', image: '/photos/sorrel/g-hand.jpg' },
  { title: 'Rose Harvest', image: '/photos/sorrel/g-petals.jpg' },
  { title: 'Small Batch', image: '/photos/sorrel/g-vials.jpg' },
  { title: 'Paper Wraps', image: '/photos/sorrel/g-soap.jpg' },
  { title: 'Milk Bath', image: '/photos/sorrel/g-daisy.jpg' },
  { title: 'Pressed Botanicals', image: '/photos/sorrel/g-dried.jpg' },
  { title: 'Evening Reset', image: '/photos/sorrel/ritual.jpg' },
];

export const reviews: Review[] = [
  {
    quote: 'The body oil sinks in within a minute and my skin has never felt this calm in winter.',
    name: 'Amara Okafor',
    role: 'Verified buyer',
  },
  {
    quote: 'Refills arrive in paper, the glass lives on my shelf forever. Finally a brand that means it.',
    name: 'Lena Hartmann',
    role: 'Subscriber',
  },
  {
    quote: 'Rosehip serum overnight, and I wake up looking like I slept ten hours.',
    name: 'Priya Nair',
    role: 'Verified buyer',
  },
  {
    quote: 'Sensitive skin and zero reactions. The calendula balm is in every bag I own.',
    name: 'Tom Bellamy',
    role: 'Verified buyer',
  },
  {
    quote: 'Smells like a garden after rain. Fast delivery and beautiful wrapping.',
    name: 'Sofia Marín',
    role: 'Gift buyer',
  },
];
