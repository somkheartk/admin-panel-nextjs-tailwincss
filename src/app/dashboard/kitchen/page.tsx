'use client';

import { useState, useEffect } from 'react';
import { Clock, ChefHat, CheckCircle, AlertCircle, Flame } from 'lucide-react';

interface Order {
  id: number;
  tableNumber: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready';
  orderTime: Date;
  priority: 'normal' | 'high';
}

interface OrderItem {
  name: string;
  quantity: number;
  notes?: string;
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      tableNumber: 'A2',
      items: [
        { name: 'ผัดไทยกุ้งสด', quantity: 2 },
        { name: 'ต้มยำกุ้ง', quantity: 1, notes: 'เผ็ดน้อย' },
      ],
      status: 'pending',
      orderTime: new Date(Date.now() - 5 * 60000),
      priority: 'high',
    },
    {
      id: 2,
      tableNumber: 'B1',
      items: [
        { name: 'ข้าวผัดปู', quantity: 1 },
        { name: 'น้ำผลไม้รวม', quantity: 2 },
      ],
      status: 'preparing',
      orderTime: new Date(Date.now() - 12 * 60000),
      priority: 'normal',
    },
    {
      id: 3,
      tableNumber: 'C3',
      items: [
        { name: 'ส้มตำไทย', quantity: 1, notes: 'ไม่ใส่ถั่ว' },
        { name: 'ไก่ย่าง', quantity: 1 },
        { name: 'ข้าวเหนียว', quantity: 2 },
      ],
      status: 'preparing',
      orderTime: new Date(Date.now() - 8 * 60000),
      priority: 'normal',
    },
    {
      id: 4,
      tableNumber: 'A4',
      items: [
        { name: 'ต้มยำทะเล', quantity: 1, notes: 'เผ็ดมาก' },
      ],
      status: 'ready',
      orderTime: new Date(Date.now() - 15 * 60000),
      priority: 'normal',
    },
  ]);

  const getElapsedTime = (orderTime: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - orderTime.getTime()) / 1000 / 60);
    return `${diff} นาที`;
  };

  const getTimeColor = (orderTime: Date) => {
    const minutes = Math.floor((new Date().getTime() - orderTime.getTime()) / 1000 / 60);
    if (minutes > 15) return 'text-red-600';
    if (minutes > 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleStatusChange = (orderId: number, newStatus: 'preparing' | 'ready') => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleComplete = (orderId: number) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
            <ChefHat className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">จอแสดงครัว</h1>
            <p className="text-gray-500 mt-1">ติดตามและจัดการออเดอร์แบบ Real-time</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">ออเดอร์ทั้งหมด</p>
          <p className="text-4xl font-bold text-gray-900">{orders.length}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-700 text-sm font-medium">รอดำเนินการ</h3>
              <p className="text-3xl font-bold text-yellow-900 mt-2">{pendingOrders.length}</p>
            </div>
            <AlertCircle className="text-yellow-600" size={40} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-orange-700 text-sm font-medium">กำลังทำ</h3>
              <p className="text-3xl font-bold text-orange-900 mt-2">{preparingOrders.length}</p>
            </div>
            <Flame className="text-orange-600" size={40} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-green-700 text-sm font-medium">พร้อมเสิร์ฟ</h3>
              <p className="text-3xl font-bold text-green-900 mt-2">{readyOrders.length}</p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </div>
      </div>

      {/* Orders Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
            <AlertCircle size={20} />
            รอดำเนินการ ({pendingOrders.length})
          </div>
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg border-2 border-yellow-300 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-4 border-b border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">โต๊ะ {order.tableNumber}</span>
                      {order.priority === 'high' && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          ด่วน!
                        </span>
                      )}
                    </div>
                    <div className={`flex items-center gap-1 font-semibold ${getTimeColor(order.orderTime)}`}>
                      <Clock size={16} />
                      <span>{getElapsedTime(order.orderTime)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {order.orderTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1562565652-200bb5657315?w=100&q=80' : '1569058242253-92a9c755a0ec?w=100&q=80'}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">{item.name}</span>
                        </div>
                        {item.notes && (
                          <p className="text-xs text-red-600 mt-1 font-medium">📝 {item.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => handleStatusChange(order.id, 'preparing')}
                    className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    เริ่มทำอาหาร
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preparing Orders */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
            <Flame size={20} />
            กำลังทำ ({preparingOrders.length})
          </div>
          <div className="space-y-4">
            {preparingOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg border-2 border-orange-300 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-4 border-b border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">โต๊ะ {order.tableNumber}</span>
                    </div>
                    <div className={`flex items-center gap-1 font-semibold ${getTimeColor(order.orderTime)}`}>
                      <Clock size={16} />
                      <span>{getElapsedTime(order.orderTime)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {order.orderTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1562565652-200bb5657315?w=100&q=80' : '1569058242253-92a9c755a0ec?w=100&q=80'}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">{item.name}</span>
                        </div>
                        {item.notes && (
                          <p className="text-xs text-red-600 mt-1 font-medium">📝 {item.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => handleStatusChange(order.id, 'ready')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    พร้อมเสิร์ฟ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ready Orders */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-bold text-lg flex items-center gap-2">
            <CheckCircle size={20} />
            พร้อมเสิร์ฟ ({readyOrders.length})
          </div>
          <div className="space-y-4">
            {readyOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg border-2 border-green-300 overflow-hidden">
                <div className="bg-gradient-to-r from-green-100 to-green-50 p-4 border-b border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">โต๊ะ {order.tableNumber}</span>
                    </div>
                    <div className={`flex items-center gap-1 font-semibold ${getTimeColor(order.orderTime)}`}>
                      <Clock size={16} />
                      <span>{getElapsedTime(order.orderTime)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {order.orderTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <img 
                        src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1562565652-200bb5657315?w=100&q=80' : '1569058242253-92a9c755a0ec?w=100&q=80'}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">{item.name}</span>
                        </div>
                        {item.notes && (
                          <p className="text-xs text-red-600 mt-1 font-medium">📝 {item.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => handleComplete(order.id)}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    เสิร์ฟแล้ว
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
