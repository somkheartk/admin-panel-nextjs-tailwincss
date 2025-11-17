// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string | number) => `/products/${id}`,
  PRODUCT_SEARCH: '/products/search',
  PRODUCT_CATEGORIES: '/products/categories',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: string | number) => `/users/${id}`,
  USER_LOGIN: '/auth/login',
  
  // Carts (Orders)
  CARTS: '/carts',
  CART_BY_ID: (id: string | number) => `/carts/${id}`,
  USER_CARTS: (userId: string | number) => `/carts/user/${userId}`,
} as const;

// API Response Types
export interface ApiResponse<T> {
  data: T;
  total?: number;
  skip?: number;
  limit?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}
