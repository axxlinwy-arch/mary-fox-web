export interface Artist {
  id: string;
  slug: string;
  name: string;
  specialization: string;
  experience: string;
  instagram: string;
  image: string;
  bio: string;
  styles: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  forWhom: string[];
  includes: string[];
  price: string;
  duration: string;
  level: string;
  image: string;
  videoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Vacancy {
  id: string;
  title: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface ShopItem {
  id: string;
  title: string;
  category: "kits" | "supplies" | "certificates";
  price: string;
  image: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  artist: string;
  category: string;
}

export interface StudioPhoto {
  id: string;
  image: string;
  title: string;
  category: "interior" | "equipment" | "rooms";
}
