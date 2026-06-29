export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuItemCategory;
  image?: string;
  isFeatured?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 = mild/none, 3 = high traditional heat
  tags?: string[];
}

export type MenuItemCategory =
  | "Appetizers"
  | "Meat Specials"
  | "Vegetarian Dishes"
  | "Seafood"
  | "Sandwiches & Pasta"
  | "Desserts"
  | "Hot Drinks"
  | "Cocktails & Wine";

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  text: string;
  time: string;
  avatar?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

export interface ReservationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface CateringQuote {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  serviceType: "Full Buffet" | "Plated Dinner" | "Family Style" | "Lounge & Cocktails";
  dietaryRestrictions?: string;
  notes?: string;
}
