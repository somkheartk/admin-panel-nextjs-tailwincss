export type UserRole = 'admin' | 'manager' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  roles: UserRole[];
  badge?: number;
}
