'use client';

import { Download, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">View analytics and generate reports</p>
        </div>
        <button className="bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 font-medium shadow-md">
          <Download size={20} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <TrendingUp className="text-slate-700" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">฿842,500</p>
          <p className="text-sm text-cyan-600 mt-2">+15.3% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
            <TrendingUp className="text-cyan-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-slate-600 mt-2">+8.2% from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Sales Report', 'Inventory Report', 'Customer Report', 'Product Report', 'Revenue Report', 'Tax Report'].map((report) => (
            <button key={report} className="p-4 border border-gray-200 rounded-lg hover:border-slate-500 hover:bg-slate-50 transition-colors text-left">
              <p className="font-medium text-gray-900">{report}</p>
              <p className="text-sm text-gray-500 mt-1">Generate and download</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
