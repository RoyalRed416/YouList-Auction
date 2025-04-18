import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Package, Car, Clock, Heart, Gavel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const [watchedItems, setWatchedItems] = useState<string[]>([]);

  // Sample listings
  const sampleListings = [
    {
      id: '1',
      title: 'Vintage Rolex Daytona - Limited Edition',
      description: 'A rare vintage Rolex Daytona with original box and papers. This watch features a stainless steel case, black dial, and mechanical movement.',
      currentBid: 15500,
      totalBids: 12,
      endDate: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
      images: ['https://images.pexels.com/photos/9978344/pexels-photo-9978344.jpeg'],
      location: { city: 'Toronto', province: 'ON' },
      shippingAvailable: true,
      localPickup: true,
    },
    {
      id: '2',
      title: '2022 MacBook Pro 16" M1 Max',
      description: 'Like new MacBook Pro with M1 Max chip, 32GB RAM, 1TB SSD. Space Gray. Only used for 2 months.',
      currentBid: 2800,
      totalBids: 8,
      endDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      images: ['https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg'],
      location: { city: 'Mississauga', province: 'ON' },
      shippingAvailable: true,
      localPickup: true,
    },
    {
      id: '3',
      title: 'Restored 1965 Ford Mustang Convertible',
      description: 'Beautifully restored 1965 Ford Mustang Convertible. Red with black interior. V8 engine, automatic transmission.',
      currentBid: 42500,
      totalBids: 18,
      endDate: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
      images: ['https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg'],
      location: { city: 'Oakville', province: 'ON' },
      shippingAvailable: false,
      localPickup: true,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = {} as { [key: string]: string };
      
      sampleListings.forEach(listing => {
        const endTime = new Date(listing.endDate).getTime();
        const now = Date.now();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          newTimeLeft[listing.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[listing.id] = 'Ended';
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleWatch = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault(); // Prevent navigation
    setWatchedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Explore Auctions</h1>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="bg-gray-900 p-2 rounded-lg hover:bg-gray-800">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleListings.map(listing => (
            <div key={listing.id} className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all">
              {/* Image */}
              <Link to={`/item/${listing.id}`} className="block relative aspect-video">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {/* Countdown Timer */}
                <div className="absolute top-4 right-4 bg-black/80 rounded-full px-3 py-1 text-sm font-medium flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeLeft[listing.id]}</span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link to={`/item/${listing.id}`}>
                  <h3 className="text-lg font-semibold mb-2 hover:text-primary-500 transition-colors">
                    {listing.title}
                  </h3>
                </Link>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-400">Current Bid</p>
                    <p className="text-lg font-semibold text-primary-500">
                      ${listing.currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Bids</p>
                    <p className="text-lg font-semibold">{listing.totalBids}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location.city}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {listing.shippingAvailable && (
                      <Package className="w-4 h-4" title="Shipping Available" />
                    )}
                    {listing.localPickup && (
                      <Car className="w-4 h-4" title="Local Pickup" />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/item/${listing.id}`}
                    className="btn btn-primary flex items-center justify-center space-x-2"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Place Bid</span>
                  </Link>
                  <button
                    onClick={(e) => toggleWatch(e, listing.id)}
                    className={`btn ${
                      watchedItems.includes(listing.id)
                        ? 'bg-gray-800 text-primary-500'
                        : 'btn-outline'
                    } flex items-center justify-center space-x-2`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        watchedItems.includes(listing.id) ? 'fill-current' : ''
                      }`}
                    />
                    <span>{watchedItems.includes(listing.id) ? 'Watching' : 'Watch'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;