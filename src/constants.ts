import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - 128GB Graphite',
    price: 85000,
    isNegotiable: true,
    location: 'New Baneshwor, KTM',
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/iphone/600/600',
    timeAgo: '2h ago',
    likes: 12,
    chats: 5,
    offersCount: 3,
    seller: {
      id: 's1',
      name: 'Anish Giri',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anish',
      trustScore: 88,
      location: 'Kathmandu',
      joinedDate: 'Jan 2023',
      communities: ['KU Alumni', 'KTM Techies'],
      mutualConnections: 2,
      dealsCount: 24,
      feedback: { punctual: 18, polite: 22, asDescribed: 15, fast: 19 }
    },
    description: 'Selling my iPhone 13 Pro. 128GB, Graphite color. Battery health is 92%. Comes with original box and cable. No scratches.'
  },
  {
    id: '2',
    title: 'Royal Enfield Classic 350 (2021)',
    price: 320000,
    isNegotiable: true,
    location: 'Patan, Lalitpur',
    category: 'Vehicles',
    imageUrl: 'https://picsum.photos/seed/bike/600/600',
    timeAgo: '5h ago',
    likes: 45,
    chats: 18,
    offersCount: 12,
    seller: {
      id: 's2',
      name: 'Sita Sharma',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sita',
      trustScore: 95,
      location: 'Lalitpur',
      joinedDate: 'Mar 2022',
      communities: ['Lalitpur Riders', 'Women in Biz'],
      mutualConnections: 5,
      dealsCount: 41,
      feedback: { punctual: 38, polite: 40, asDescribed: 37, fast: 35 }
    },
    description: 'Well maintained Royal Enfield Classic 350. Serviced regularly. Only 12,000km driven. Urgent sale.'
  },
  {
    id: '3',
    title: 'Handmade Dhaka Shawl',
    price: 2500,
    isNegotiable: false,
    location: 'Bhaktapur Durbar',
    category: 'Fashion',
    imageUrl: 'https://picsum.photos/seed/shawl/600/600',
    timeAgo: '1d ago',
    likes: 32,
    chats: 4,
    offersCount: 0,
    seller: {
      id: 's3',
      name: 'Rajesh Hamal',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
      trustScore: 72,
      location: 'Bhaktapur',
      joinedDate: 'Nov 2023',
      communities: ['Bhaktapur Artisans'],
      mutualConnections: 0,
      dealsCount: 9,
      feedback: { punctual: 5, polite: 8, asDescribed: 7, fast: 4 }
    },
    description: 'Authentic handmade Dhaka shawl from Bhaktapur. High quality material and traditional patterns.'
  }
];
