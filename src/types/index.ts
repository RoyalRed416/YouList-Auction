import { User, AuctionItem, Bid, Category } from '../types';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  itemId: string;
  buyerId: string;
  sellerId: string;
  lastMessageAt: string;
  messages: Message[];
}

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like-new' | 'excellent' | 'good' | 'fair' | 'poor';
  startingPrice: number;
  currentBid?: number;
  buyNowPrice?: number;
  images: string[];
  sellerId: string;
  sellerName: string;
  location: {
    city: string;
    province: string;
  };
  shippingAvailable: boolean;
  localPickup: boolean;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'ending-soon' | 'ended' | 'sold';
  featuredItem: boolean;
  totalBids: number;
  highestBidderId?: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  auctionItemId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserRegistrationData) => Promise<void>;
  logout: () => void;
  verifyIdentity: (idData: IdentityVerificationData) => Promise<void>;
}

export interface AuctionContextType {
  featuredItems: AuctionItem[];
  popularCategories: Category[];
  recentItems: AuctionItem[];
  endingSoonItems: AuctionItem[];
  getItemById: (id: string) => AuctionItem | undefined;
  getBidsForItem: (itemId: string) => Bid[];
  placeBid: (itemId: string, amount: number) => Promise<void>;
  createListing: (listing: AuctionItemFormData) => Promise<void>;
  searchItems: (query: string, filters?: SearchFilters) => AuctionItem[];
}

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: 'buyer' | 'seller';
  creditCard: {
    number: string;
    expirationDate: string;
    cvv: string;
    cardholderName: string;
  };
}

export interface IdentityVerificationData {
  idDocument: File;
  documentType: 'passport' | 'drivers_license' | 'national_id';
  documentNumber: string;
  expirationDate: string;
}

export interface AuctionItemFormData {
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like-new' | 'excellent' | 'good' | 'fair' | 'poor';
  startingPrice: number;
  buyNowPrice?: number;
  images: File[];
  location: {
    city: string;
    province: string;
  };
  shippingAvailable: boolean;
  localPickup: boolean;
  startDate: string;
  endDate: string;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  status?: string[];
  city?: string;
  province?: string;
  sortBy?: 'newest' | 'ending-soon' | 'price-low' | 'price-high' | 'most-bids';
}