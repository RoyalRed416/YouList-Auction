import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AuctionItem, 
  Bid, 
  Category, 
  AuctionContextType, 
  AuctionItemFormData,
  SearchFilters
} from '../types';
import { 
  mockAuctionItems, 
  mockBids, 
  mockCategories 
} from '../data/mockData';

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};

interface AuctionProviderProps {
  children: ReactNode;
}

export const AuctionProvider: React.FC<AuctionProviderProps> = ({ children }) => {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>(mockAuctionItems);
  const [bids, setBids] = useState<Bid[]>(mockBids);
  const [categories] = useState<Category[]>(mockCategories);

  // Calculate derived data
  const featuredItems = auctionItems.filter(item => item.featuredItem && item.status === 'active');
  const recentItems = [...auctionItems]
    .filter(item => item.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
  const endingSoonItems = [...auctionItems]
    .filter(item => item.status === 'active' || item.status === 'ending-soon')
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 6);
  const popularCategories = [...categories]
    .sort((a, b) => b.itemCount - a.itemCount)
    .slice(0, 6);

  // Update auction statuses based on dates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedItems = auctionItems.map(item => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        
        // Determine status based on dates
        let status = item.status;
        
        if (now < startDate) {
          status = 'upcoming';
        } else if (now > endDate) {
          status = item.highestBidderId ? 'sold' : 'ended';
        } else if (now >= startDate && now <= endDate) {
          // If ending within the next 24 hours
          const hoursRemaining = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
          status = hoursRemaining <= 24 ? 'ending-soon' : 'active';
        }
        
        return status !== item.status ? { ...item, status } : item;
      });
      
      setAuctionItems(updatedItems);
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [auctionItems]);

  const getItemById = (id: string) => {
    return auctionItems.find(item => item.id === id);
  };

  const getBidsForItem = (itemId: string) => {
    return bids
      .filter(bid => bid.auctionItemId === itemId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const placeBid = async (itemId: string, amount: number) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const item = auctionItems.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Item not found');
    }
    
    if (item.status !== 'active' && item.status !== 'ending-soon') {
      throw new Error('This auction is not active');
    }
    
    if (item.currentBid && amount <= item.currentBid) {
      throw new Error('Bid must be higher than the current bid');
    }
    
    if (amount < item.startingPrice) {
      throw new Error('Bid must be at least the starting price');
    }
    
    // Create new bid
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      auctionItemId: itemId,
      userId: 'current-user-id', // This would be the actual user ID in a real app
      userName: 'Current User', // This would be the actual user name in a real app
      amount,
      timestamp: new Date().toISOString(),
    };
    
    // Update bids
    setBids([...bids, newBid]);
    
    // Update item with new current bid
    setAuctionItems(
      auctionItems.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              currentBid: amount, 
              highestBidderId: 'current-user-id',
              totalBids: item.totalBids + 1 
            } 
          : item
      )
    );
  };

  const createListing = async (listing: AuctionItemFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new listing
    const newItem: AuctionItem = {
      id: `item-${Date.now()}`,
      title: listing.title,
      description: listing.description,
      category: listing.category,
      condition: listing.condition,
      startingPrice: listing.startingPrice,
      buyNowPrice: listing.buyNowPrice,
      images: ["https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg"], // In a real app, we'd upload the images
      sellerId: 'current-user-id', // This would be the actual user ID
      sellerName: 'Current User', // This would be the actual user name
      startDate: listing.startDate,
      endDate: listing.endDate,
      status: new Date(listing.startDate) > new Date() ? 'upcoming' : 'active',
      featuredItem: false,
      totalBids: 0,
      createdAt: new Date().toISOString(),
    };
    
    // Add the new item to the list
    setAuctionItems([newItem, ...auctionItems]);
  };

  const searchItems = (query: string, filters?: SearchFilters) => {
    let filteredItems = [...auctionItems];
    
    // Apply text search
    if (query) {
      const searchLower = query.toLowerCase();
      filteredItems = filteredItems.filter(
        item => 
          item.title.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (filters?.category) {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }
    
    // Apply price range filters
    if (filters?.minPrice !== undefined) {
      filteredItems = filteredItems.filter(
        item => (item.currentBid || item.startingPrice) >= filters.minPrice!
      );
    }
    
    if (filters?.maxPrice !== undefined) {
      filteredItems = filteredItems.filter(
        item => (item.currentBid || item.startingPrice) <= filters.maxPrice!
      );
    }
    
    // Apply condition filters
    if (filters?.condition && filters.condition.length > 0) {
      filteredItems = filteredItems.filter(
        item => filters.condition!.includes(item.condition)
      );
    }
    
    // Apply status filters
    if (filters?.status && filters.status.length > 0) {
      filteredItems = filteredItems.filter(
        item => filters.status!.includes(item.status)
      );
    }
    
    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'ending-soon':
          filteredItems.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
          break;
        case 'price-low':
          filteredItems.sort((a, b) => (a.currentBid || a.startingPrice) - (b.currentBid || b.startingPrice));
          break;
        case 'price-high':
          filteredItems.sort((a, b) => (b.currentBid || b.startingPrice) - (a.currentBid || a.startingPrice));
          break;
        case 'most-bids':
          filteredItems.sort((a, b) => b.totalBids - a.totalBids);
          break;
      }
    }
    
    return filteredItems;
  };

  const value: AuctionContextType = {
    featuredItems,
    popularCategories,
    recentItems,
    endingSoonItems,
    getItemById,
    getBidsForItem,
    placeBid,
    createListing,
    searchItems,
  };

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>;
};