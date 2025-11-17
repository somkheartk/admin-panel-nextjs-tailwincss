'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { apiService } from '@/services/api.service';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';
import type { ApiUser } from '@/types/api';
import Image from 'next/image';

export default function UsersPage() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const skip = (page - 1) * itemsPerPage;
      const data = await apiService.getUsers(itemsPerPage, skip);
      
      setUsers(data.users);
      setTotalItems(data.total);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchUsers(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-800',
      moderator: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || colors.user;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ผู้ใช้งาน</h1>
          <p className="text-gray-500 mt-1">จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium shadow-md">
          <Plus size={20} />
          เพิ่มผู้ใช้
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ค้นหาผู้ใช้..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter size={20} />
              กรอง
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : error ? (
          <div className="p-6">
            <ErrorMessage message={error} onRetry={() => fetchUsers(currentPage)} />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ใช้</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">อีเมล</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เบอร์โทร</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">บทบาท</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">การกระทำ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 flex-shrink-0">
                            <Image
                              src={user.image}
                              alt={`${user.firstName} ${user.lastName}`}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">{t('users.edit')}</button>
                        <button className="text-red-600 hover:text-red-900">{t('users.delete')}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
