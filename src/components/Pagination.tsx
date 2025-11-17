import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const { t } = useLanguage();
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= showPages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * (itemsPerPage || 0) + 1;
  const endItem = Math.min(currentPage * (itemsPerPage || 0), totalItems || 0);

  return (
    <div className="mt-6 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Mobile */}
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition-all ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800'
          }`}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t('pagination.previous')}
        </button>
        <span className="text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium shadow-sm transition-all ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800'
          }`}
        >
          {t('pagination.next')}
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {totalItems && itemsPerPage && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">{t('pagination.showing')}</span>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 font-semibold rounded-md">
                {startItem}-{endItem}
              </span>
              <span className="text-gray-600">{t('pagination.of')}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 font-semibold rounded-md">
                {totalItems}
              </span>
              <span className="text-gray-600">{t('pagination.items')}</span>
            </div>
          )}
        </div>
        <div>
          <nav className="isolate inline-flex gap-1" aria-label="Pagination">
            {/* First Page */}
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-lg px-3 py-2 transition-all ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm border border-gray-200'
              }`}
              title={t('pagination.first')}
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-lg px-3 py-2 transition-all ${
                currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm border border-gray-200'
              }`}
              title={t('pagination.previous')}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {getPageNumbers().map((page, index) => {
                if (page === '...') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-400"
                    >
                      •••
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md scale-105 border-2 border-indigo-400'
                        : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105 shadow-sm border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-lg px-3 py-2 transition-all ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm border border-gray-200'
              }`}
              title={t('pagination.next')}
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-lg px-3 py-2 transition-all ${
                currentPage === totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm border border-gray-200'
              }`}
              title={t('pagination.last')}
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
