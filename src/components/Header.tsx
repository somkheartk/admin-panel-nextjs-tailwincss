'use client';

import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, switchRole, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} />
          </button>
          
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select 
            value={user?.role} 
            onChange={(e) => switchRole(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
          </select>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button 
            onClick={logout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
            title="ออกจากระบบ"
          >
            <LogOut size={20} />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
