'use client';

import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your application settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">General Settings</h3>
          <ul className="space-y-2">
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Store Information</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Business Hours</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Tax Configuration</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Receipt Settings</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Settings</h3>
          <ul className="space-y-2">
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Payment Methods</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Currency Settings</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Payment Gateway</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Refund Policy</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">System Settings</h3>
          <ul className="space-y-2">
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">User Permissions</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Security Settings</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Backup & Restore</li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">System Logs</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="My Store" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="store@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+66 123 456 789" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>THB (฿)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-md">
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
