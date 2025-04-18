import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailPage = () => {
  const { itemId } = useParams();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Item Details</h1>
        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          {/* Content will be added later */}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;