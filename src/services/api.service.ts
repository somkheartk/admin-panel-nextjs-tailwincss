import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import type { ProductsResponse, CartsResponse, UsersResponse, Product, Cart, ApiUser } from '@/types/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }

  // Products
  async getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    return this.fetch<ProductsResponse>(`${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`);
  }

  async getProductById(id: number): Promise<Product> {
    return this.fetch<Product>(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  async searchProducts(query: string): Promise<ProductsResponse> {
    return this.fetch<ProductsResponse>(`${API_ENDPOINTS.PRODUCT_SEARCH}?q=${query}`);
  }

  async getCategories(): Promise<string[]> {
    return this.fetch<string[]>(API_ENDPOINTS.PRODUCT_CATEGORIES);
  }

  // Carts (Orders)
  async getCarts(limit = 20): Promise<CartsResponse> {
    return this.fetch<CartsResponse>(`${API_ENDPOINTS.CARTS}?limit=${limit}`);
  }

  async getCartById(id: number): Promise<Cart> {
    return this.fetch<Cart>(API_ENDPOINTS.CART_BY_ID(id));
  }

  async getUserCarts(userId: number): Promise<CartsResponse> {
    return this.fetch<CartsResponse>(API_ENDPOINTS.USER_CARTS(userId));
  }

  // Users
  async getUsers(limit = 30, skip = 0): Promise<UsersResponse> {
    return this.fetch<UsersResponse>(`${API_ENDPOINTS.USERS}?limit=${limit}&skip=${skip}`);
  }

  async getUserById(id: number): Promise<ApiUser> {
    return this.fetch<ApiUser>(API_ENDPOINTS.USER_BY_ID(id));
  }
}

export const apiService = new ApiService();
