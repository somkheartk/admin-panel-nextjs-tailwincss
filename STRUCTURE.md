# Admin Panel - Professional Structure

## 📁 โครงสร้างโปรเจค

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # หน้า Dashboard และหน้าย่อย
│   ├── login/            # หน้า Login
│   ├── layout.tsx        # Root Layout
│   └── globals.css       # Global Styles
│
├── components/            # React Components
│   ├── Sidebar.tsx       # เมนูด้านข้าง
│   ├── Header.tsx        # Header บาร์
│   ├── LoadingSpinner.tsx # Loading Component
│   └── ErrorMessage.tsx  # Error Component
│
├── contexts/             # React Context (State Management)
│   └── AuthContext.tsx   # Authentication Context
│
├── services/             # API Services
│   └── api.service.ts    # API Service Layer
│
├── hooks/                # Custom React Hooks
│   └── useApi.ts         # Hook สำหรับเรียก API
│
├── types/                # TypeScript Types
│   ├── index.ts          # Types หลัก
│   └── api.ts            # API Response Types
│
├── config/               # Configuration Files
│   ├── api.ts            # API Config
│   └── menu.ts           # Menu Config
│
└── utils/                # Utility Functions
    └── format.ts         # Format Functions (currency, date, etc.)
```

## 🎯 คุณสมบัติ

### ✅ ดึงข้อมูลจาก API จริง
- ใช้ DummyJSON API สำหรับทดสอบ
- มี API Service Layer แยกชัดเจน
- มี Error Handling และ Loading States

### ✅ โครงสร้างแบบมืออาชีพ
- **Separation of Concerns**: แยก Logic, UI, และ Data
- **Type Safety**: ใช้ TypeScript ทั้งโปรเจค
- **Reusable Components**: Component แยกใช้ซ้ำได้
- **Custom Hooks**: Hook สำหรับจัดการ API
- **Service Layer**: แยก API calls ออกจาก Components

### ✅ ใช้ฟอนต์ไทย Kanit
- ฟอนต์สวยงามรองรับภาษาไทย
- โหลดจาก Google Fonts
- น้ำหนักฟอนต์ครบ 300-700

### ✅ UI/UX ที่ดี
- Loading Spinner ขณะโหลดข้อมูล
- Error Message พร้อมปุ่มลองใหม่
- Responsive Design
- Smooth Transitions

## 📊 API ที่ใช้

- **Products**: รายการสินค้า, ค้นหา, หมวดหมู่
- **Carts**: คำสั่งซื้อ/ตะกร้า
- **Users**: รายการผู้ใช้

## 🚀 การใช้งาน API Service

```typescript
// ใน Component
import { apiService } from '@/services/api.service';

// ดึงข้อมูลสินค้า
const products = await apiService.getProducts(30);

// ค้นหาสินค้า
const results = await apiService.searchProducts('phone');

// ดึงคำสั่งซื้อ
const carts = await apiService.getCarts(20);
```

## 🎨 Format Functions

```typescript
import { formatCurrency, formatNumber } from '@/utils/format';

formatCurrency(1250)      // "฿1,250"
formatNumber(1234567)     // "1,234,567"
getTimeAgo(date)          // "5 นาทีที่แล้ว"
```

## 📦 Features ที่เพิ่มเข้ามา

1. **Dashboard** - แสดงสถิติจริงจาก API
2. **Products** - แสดงรายการสินค้าพร้อมรูปภาพ
3. **Search** - ค้นหาสินค้าได้
4. **Loading States** - แสดง Loading ขณะดึงข้อมูล
5. **Error Handling** - จัดการ Error อย่างเหมาะสม
6. **Type Safety** - Types ครบถ้วน

## 🔧 Next Steps

- เพิ่ม Pagination
- เพิ่ม Sorting และ Filtering
- เพิ่มหน้ารายละเอียดสินค้า
- เพิ่ม CRUD Operations
- เชื่อมต่อกับ Backend จริง
