// 'use client';

// import { X, ChevronRight, ChevronLeft } from 'lucide-react';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// interface SidebarFilterProps {
//    isOpen: boolean;
//    onClose: () => void;
//    categories: any[];
// }

// export function SidebarFilter({ isOpen, onClose, categories }: SidebarFilterProps) {
//    const router = useRouter();
//    const searchParams = useSearchParams();
//    const [activeMenu, setActiveMenu] = useState<'main' | 'category'>('main');
//    const [selectedCategory, setSelectedCategory] = useState<any>(null);

//    if (!isOpen) return null;

//    const handleCategoryClick = (cat: any) => {
//       if (cat.types && cat.types.length > 0) {
//          setSelectedCategory(cat);
//          setActiveMenu('category');
//       } else {
//          // Direct link if no types
//          router.push(`/?category=${encodeURIComponent(cat.name)}`);
//          onClose();
//       }
//    };

//    const handleBack = () => {
//       setActiveMenu('main');
//       setSelectedCategory(null);
//    };

//    const currentCategory = searchParams.get('category');
//    const currentType = searchParams.get('type');

//    // ... (inside component)

//    const getPriceUrl = (min?: number, max?: number) => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (min !== undefined) params.set('price_min', min.toString()); else params.delete('price_min');
//       if (max !== undefined) params.set('price_max', max.toString()); else params.delete('price_max');
//       return `/?${params.toString()}`;
//    };

//    return (
//       <>
//          {/* Overlay */}
//          <div
//             className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
//             onClick={onClose}
//          />

//          {/* Sidebar Drawer */}
//          <div className={cn(
//             "fixed top-0 left-0 w-[85vw] md:w-[365px] h-full bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out",
//             isOpen ? "translate-x-0" : "-translate-x-full"
//          )}>
//             {/* Header */}
//             <div className="bg-[#232f3e] text-white p-4 flex items-center gap-3 font-bold text-lg">
//                <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center">
//                   <span className="text-white text-sm">👤</span>
//                </div>
//                Welcome to MRV
//                <button onClick={onClose} className="ml-auto p-1 hover:bg-white/10 rounded">
//                   <X className="w-6 h-6" />
//                </button>
//             </div>

//             {/* Content Area */}
//             <div className="overflow-y-auto h-[calc(100%-64px)] pb-10 relative">

//                {/* Main Menu */}
//                <div className={cn(
//                   "absolute inset-0 w-full transition-transform duration-300 p-0 bg-white min-h-screen",
//                   activeMenu === 'main' ? "translate-x-0" : "-translate-x-full"
//                )}>
//                   {/* <div className="py-4 border-b">
//                   <h3 className="px-6 font-bold text-lg mb-2 text-slate-800">Trending</h3>
//                   <ul className="space-y-0">
//                     <Link href="/?sort=bestsellers" onClick={onClose}>
//                         <li className="px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">Best Sellers</li>
//                     </Link>
//                     <Link href="/?sort=new" onClick={onClose}>
//                         <li className="px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">New Releases</li>
//                     </Link>
//                   </ul>
//                </div> */}

//                   <div className="py-4 border-b">
//                      <h3 className="px-6 font-bold text-lg mb-2 text-slate-800">Shop By Category</h3>
//                      <ul className="space-y-0">
//                         {/* View All Option */}
//                         <Link href="/" onClick={onClose}>
//                            <li className={cn(
//                               "px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer flex justify-between items-center",
//                               !currentCategory && "font-bold text-primary"
//                            )}>
//                               All Products
//                            </li>
//                         </Link>

//                         {categories.map((cat) => (
//                            <li key={cat._id}
//                               onClick={() => handleCategoryClick(cat)}
//                               className={cn(
//                                  "px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer flex justify-between items-center",
//                                  currentCategory === cat.name && "font-bold text-black"
//                               )}
//                            >
//                               <div className="flex items-center gap-2">
//                                  {/* Optional: Show small logo if needed */}
//                                  <span>{cat.name}</span>
//                               </div>
//                               {cat.types && cat.types.length > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
//                            </li>
//                         ))}
//                      </ul>
//                   </div>

//                   <div className="py-4">
//                      <h3 className="px-6 font-bold text-lg mb-2 text-slate-800">Price Filter</h3>
//                      <ul className="space-y-0 text-sm text-slate-700">
//                         <Link href={getPriceUrl(undefined, undefined)} onClick={onClose} scroll={false}>
//                            <li className="px-6 py-2 hover:bg-slate-100">All Prices</li>
//                         </Link>
//                         <Link href={getPriceUrl(undefined, 1000)} onClick={onClose} scroll={false}>
//                            <li className="px-6 py-2 hover:bg-slate-100">Under ₹1,000</li>
//                         </Link>
//                         <Link href={getPriceUrl(1000, 5000)} onClick={onClose} scroll={false}>
//                            <li className="px-6 py-2 hover:bg-slate-100">₹1,000 - ₹5,000</li>
//                         </Link>
//                         <Link href={getPriceUrl(5000, 10000)} onClick={onClose} scroll={false}>
//                            <li className="px-6 py-2 hover:bg-slate-100">₹5,000 - ₹10,000</li>
//                         </Link>
//                         <Link href={getPriceUrl(10000, undefined)} onClick={onClose} scroll={false}>
//                            <li className="px-6 py-2 hover:bg-slate-100">Over ₹10,000</li>
//                         </Link>
//                      </ul>
//                   </div>
//                </div>

//                {/* Sub Menu (Category Types) */}
//                <div className={cn(
//                   "absolute inset-0 w-full transition-transform duration-300 bg-white min-h-screen",
//                   activeMenu === 'category' ? "translate-x-0" : "translate-x-full"
//                )}>
//                   <div className="sticky top-0 bg-white border-b z-10">
//                      <div
//                         onClick={handleBack}
//                         className="flex items-center gap-2 px-6 py-4 text-slate-600 font-bold uppercase text-sm tracking-wide cursor-pointer hover:bg-slate-100"
//                      >
//                         <ChevronLeft className="w-5 h-5" /> Main Menu
//                      </div>
//                   </div>

//                   <div className="py-4">
//                      <h3 className="px-6 font-bold text-lg mb-4 text-slate-900">{selectedCategory?.name}</h3>
//                      <ul className="space-y-0">
//                         <Link href={`/?category=${encodeURIComponent(selectedCategory?.name || '')}`} onClick={onClose}>
//                            <li className="px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">
//                               View All {selectedCategory?.name}
//                            </li>
//                         </Link>
//                         {selectedCategory?.types?.map((type: string) => (
//                            <Link key={type} href={`/?category=${encodeURIComponent(selectedCategory?.name || '')}&type=${encodeURIComponent(type)}`} onClick={onClose}>
//                               <li className={cn(
//                                  "px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer",
//                                  currentType === type && "font-bold text-black"
//                               )}>
//                                  {type}
//                               </li>
//                            </Link>
//                         ))}
//                      </ul>
//                   </div>
//                </div>

//             </div>
//          </div>
//       </>
//    );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, User, RotateCcw, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarFilterProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
}

export function SidebarFilter({ isOpen, onClose, categories }: SidebarFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeMenu, setActiveMenu] = useState<'main' | 'category'>('main');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Determine if any filters are active
  const hasActiveFilters = searchParams.has('category') || 
                           searchParams.has('type') || 
                           searchParams.has('price_min') || 
                           searchParams.has('price_max') ||
                           searchParams.has('search');

  const handleReset = () => {
    router.push('/'); // Navigates to base URL, clearing all params
    setActiveMenu('main');
    setSelectedCategory(null);
    onClose();
  };

  const handleCategoryClick = (cat: any) => {
    if (cat.types && cat.types.length > 0) {
      setSelectedCategory(cat);
      setActiveMenu('category');
    } else {
      router.push(`/?category=${encodeURIComponent(cat.name)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 w-full max-w-[380px] h-full bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#131921] p-6 text-white shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center text-[#131921]">
                    <User className="h-5 w-5" />
                  </div>
                  <p className="text-lg font-bold tracking-tight">MRV Premium</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              {/* Main Menu Pane */}
              <motion.div
                animate={{ x: activeMenu === 'main' ? 0 : '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="absolute inset-0 overflow-y-auto px-6 py-8"
              >
                {/* --- RESET SECTION --- */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 overflow-hidden"
                    >
                      <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100 group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <RotateCcw className="h-4 w-4 text-amber-600 group-hover:rotate-[-45deg] transition-transform" />
                          <span className="text-sm font-bold text-amber-900">Reset All Filters</span>
                        </div>
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Clear</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Categories */}
                <section className="mb-10">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-2">Collections</h3>
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li 
                        key={cat._id}
                        onClick={() => handleCategoryClick(cat)}
                        className={cn(
                          "group flex items-center justify-between py-3.5 px-4 rounded-xl cursor-pointer transition-all",
                          searchParams.get('category') === cat.name ? "bg-slate-900 text-white" : "hover:bg-slate-50 text-slate-700"
                        )}
                      >
                        <span className="text-sm font-medium">{cat.name}</span>
                        <ChevronRight className={cn("h-4 w-4", searchParams.get('category') === cat.name ? "text-amber-400" : "text-slate-300")} />
                      </li>
                    ))}
                  </ul>
                </section>
                
                {/* Price Section */}
                <section>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-2">Price</h3>
                  <div className="space-y-1">
                    {[
                       { label: 'Under ₹2,000', min: 0, max: 2000 },
                      { label: 'Under ₹5,000', min: 0, max: 5000 },
                      { label: '₹5,000 — ₹15,000', min: 5000, max: 15000 },
                      // { label: 'Premium Range', min: 15000, max: 1000000 }
                    ].map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set('price_min', range.min.toString());
                          params.set('price_max', range.max.toString());
                          router.push(`/?${params.toString()}`);
                          onClose();
                        }}
                        className="w-full text-left py-3.5 px-4 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </section>
              </motion.div>

              {/* Sub Menu Pane (Category Types) */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: activeMenu === 'category' ? 0 : '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="absolute inset-0 bg-white flex flex-col"
              >
                <div className="p-4 border-b">
                  <button 
                    onClick={() => setActiveMenu('main')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 py-2 px-2 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back to collections
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto px-6 py-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 px-2">{selectedCategory?.name}</h2>
                  <ul className="space-y-1">
                    {selectedCategory?.types?.map((type: string) => (
                      <li 
                        key={type}
                        onClick={() => {
                          router.push(`/?category=${encodeURIComponent(selectedCategory.name)}&type=${encodeURIComponent(type)}`);
                          onClose();
                        }}
                        className="py-4 px-4 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}