'use client';

import { AlertTriangle, Search } from 'lucide-react';

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 mt-1">Track and manage your stock levels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Items</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Low Stock Items</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">23</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Out of Stock</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">5</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>
        <p className="text-gray-500 text-center py-12">Inventory details will be displayed here</p>
      </div>
    </div>
  );
}
