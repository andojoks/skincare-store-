export interface Swatch {
  label: string;
  color: string;
}

export interface Product {
  name: string;
  price: number;
  tag: string;
  image: string;
  alt: string;
  swatchLabel: string;
  swatches: Swatch[];
  description: string;
}

export interface CartLine {
  key: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: string;
}

export interface Ritual {
  label: string;
  title: string;
  image: string;
  href: string;
}

export interface GalleryItem {
  title: string;
  image: string;
}

export interface Review {
  quote: string;
  name: string;
  role: string;
}
