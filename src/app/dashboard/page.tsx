'use client';

import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { apiService } from '@/services/api.service';
import { formatCurrency, formatNumber } from '@/utils/format';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import type { DashboardStats, RecentOrder } from '@/types/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch products and carts data
      const [productsData, cartsData] = await Promise.all([
        apiService.getProducts(100),
        apiService.getCarts(20),
      ]);

      // Calculate stats
      const totalProducts = productsData.total;
      const totalOrders = cartsData.total;
      const totalRevenue = cartsData.carts.reduce((sum, cart) => sum + cart.total, 0);
      const totalSales = cartsData.carts.reduce((sum, cart) => sum + cart.discountedTotal, 0);

      setStats({
        totalSales,
        totalOrders,
        totalProducts,
        totalRevenue,
        salesChange: 12.5,
        ordersChange: 8.2,
        productsChange: -2.4,
        revenueChange: 15.3,
      });

      // Format recent orders from carts
      const orders: RecentOrder[] = cartsData.carts.slice(0, 5).map((cart, index) => ({
        id: `#ORD-${String(cart.id).padStart(3, '0')}`,
        customer: `Customer ${cart.userId}`,
        amount: formatCurrency(cart.discountedTotal),
        status: index % 3 === 0 ? 'Completed' : index % 3 === 1 ? 'Processing' : 'Pending',
        time: `${(index + 1) * 5} นาทีที่แล้ว`,
      }));

      setRecentOrders(orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchDashboardData} />;
  }

  if (!stats) return null;

  const statsCards = [
    {
      title: 'ยอดขายทั้งหมด',
      value: formatCurrency(stats.totalSales),
      change: `+${stats.salesChange}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'bg-indigo-600',
    },
    {
      title: 'คำสั่งซื้อวันนี้',
      value: formatNumber(stats.totalOrders),
      change: `+${stats.ordersChange}%`,
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-600',
    },
    {
      title: 'สินค้าทั้งหมด',
      value: formatNumber(stats.totalProducts),
      change: `${stats.productsChange}%`,
      trend: 'down',
      icon: Package,
      color: 'bg-blue-700',
    },
    {
      title: 'รายได้',
      value: formatCurrency(stats.totalRevenue),
      change: `+${stats.revenueChange}%`,
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-500 mt-1">ยินดีต้อนรับ! นี่คือภาพรวมของวันนี้</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-blue-100 text-blue-900' :
                      order.status === 'Processing' ? 'bg-indigo-100 text-indigo-900' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
