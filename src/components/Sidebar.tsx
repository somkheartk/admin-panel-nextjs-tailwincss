'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Warehouse, 
  BarChart3, 
  Users,
  UserCircle,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { menuItems } from '@/config/menu';
import { useState } from 'react';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  BarChart3,
  Users,
  UserCircle,
  Settings,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-indigo-900 to-indigo-800 text-white transition-all duration-300 ease-in-out flex flex-col shadow-lg`}>
      <div className="p-6 flex items-center justify-between border-b border-indigo-700">
        {!collapsed && <h1 className="text-2xl font-bold text-white">⚡ Flash POS</h1>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = item.href === '/dashboard' 
            ? pathname === item.href 
            : pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-500 text-white font-semibold shadow-md' 
                  : 'hover:bg-indigo-700 hover:bg-opacity-70'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? t(item.label) : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="font-medium">{t(item.label)}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t border-indigo-700 ${collapsed ? 'text-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <p className="text-sm text-indigo-300 capitalize">{user?.role}</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            {user?.name.charAt(0)}
          </div>
        )}
      </div>
    </aside>
  );
}
