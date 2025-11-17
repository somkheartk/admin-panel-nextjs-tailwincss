import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
    roles: ['admin', 'manager', 'cashier'],
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: 'ShoppingCart',
    href: '/dashboard/sales',
    roles: ['admin', 'manager', 'cashier'],
  },
  {
    id: 'products',
    label: 'Products',
    icon: 'Package',
    href: '/dashboard/products',
    roles: ['admin', 'manager'],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: 'Warehouse',
    href: '/dashboard/inventory',
    roles: ['admin', 'manager'],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3',
    href: '/dashboard/reports',
    roles: ['admin', 'manager'],
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'Users',
    href: '/dashboard/users',
    roles: ['admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    href: '/dashboard/settings',
    roles: ['admin', 'manager'],
  },
];
