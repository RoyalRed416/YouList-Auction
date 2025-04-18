import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, DollarSign, Clock, MapPin, BadgeCheck, Heart, MessageCircle, Gavel, Search } from 'lucide-react';

const WhyChoosePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Why Choose YouList Auction?
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8">
            We're revolutionizing the local auction experience by connecting verified buyers and sellers in a secure, transparent marketplace.
          </p>
          
          {/* New Description */}
          <div className="bg-gray-900/50 border border-primary-500/20 rounded-lg p-8 max-w-4xl mx-auto text-left">
            <p className="text-lg leading-relaxed mb-4">
              We're changing the auction game by putting the power back in your hands. Have new or used items you want to get rid of? You can finally list them yourself on an auction platform that's built for the modern era.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Whether you're selling collectibles, furniture, antiques, cars, or much more - YouList Auction provides a secure and verified marketplace for all your valuable items. Every listing is verified for safety, giving buyers the confidence they need when making purchases.
            </p>
            <p className="text-lg leading-relaxed">
              With flexible options for both shipping and local pickup, you and your buyer can decide what works best for your transaction. Our platform brings together the best of traditional auctions with modern convenience and security.
            </p>
          </div>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900 p-8 rounded-lg">
            <Shield className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Secure & Verified</h3>
            <p className="text-gray-400">
              Every user is verified with government ID and credit card information, ensuring a safe and trustworthy marketplace.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <Users className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Local Community</h3>
            <p className="text-gray-400">
              Connect with buyers and sellers in your area for convenient local transactions and pickups.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <DollarSign className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Competitive Pricing</h3>
            <p className="text-gray-400">
              Start with a free listing and only pay when your item sells. Transparent fee structure with no hidden costs.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <Clock className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quick & Easy</h3>
            <p className="text-gray-400">
              List items in minutes with our streamlined process. Set your terms and let the bidding begin.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <MapPin className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Location-Based</h3>
            <p className="text-gray-400">
              Find items near you with our location-based search, making pickup and delivery convenient.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <BadgeCheck className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality Control</h3>
            <p className="text-gray-400">
              All listings are reviewed to ensure accurate descriptions and clear photos for buyer confidence.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-900 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Heart className="w-8 h-8 text-primary-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Watch List</h3>
                  <p className="text-gray-400">
                    Save items to your watch list and get notified about price changes and when auctions are ending.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageCircle className="w-8 h-8 text-primary-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Secure Messaging</h3>
                  <p className="text-gray-400">
                    Built-in messaging system for safe communication between buyers and sellers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Gavel className="w-8 h-8 text-primary-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Auto Bidding</h3>
                  <p className="text-gray-400">
                    Set your maximum bid and let our system automatically bid for you up to your limit.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Search className="w-8 h-8 text-primary-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Advanced Search</h3>
                  <p className="text-gray-400">
                    Find exactly what you're looking for with filters for location, price, condition, and more.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-8 h-8 text-primary-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-gray-400">
                    Get instant notifications about bids, messages, and auction status changes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-primary-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Buyer Protection</h3>
                  <p className="text-gray-400">
                    Our secure platform ensures safe transactions and dispute resolution support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8">Join our growing community of buyers and sellers today.</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-primary px-8 py-3"
            >
              Create Account
            </Link>
            <Link
              to="/explore"
              className="btn btn-outline px-8 py-3"
            >
              Browse Auctions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoosePage;