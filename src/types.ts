export interface Product {
  id: string;
  title: string;
  price: number;
  isNegotiable: boolean;
  location: string;
  category: string;
  imageUrl: string;
  timeAgo: string;
  seller: Seller;
  description?: string;
  likes: number;
  chats: number;
  offersCount: number;
  isSold?: boolean;
  originalPrice?: number;
}

export interface Seller {
  id: string;
  name: string;
  avatarUrl: string;
  trustScore: number;
  location: string;
  joinedDate: string;
  communities: string[]; // e.g., ["Kathmandu University", "Patan Local Group"]
  mutualConnections?: number;
  dealsCount?: number; // Number of completed handshakes
  feedback?: {
    punctual: number;
    polite: number;
    asDescribed: number;
    fast: number;
  };
}

export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Vehicles' | 'Books' | 'Others';
