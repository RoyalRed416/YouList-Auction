import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, DollarSign, Shield, Users, MapPin, MessageCircle, CreditCard, Image, CheckCircle, Tag, Infinity, UserPlus, Percent } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to YouList Auction
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            The #1 buying and selling platform where you list items yourself for auction
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/explore"
              className="btn btn-primary"
            >
              Start Exploring
            </Link>
            <Link
              to="/create-listing"
              className="btn btn-outline"
            >
              Create Listing
            </Link>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gray-900/50 border border-primary-500/20 rounded-lg p-6 text-center mb-16">
          <p className="text-lg text-gray-300">
            This is a new and upcoming auction site so please be patient as <span className="text-primary-500 font-semibold">WE BUILD OUR NEW COMMUNITY</span> and please spread the word
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="bg-gray-900 p-8 rounded-lg">
            <Gavel className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-400">
              List your items quickly and start receiving bids
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <Shield className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-400">
              Safe and secure bidding process with verified users
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Local Community</h3>
            <p className="text-gray-400">
              Connect with buyers and sellers in Toronto and all of GTA
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-900 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How YouList Auction Works</h2>
          
          {/* Getting Started Steps */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <UserPlus className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Create an Account</p>
                  <p className="text-gray-400">Sign up with your email and basic information</p>
                </div>
              </li>
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Complete Verification</p>
                  <p className="text-gray-400">Submit a valid government-issued photo ID and credit card for identity verification</p>
                </div>
              </li>
              <li className="flex items-start">
                <Tag className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Choose Your Seller Plan</p>
                  <p className="text-gray-400">Select a plan that matches your selling needs</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">For Sellers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Gavel className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Create Your Listing</p>
                    <p className="text-gray-400">Add photos, description, and set auction duration - all in your control</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Image className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Submit for Approval</p>
                    <p className="text-gray-400">All listings must include clear photos and complete information for admin review. Incomplete listings will be rejected for buyer safety.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Specify Item Location</p>
                    <p className="text-gray-400">Include your city location to help local buyers find items near them</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <DollarSign className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Set Your Starting Bid</p>
                    <p className="text-gray-400">Choose a competitive starting price for your item to attract potential buyers</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MessageCircle className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Communicate with Buyers</p>
                    <p className="text-gray-400">Use our built-in messaging system to arrange pickup or shipping details</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Complete Verification</p>
                    <p className="text-gray-400">Sign up, submit a valid government-issued photo ID, and add a Visa or Mastercard to start buying</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CreditCard className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Add Payment Method</p>
                    <p className="text-gray-400">Add a Visa or Mastercard to your account before placing bids</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Percent className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Service Fee</p>
                    <p className="text-gray-400">A 10% buyer's fee is added to the final purchase price to support platform services</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Start Bidding</p>
                    <p className="text-gray-400">Once verified, browse and bid on items with confidence</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Local Transactions</p>
                    <p className="text-gray-400">Find items from sellers in Toronto and the GTA for convenient pickup</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MessageCircle className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Secure Communication</p>
                    <p className="text-gray-400">Message sellers directly to discuss pickup locations and details</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Seller Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Free Trial */}
            <div className="bg-gray-900 rounded-lg p-8 text-center hover:bg-gray-800 transition-colors">
              <Tag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
              <div className="text-4xl font-bold mb-1">
                <span className="text-primary-500">$0</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">10% seller fee upon sale</div>
              <ul className="text-gray-400 space-y-3 mb-8">
                <li>1 Free listing</li>
                <li>Perfect for first-time sellers</li>
                <li>All basic features included</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-outline w-full"
              >
                Get Started
              </Link>
            </div>

            {/* Casual Seller */}
            <div className="bg-gray-900 rounded-lg p-8 text-center hover:bg-gray-800 transition-colors">
              <Tag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Casual Seller</h3>
              <div className="text-4xl font-bold mb-1">
                <span className="text-primary-500">$4.99</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">+tax</div>
              <ul className="text-gray-400 space-y-3 mb-8">
                <li>1 Listing</li>
                <li>Perfect for one-time sellers</li>
                <li>All basic features included</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-outline w-full"
              >
                Get Started
              </Link>
            </div>

            {/* Experienced Seller */}
            <div className="bg-gray-900 rounded-lg p-8 text-center transform scale-105 relative hover:bg-gray-800 transition-colors">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
              </div>
              <Tag className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Experienced Seller</h3>
              <div className="text-4xl font-bold mb-1">
                <span className="text-primary-500">$29.99</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">+tax</div>
              <ul className="text-gray-400 space-y-3 mb-8">
                <li>10 Listings</li>
                <li>Perfect for regular sellers</li>
                <li>Priority support</li>
                <li>Enhanced visibility</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-primary w-full"
              >
                Get Started
              </Link>
            </div>

            {/* Expert Seller */}
            <div className="bg-gray-900 rounded-lg p-8 text-center hover:bg-gray-800 transition-colors">
              <Infinity className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Expert Seller</h3>
              <div className="text-4xl font-bold mb-1">
                <span className="text-primary-500">$99</span>
              </div>
              <div className="text-sm text-gray-400 mb-6">+tax</div>
              <ul className="text-gray-400 space-y-3 mb-8">
                <li>Unlimited Listings</li>
                <li>Perfect for power sellers</li>
                <li>Premium support</li>
                <li>Featured listings</li>
                <li>Advanced analytics</li>
              </ul>
              <Link
                to="/register"
                className="btn btn-outline w-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-gray-400 mb-8">Join our community of buyers and sellers today</p>
          <Link
            to="/register"
            className="btn btn-primary px-8 py-3"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;