import { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'menu.dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
    roles: ['admin', 'manager', 'cashier'],
  },
  {
    id: 'sales',
    label: 'menu.sales',
    icon: 'ShoppingCart',
    href: '/dashboard/sales',
    roles: ['admin', 'manager', 'cashier'],
  },
  {
    id: 'products',
    label: 'menu.products',
    icon: 'Package',
    href: '/dashboard/products',
    roles: ['admin', 'manager'],
  },
  {
    id: 'inventory',
    label: 'menu.inventory',
    icon: 'Warehouse',
    href: '/dashboard/inventory',
    roles: ['admin', 'manager'],
  },
  {
    id: 'reports',
    label: 'menu.reports',
    icon: 'BarChart3',
    href: '/dashboard/reports',
    roles: ['admin', 'manager'],
  },
  {
    id: 'customers',
    label: 'menu.customers',
    icon: 'UserCircle',
    href: '/dashboard/customers',
    roles: ['admin', 'manager', 'cashier'],
  },
  {
    id: 'users',
    label: 'menu.users',
    icon: 'Users',
    href: '/dashboard/users',
    roles: ['admin'],
  },
  {
    id: 'settings',
    label: 'menu.settings',
    icon: 'Settings',
    href: '/dashboard/settings',
    roles: ['admin', 'manager'],
  },
];
