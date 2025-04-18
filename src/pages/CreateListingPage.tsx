import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuction } from '../contexts/AuctionContext';
import { MapPin, Package, Car } from 'lucide-react';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { createListing } = useAuction();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: 'new' as const,
    startingPrice: 0,
    buyNowPrice: undefined as number | undefined,
    images: [] as File[],
    location: {
      city: '',
      province: 'ON'
    },
    shippingAvailable: false,
    localPickup: true,
    startDate: '',
    endDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsLoading(true);
      await createListing(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create listing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Listing</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              
              <div>
                <label htmlFor="title" className="label">Title</label>
                <input
                  type="text"
                  id="title"
                  required
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="description" className="label">Description</label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  className="input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="label">Category</label>
                  <select
                    id="category"
                    required
                    className="input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Collectibles">Collectibles</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="condition" className="label">Condition</label>
                  <select
                    id="condition"
                    required
                    className="input"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Pricing</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startingPrice" className="label">Starting Price ($)</label>
                  <input
                    type="number"
                    id="startingPrice"
                    required
                    min="0"
                    step="0.01"
                    className="input"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: parseFloat(e.target.value) })}
                  />
                </div>

                <div>
                  <label htmlFor="buyNowPrice" className="label">Buy Now Price ($) (Optional)</label>
                  <input
                    type="number"
                    id="buyNowPrice"
                    min="0"
                    step="0.01"
                    className="input"
                    value={formData.buyNowPrice || ''}
                    onChange={(e) => setFormData({ ...formData, buyNowPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                  />
                </div>
              </div>
            </div>

            {/* Location and Delivery */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Location and Delivery</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="label">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="city"
                      required
                      className="input pl-10"
                      value={formData.location.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="province" className="label">Province</label>
                  <select
                    id="province"
                    required
                    className="input"
                    value={formData.location.province}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, province: e.target.value }
                    })}
                  >
                    <option value="ON">Ontario</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="shippingAvailable"
                    className="w-4 h-4 rounded border-gray-700 text-primary-500 focus:ring-primary-500"
                    checked={formData.shippingAvailable}
                    onChange={(e) => setFormData({ ...formData, shippingAvailable: e.target.checked })}
                  />
                  <label htmlFor="shippingAvailable" className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-gray-400" />
                    <span>Available for shipping</span>
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="localPickup"
                    className="w-4 h-4 rounded border-gray-700 text-primary-500 focus:ring-primary-500"
                    checked={formData.localPickup}
                    onChange={(e) => setFormData({ ...formData, localPickup: e.target.checked })}
                  />
                  <label htmlFor="localPickup" className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-gray-400" />
                    <span>Available for local pickup</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Auction Duration */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Auction Duration</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="label">Start Date</label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    required
                    className="input"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="label">End Date</label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    required
                    className="input"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Images</h2>
              
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData({ ...formData, images: Array.from(e.target.files) });
                    }
                  }}
                  className="hidden"
                  id="images"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <div className="space-y-2">
                    <p className="text-gray-400">Drop your images here, or click to select files</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="text-sm text-gray-400">
                  {formData.images.length} files selected
                </div>
              )}
            </div>

            {error && (
              <div className="text-error-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-3"
            >
              {isLoading ? 'Creating Listing...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingPage;