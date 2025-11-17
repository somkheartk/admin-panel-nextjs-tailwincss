'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { apiService } from '@/services/api.service';
import { formatCurrency, formatNumber } from '@/utils/format';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';
import type { Product } from '@/types/api';
import Image from 'next/image';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const skip = (page - 1) * itemsPerPage;
      const data = searchQuery 
        ? await apiService.searchProducts(searchQuery)
        : await apiService.getProducts(itemsPerPage, skip);
      
      setProducts(data.products);
      setTotalItems(data.total);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(1);
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">สินค้า</h1>
          <p className="text-gray-500 mt-1">จัดการรายการสินค้าของคุณ</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium shadow-md">
          <Plus size={20} />
          เพิ่มสินค้า
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            ค้นหา
          </button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter size={20} />
            กรอง
          </button>
        </form>

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchProducts} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative w-full h-40 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-gray-500">คงเหลือ: {product.stock}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-sm font-medium">⭐ {product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
}
