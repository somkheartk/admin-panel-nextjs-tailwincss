export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  role: string;
  image: string;
}

export interface UsersResponse {
  users: ApiUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  salesChange: number;
  ordersChange: number;
  productsChange: number;
  revenueChange: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Pending';
  time: string;
}
