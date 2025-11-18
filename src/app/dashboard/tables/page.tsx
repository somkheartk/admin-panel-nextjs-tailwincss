'use client';

import { useState } from 'react';
import { Plus, Users, Clock, Check, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Table {
  id: number;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentBill?: number;
  occupiedTime?: string;
  customerName?: string;
}

export default function TablesPage() {
  const { t } = useLanguage();
  const [tables, setTables] = useState<Table[]>([
    { id: 1, number: 'A1', capacity: 2, status: 'available' },
    { id: 2, number: 'A2', capacity: 4, status: 'occupied', currentBill: 850, occupiedTime: '45 นาที', customerName: 'คุณสมชาย' },
    { id: 3, number: 'A3', capacity: 4, status: 'available' },
    { id: 4, number: 'A4', capacity: 6, status: 'reserved', customerName: 'คุณสมหญิง' },
    { id: 5, number: 'B1', capacity: 2, status: 'occupied', currentBill: 450, occupiedTime: '20 นาที', customerName: 'คุณวิชัย' },
    { id: 6, number: 'B2', capacity: 4, status: 'available' },
    { id: 7, number: 'B3', capacity: 8, status: 'available' },
    { id: 8, number: 'B4', capacity: 4, status: 'occupied', currentBill: 1250, occupiedTime: '60 นาที', customerName: 'คุณมานี' },
    { id: 9, number: 'C1', capacity: 2, status: 'available' },
    { id: 10, number: 'C2', capacity: 6, status: 'reserved', customerName: 'คุณสุดา' },
    { id: 11, number: 'C3', capacity: 4, status: 'available' },
    { id: 12, number: 'C4', capacity: 4, status: 'occupied', currentBill: 680, occupiedTime: '30 นาที', customerName: 'คุณประสิทธิ์' },
  ]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'from-green-400 to-green-600';
      case 'occupied':
        return 'from-red-400 to-red-600';
      case 'reserved':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'ว่าง';
      case 'occupied':
        return 'ไม่ว่าง';
      case 'reserved':
        return 'จอง';
      default:
        return '';
    }
  };

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const handleCheckout = (tableId: number) => {
    setTables(tables.map(t => 
      t.id === tableId ? { ...t, status: 'available', currentBill: undefined, occupiedTime: undefined, customerName: undefined } : t
    ));
    setShowModal(false);
    setSelectedTable(null);
  };

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จัดการโต๊ะอาหาร</h1>
          <p className="text-gray-500 mt-1">ดูสถานะและจัดการโต๊ะทั้งหมด</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium shadow-md">
          <Plus size={20} />
          เพิ่มโต๊ะ
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6 border border-blue-200">
          <h3 className="text-blue-700 text-sm font-medium">โต๊ะทั้งหมด</h3>
          <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200">
          <h3 className="text-green-700 text-sm font-medium">โต๊ะว่าง</h3>
          <p className="text-3xl font-bold text-green-900 mt-2">{stats.available}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-6 border border-red-200">
          <h3 className="text-red-700 text-sm font-medium">โต๊ะไม่ว่าง</h3>
          <p className="text-3xl font-bold text-red-900 mt-2">{stats.occupied}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm p-6 border border-yellow-200">
          <h3 className="text-yellow-700 text-sm font-medium">โต๊ะจอง</h3>
          <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.reserved}</p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">แผนผังโต๊ะอาหาร</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => handleTableClick(table)}
              className={`relative bg-gradient-to-br ${getStatusColor(table.status)} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
            >
              <div className="h-32 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${table.id % 2 === 0 ? '1546069901-ba9599a7e63c?w=400&q=80' : '1555939594-58d7cb561ad1?w=400&q=80'}`}
                  alt="Table"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center p-4 text-white">
                <div className="text-2xl font-bold mb-2">{table.number}</div>
                <div className="flex items-center justify-center gap-1 text-sm opacity-90 mb-2">
                  <Users size={16} />
                  <span>{table.capacity} ที่นั่ง</span>
                </div>
                <div className="text-xs font-semibold bg-white/20 rounded-full py-1 px-3">
                  {getStatusText(table.status)}
                </div>
                {table.occupiedTime && (
                  <div className="flex items-center justify-center gap-1 text-xs mt-2 opacity-90">
                    <Clock size={12} />
                    <span>{table.occupiedTime}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Table Detail Modal */}
      {showModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className={`bg-gradient-to-r ${getStatusColor(selectedTable.status)} p-6 rounded-t-xl text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">โต๊ะ {selectedTable.number}</h2>
                  <div className="flex items-center gap-2 mt-2 opacity-90">
                    <Users size={18} />
                    <span>{selectedTable.capacity} ที่นั่ง</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">สถานะ</span>
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  selectedTable.status === 'available' ? 'bg-green-100 text-green-800' :
                  selectedTable.status === 'occupied' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {getStatusText(selectedTable.status)}
                </span>
              </div>

              {selectedTable.customerName && (
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">ชื่อลูกค้า</span>
                  <span className="font-semibold text-gray-900">{selectedTable.customerName}</span>
                </div>
              )}

              {selectedTable.occupiedTime && (
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">เวลาที่ใช้</span>
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <Clock size={18} className="text-gray-400" />
                    <span>{selectedTable.occupiedTime}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {selectedTable.status === 'occupied' && (
                  <>
                    <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2">
                      <Plus size={20} />
                      สั่งอาหาร
                    </button>
                    <button 
                      onClick={() => handleCheckout(selectedTable.id)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
                    >
                      <Check size={20} />
                      ชำระเงิน
                    </button>
                  </>
                )}
                {selectedTable.status === 'available' && (
                  <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md">
                    เปิดโต๊ะ
                  </button>
                )}
                {selectedTable.status === 'reserved' && (
                  <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md">
                    ยืนยันการจอง
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
