'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    // Sidebar
    'menu.dashboard': 'แดชบอร์ด',
    'menu.tables': 'โต๊ะอาหาร',
    'menu.kitchen': 'ครัว',
    'menu.sales': 'ขายสินค้า',
    'menu.products': 'สินค้า',
    'menu.inventory': 'คลังสินค้า',
    'menu.reports': 'รายงาน',
    'menu.customers': 'ลูกค้า',
    'menu.users': 'ผู้ใช้งาน',
    'menu.settings': 'ตั้งค่า',
    
    // Dashboard
    'dashboard.title': 'แดชบอร์ด',
    'dashboard.overview': 'ภาพรวม',
    'dashboard.totalSales': 'ยอดขายทั้งหมด',
    'dashboard.todayOrders': 'คำสั่งซื้อวันนี้',
    'dashboard.totalProducts': 'สินค้าทั้งหมด',
    'dashboard.lowStock': 'สินค้าใกล้หมด',
    'dashboard.recentOrders': 'คำสั่งซื้อล่าสุด',
    'dashboard.orderNumber': 'หมายเลขคำสั่งซื้อ',
    'dashboard.customer': 'ลูกค้า',
    'dashboard.amount': 'จำนวนเงิน',
    'dashboard.status': 'สถานะ',
    'dashboard.viewAll': 'ดูทั้งหมด',
    
    // Products
    'products.title': 'สินค้า',
    'products.allProducts': 'สินค้าทั้งหมด',
    'products.addProduct': 'เพิ่มสินค้า',
    'products.search': 'ค้นหาสินค้า...',
    'products.searchButton': 'ค้นหา',
    'products.price': 'ราคา',
    'products.stock': 'คงเหลือ',
    'products.category': 'หมวดหมู่',
    'products.rating': 'คะแนน',
    
    // Sales
    'sales.title': 'ขายสินค้า',
    'sales.allSales': 'รายการขายทั้งหมด',
    'sales.newSale': 'สร้างรายการขาย',
    'sales.search': 'ค้นหารายการขาย...',
    'sales.searchButton': 'ค้นหา',
    'sales.orderId': 'รหัสออเดอร์',
    'sales.customer': 'ลูกค้า',
    'sales.items': 'จำนวนรายการ',
    'sales.total': 'ยอดรวม',
    'sales.discount': 'ส่วนลด',
    'sales.netTotal': 'ยอดสุทธิ',
    'sales.status': 'สถานะ',
    'sales.statusCompleted': 'เสร็จสิ้น',
    'sales.statusProcessing': 'กำลังดำเนินการ',
    'sales.statusPending': 'รอดำเนินการ',
    
    // Users
    'users.title': 'ผู้ใช้งาน',
    'users.allUsers': 'ผู้ใช้งานทั้งหมด',
    'users.addUser': 'เพิ่มผู้ใช้งาน',
    'users.search': 'ค้นหาผู้ใช้งาน...',
    'users.name': 'ชื่อ',
    'users.email': 'อีเมล',
    'users.phone': 'เบอร์โทร',
    'users.role': 'บทบาท',
    'users.actions': 'จัดการ',
    'users.edit': 'แก้ไข',
    'users.delete': 'ลบ',
    
    // Inventory
    'inventory.title': 'คลังสินค้า',
    'inventory.overview': 'จัดการและติดตามสต็อกสินค้า',
    'inventory.search': 'ค้นหาสินค้าในคลัง...',
    'inventory.totalItems': 'สินค้าทั้งหมด',
    'inventory.lowStock': 'สินค้าใกล้หมด',
    'inventory.outOfStock': 'สินค้าหมด',
    'inventory.inStock': 'มีสินค้า',
    'inventory.gridView': 'มุมมองกริด',
    'inventory.tableView': 'มุมมองตาราง',
    'inventory.product': 'สินค้า',
    'inventory.sku': 'รหัสสินค้า',
    'inventory.stock': 'คงเหลือ',
    'inventory.units': 'หน่วย',
    
    // Reports
    'reports.title': 'รายงาน',
    'reports.analytics': 'รายงานและวิเคราะห์',
    'reports.generate': 'สร้างรายงาน',
    'reports.totalRevenue': 'รายได้รวม',
    'reports.totalOrders': 'คำสั่งซื้อทั้งหมด',
    'reports.avgOrderValue': 'มูลค่าเฉลี่ย/คำสั่งซื้อ',
    'reports.reportTypes': 'ประเภทรายงาน',
    'reports.salesReport': 'รายงานยอดขาย',
    'reports.inventoryReport': 'รายงานสินค้าคงคลัง',
    'reports.customerReport': 'รายงานลูกค้า',
    'reports.profitReport': 'รายงานกำไร',
    
    // Settings
    'settings.title': 'ตั้งค่า',
    'settings.systemSettings': 'ตั้งค่าระบบ',
    'settings.save': 'บันทึกการตั้งค่า',
    'settings.general': 'ทั่วไป',
    'settings.storeInfo': 'ข้อมูลร้านค้า',
    'settings.businessHours': 'เวลาทำการ',
    'settings.taxConfig': 'ตั้งค่าภาษี',
    'settings.receiptSettings': 'ตั้งค่าใบเสร็จ',
    'settings.payment': 'การชำระเงิน',
    'settings.paymentMethods': 'วิธีการชำระเงิน',
    'settings.currencySettings': 'ตั้งค่าสกุลเงิน',
    'settings.paymentGateway': 'ช่องทางชำระเงิน',
    'settings.refundPolicy': 'นโยบายคืนเงิน',
    'settings.system': 'ระบบ',
    'settings.userPermissions': 'สิทธิ์ผู้ใช้งาน',
    'settings.securitySettings': 'ตั้งค่าความปลอดภัย',
    'settings.backupRestore': 'สำรองและกู้คืนข้อมูล',
    'settings.systemLogs': 'บันทึกระบบ',
    'settings.storeName': 'ชื่อร้านค้า',
    'settings.email': 'อีเมล',
    'settings.phone': 'เบอร์โทรศัพท์',
    'settings.language': 'ภาษา',
    
    // Login
    'login.title': 'เข้าสู่ระบบ',
    'login.subtitle': 'กรุณาเข้าสู่ระบบเพื่อใช้งาน',
    'login.email': 'อีเมล',
    'login.password': 'รหัสผ่าน',
    'login.role': 'บทบาท',
    'login.admin': 'ผู้ดูแลระบบ',
    'login.manager': 'ผู้จัดการ',
    'login.cashier': 'แคชเชียร์',
    'login.button': 'เข้าสู่ระบบ',
    'login.forgotPassword': 'ลืมรหัสผ่าน?',
    
    // Common
    'common.loading': 'กำลังโหลด...',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.retry': 'ลองใหม่',
    'common.logout': 'ออกจากระบบ',
    'common.showing': 'แสดง',
    'common.to': 'ถึง',
    'common.of': 'จาก',
    'common.results': 'รายการ',
    
    // Pagination
    'pagination.showing': 'แสดง',
    'pagination.to': 'ถึง',
    'pagination.of': 'จาก',
    'pagination.items': 'รายการ',
    'pagination.previous': 'ก่อนหน้า',
    'pagination.next': 'ถัดไป',
    'pagination.first': 'หน้าแรก',
    'pagination.last': 'หน้าสุดท้าย',
  },
  en: {
    // Sidebar
    'menu.dashboard': 'Dashboard',
    'menu.tables': 'Tables',
    'menu.kitchen': 'Kitchen',
    'menu.sales': 'Sales',
    'menu.products': 'Products',
    'menu.inventory': 'Inventory',
    'menu.reports': 'Reports',
    'menu.customers': 'Customers',
    'menu.users': 'Users',
    'menu.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.totalSales': 'Total Sales',
    'dashboard.todayOrders': "Today's Orders",
    'dashboard.totalProducts': 'Total Products',
    'dashboard.lowStock': 'Low Stock Items',
    'dashboard.recentOrders': 'Recent Orders',
    'dashboard.orderNumber': 'Order Number',
    'dashboard.customer': 'Customer',
    'dashboard.amount': 'Amount',
    'dashboard.status': 'Status',
    'dashboard.viewAll': 'View All',
    
    // Products
    'products.title': 'Products',
    'products.allProducts': 'All Products',
    'products.addProduct': 'Add Product',
    'products.search': 'Search products...',
    'products.searchButton': 'Search',
    'products.price': 'Price',
    'products.stock': 'In Stock',
    'products.category': 'Category',
    'products.rating': 'Rating',
    
    // Sales
    'sales.title': 'Sales',
    'sales.allSales': 'All Sales',
    'sales.newSale': 'New Sale',
    'sales.search': 'Search orders...',
    'sales.searchButton': 'Search',
    'sales.orderId': 'Order ID',
    'sales.customer': 'Customer',
    'sales.items': 'Items',
    'sales.total': 'Total',
    'sales.discount': 'Discount',
    'sales.netTotal': 'Net Total',
    'sales.status': 'Status',
    'sales.statusCompleted': 'Completed',
    'sales.statusProcessing': 'Processing',
    'sales.statusPending': 'Pending',
    
    // Users
    'users.title': 'Users',
    'users.allUsers': 'All Users',
    'users.addUser': 'Add User',
    'users.search': 'Search users...',
    'users.name': 'Name',
    'users.email': 'Email',
    'users.phone': 'Phone',
    'users.role': 'Role',
    'users.actions': 'Actions',
    'users.edit': 'Edit',
    'users.delete': 'Delete',
    
    // Inventory
    'inventory.title': 'Inventory',
    'inventory.overview': 'Track and manage your stock levels',
    'inventory.search': 'Search inventory...',
    'inventory.totalItems': 'Total Items',
    'inventory.lowStock': 'Low Stock',
    'inventory.outOfStock': 'Out of Stock',
    'inventory.inStock': 'In Stock',
    'inventory.gridView': 'Grid View',
    'inventory.tableView': 'Table View',
    'inventory.product': 'Product',
    'inventory.sku': 'SKU',
    'inventory.stock': 'Stock',
    'inventory.units': 'units',
    
    // Reports
    'reports.title': 'Reports',
    'reports.analytics': 'Reports & Analytics',
    'reports.generate': 'Generate Report',
    'reports.totalRevenue': 'Total Revenue',
    'reports.totalOrders': 'Total Orders',
    'reports.avgOrderValue': 'Avg Order Value',
    'reports.reportTypes': 'Report Types',
    'reports.salesReport': 'Sales Report',
    'reports.inventoryReport': 'Inventory Report',
    'reports.customerReport': 'Customer Report',
    'reports.profitReport': 'Profit Report',
    
    // Settings
    'settings.title': 'Settings',
    'settings.systemSettings': 'System Settings',
    'settings.save': 'Save Settings',
    'settings.general': 'General',
    'settings.storeInfo': 'Store Information',
    'settings.businessHours': 'Business Hours',
    'settings.taxConfig': 'Tax Configuration',
    'settings.receiptSettings': 'Receipt Settings',
    'settings.payment': 'Payment',
    'settings.paymentMethods': 'Payment Methods',
    'settings.currencySettings': 'Currency Settings',
    'settings.paymentGateway': 'Payment Gateway',
    'settings.refundPolicy': 'Refund Policy',
    'settings.system': 'System',
    'settings.userPermissions': 'User Permissions',
    'settings.securitySettings': 'Security Settings',
    'settings.backupRestore': 'Backup & Restore',
    'settings.systemLogs': 'System Logs',
    'settings.storeName': 'Store Name',
    'settings.email': 'Email',
    'settings.phone': 'Phone',
    'settings.language': 'Language',
    
    // Login
    'login.title': 'Sign In',
    'login.subtitle': 'Please sign in to continue',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.role': 'Role',
    'login.admin': 'Admin',
    'login.manager': 'Manager',
    'login.cashier': 'Cashier',
    'login.button': 'Sign In',
    'login.forgotPassword': 'Forgot Password?',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.logout': 'Logout',
    'common.showing': 'Showing',
    'common.to': 'to',
    'common.of': 'of',
    'common.results': 'results',
    
    // Pagination
    'pagination.showing': 'Showing',
    'pagination.to': 'to',
    'pagination.of': 'of',
    'pagination.items': 'items',
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.first': 'First Page',
    'pagination.last': 'Last Page',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('th');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.th] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
