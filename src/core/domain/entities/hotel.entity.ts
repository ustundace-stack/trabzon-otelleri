// Otel domain varlıkları — Clean Architecture Domain Layer
// Tüm tipler bu dosyadan ihraç edilir; harici kütüphane bağımlılığı yoktur.

export interface Feature {
  icon: string;
  text: string;
}

export interface Room {
  name: string;
  price: number;
  capacity: string;
  bed: string;
}

export interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  images: string[];
  tags: string[];
  hasThermal: boolean;
  features: string[];
  description: string;
  detailedFeatures: Feature[];
  rooms: Room[];
}
