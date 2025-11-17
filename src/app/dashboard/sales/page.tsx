'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, X, Minus, ShoppingCart } from 'lucide-react';
import { apiService } from '@/services/api.service';
import { formatCurrency } from '@/utils/format';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';
import type { Cart, Product } from '@/types/api';

interface SaleItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

export default function SalesPage() {
  const { t } = useLanguage();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [discount, setDiscount] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const itemsPerPage = 10;

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiService.getCarts(30);
      setCarts(data.carts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (showSaleModal) {
      fetchProducts();
    }
  }, [showSaleModal]);

  const fetchProducts = async () => {
    try {
      const data = await apiService.getProducts(50);
      setProducts(data.products);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleAddItem = (product: Product) => {
    const existingItem = selectedItems.find(item => item.productId === product.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedItems([...selectedItems, {
        productId: product.id,
        productName: product.title,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const handleRemoveItem = (productId: number) => {
    setSelectedItems(selectedItems.filter(item => item.productId !== productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedItems(selectedItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  const handleCreateSale = () => {
    if (selectedItems.length === 0) {
      alert('กรุณาเลือกสินค้าอย่างน้อย 1 รายการ');
      return;
    }

    const saleData = {
      customer: customerName || 'Walk-in Customer',
      items: selectedItems,
      subtotal: calculateSubtotal(),
      discount: discount,
      total: calculateTotal(),
      date: new Date().toISOString()
    };

    console.log('Creating sale:', saleData);
    alert(`สร้างรายการขายสำเร็จ!\nลูกค้า: ${saleData.customer}\nยอดรวม: ${formatCurrency(saleData.total)}`);

    // Reset form
    setSelectedItems([]);
    setCustomerName('');
    setDiscount(0);
    setShowSaleModal(false);
    fetchSales();
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // Filter and search sales
  const filteredCarts = carts.filter(cart => {
    // Search filter
    const orderId = `ORD-${String(cart.id).padStart(3, '0')}`;
    const matchesSearch = searchTerm === '' || 
      orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.userId.toString().includes(searchTerm);

    // Status filter
    const cartIndex = carts.indexOf(cart);
    const statusIndex = cartIndex % 3;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && statusIndex === 0) ||
      (filterStatus === 'processing' && statusIndex === 1) ||
      (filterStatus === 'pending' && statusIndex === 2);

    return matchesSearch && matchesStatus;
  });

  const handleApplyFilter = () => {
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setFilterStatus('all');
    setFilterDateFrom('');
    setFilterDateTo('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCarts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCarts = filteredCarts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusBadge = (index: number) => {
    const statuses = [t('sales.statusCompleted'), t('sales.statusProcessing'), t('sales.statusPending')];
    const colors = [
      'bg-blue-100 text-blue-900',
      'bg-indigo-100 text-indigo-900',
      'bg-sky-100 text-sky-900',
    ];
    const statusIndex = index % 3;
    return { status: statuses[statusIndex], color: colors[statusIndex] };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('sales.title')}</h1>
          <p className="text-gray-600 mt-1">{t('sales.allSales')}</p>
        </div>
        <button 
          onClick={() => setShowSaleModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium shadow-md"
        >
          <Plus size={20} />
          {t('sales.newSale')}
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t('sales.search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <button 
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 relative"
        >
          <Filter size={20} />
          Filter
          {(filterStatus !== 'all' || filterDateFrom || filterDateTo) && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : error ? (
          <div className="p-6">
            <ErrorMessage message={error} onRetry={fetchSales} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.orderId')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.customer')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.items')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.total')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.discount')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.netTotal')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sales.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentCarts.map((cart, index) => {
                    const { status, color } = getStatusBadge(index);
                    return (
                      <tr key={cart.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #ORD-{String(cart.id).padStart(3, '0')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {t('sales.customer')} {cart.userId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {cart.totalProducts} {t('sales.items')} ({cart.totalQuantity})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(cart.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          -{formatCurrency(cart.total - cart.discountedTotal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                          {formatCurrency(cart.discountedTotal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredCarts.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">กรองข้อมูล</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สถานะ
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="completed">{t('sales.statusCompleted')}</option>
                  <option value="processing">{t('sales.statusProcessing')}</option>
                  <option value="pending">{t('sales.statusPending')}</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ช่วงวันที่
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">จาก</label>
                    <input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ถึง</label>
                    <input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Filter Summary */}
              {(filterStatus !== 'all' || filterDateFrom || filterDateTo) && (
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-indigo-900 mb-2">ตัวกรองที่เลือก:</p>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    {filterStatus !== 'all' && (
                      <li>• สถานะ: {
                        filterStatus === 'completed' ? t('sales.statusCompleted') :
                        filterStatus === 'processing' ? t('sales.statusProcessing') :
                        t('sales.statusPending')
                      }</li>
                    )}
                    {filterDateFrom && <li>• วันที่เริ่มต้น: {filterDateFrom}</li>}
                    {filterDateTo && <li>• วันที่สิ้นสุด: {filterDateTo}</li>}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleResetFilter}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                รีเซ็ตตัวกรอง
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleApplyFilter}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
                >
                  ใช้ตัวกรอง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Sale Modal */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <ShoppingCart className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('sales.newSale')}</h2>
                  <p className="text-sm text-gray-500">สร้างรายการขายใหม่</p>
                </div>
              </div>
              <button
                onClick={() => setShowSaleModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Left: Product Selection */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ข้อมูลลูกค้า
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ชื่อลูกค้า (ถ้ามี)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เลือกสินค้า
                    </label>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={searchProduct}
                        onChange={(e) => setSearchProduct(e.target.value)}
                        placeholder="ค้นหาสินค้า..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleAddItem(product)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{product.title}</h4>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-indigo-600">{formatCurrency(product.price)}</p>
                              <p className="text-xs text-gray-500">คงเหลือ: {product.stock}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Cart Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6 sticky top-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">สรุปรายการ</h3>
                    
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      {selectedItems.length === 0 ? (
                        <p className="text-center text-gray-400 py-8">ยังไม่มีสินค้า</p>
                      ) : (
                        selectedItems.map((item) => (
                          <div key={item.productId} className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm text-gray-900 flex-1">{item.productName}</h4>
                              <button
                                onClick={() => handleRemoveItem(item.productId)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                  className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                                >
                                  <Minus size={14} />
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                                  className="w-12 text-center border border-gray-300 rounded py-1"
                                  min="1"
                                />
                                <button
                                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                  className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <p className="font-semibold text-gray-900">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ยอดรวม</span>
                        <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">ส่วนลด (บาท)</label>
                        <input
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-red-600">
                          <span>ส่วนลด</span>
                          <span>-{formatCurrency(discount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                        <span>ยอดสุทธิ</span>
                        <span className="text-indigo-600">{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowSaleModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateSale}
                disabled={selectedItems.length === 0}
                className={`px-6 py-2.5 rounded-lg transition-colors font-medium shadow-md ${
                  selectedItems.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                สร้างรายการขาย
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }
