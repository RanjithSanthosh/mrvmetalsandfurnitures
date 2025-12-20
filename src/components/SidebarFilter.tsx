'use client';

import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

   if (!isOpen) return null;

   const handleCategoryClick = (cat: any) => {
      if (cat.types && cat.types.length > 0) {
         setSelectedCategory(cat);
         setActiveMenu('category');
      } else {
         // Direct link if no types
         router.push(`/?category=${encodeURIComponent(cat.name)}`);
         onClose();
      }
   };

   const handleBack = () => {
      setActiveMenu('main');
      setSelectedCategory(null);
   };

   const currentCategory = searchParams.get('category');
   const currentType = searchParams.get('type');

   // ... (inside component)

   const getPriceUrl = (min?: number, max?: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (min !== undefined) params.set('price_min', min.toString()); else params.delete('price_min');
      if (max !== undefined) params.set('price_max', max.toString()); else params.delete('price_max');
      return `/?${params.toString()}`;
   };

   return (
      <>
         {/* Overlay */}
         <div
            className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
            onClick={onClose}
         />

         {/* Sidebar Drawer */}
         <div className={cn(
            "fixed top-0 left-0 w-[85vw] md:w-[365px] h-full bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full"
         )}>
            {/* Header */}
            <div className="bg-[#232f3e] text-white p-4 flex items-center gap-3 font-bold text-lg">
               <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
               </div>
               Welcome to MRV
               <button onClick={onClose} className="ml-auto p-1 hover:bg-white/10 rounded">
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto h-[calc(100%-64px)] pb-10 relative">

               {/* Main Menu */}
               <div className={cn(
                  "absolute inset-0 w-full transition-transform duration-300 p-0 bg-white min-h-screen",
                  activeMenu === 'main' ? "translate-x-0" : "-translate-x-full"
               )}>
                  {/* <div className="py-4 border-b">
                  <h3 className="px-6 font-bold text-lg mb-2 text-slate-800">Trending</h3>
                  <ul className="space-y-0">
                    <Link href="/?sort=bestsellers" onClick={onClose}>
                        <li className="px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">Best Sellers</li>
                    </Link>
                    <Link href="/?sort=new" onClick={onClose}>
                        <li className="px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">New Releases</li>
                    </Link>
                  </ul>
               </div> */}

                  <div className="py-4 border-b">
                     <h3 className="px-6 font-bold text-lg mb-2 text-slate-800">Shop By Category</h3>
                     <ul className="space-y-0">
                        {/* View All Option */}
                        <Link href="/" onClick={onClose}>
                           <li className={cn(
                              "px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer flex justify-between items-center",
                              !currentCategory && "font-bold text-primary"
                           )}>
                              All Products
                           </li>
                        </Link>

                        {categories.map((cat) => (
                           <li key={cat._id}
                              onClick={() => handleCategoryClick(cat)}
                              className={cn(
                                 "px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer flex justify-between items-center",
                                 currentCategory === cat.name && "font-bold text-black"
                              )}
                           >
                              <div className="flex items-center gap-2">
                                 {/* Optional: Show small logo if needed */}
                                 <span>{cat.name}</span>
                              </div>
                              {cat.types && cat.types.length > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="py-4">
                     <h3 className="px-6 font-bold text-lg mb-2 text-slate-800">Price Filter</h3>
                     <ul className="space-y-0 text-sm text-slate-700">
                        <Link href={getPriceUrl(undefined, undefined)} onClick={onClose} scroll={false}>
                           <li className="px-6 py-2 hover:bg-slate-100">All Prices</li>
                        </Link>
                        <Link href={getPriceUrl(undefined, 1000)} onClick={onClose} scroll={false}>
                           <li className="px-6 py-2 hover:bg-slate-100">Under ₹1,000</li>
                        </Link>
                        <Link href={getPriceUrl(1000, 5000)} onClick={onClose} scroll={false}>
                           <li className="px-6 py-2 hover:bg-slate-100">₹1,000 - ₹5,000</li>
                        </Link>
                        <Link href={getPriceUrl(5000, 10000)} onClick={onClose} scroll={false}>
                           <li className="px-6 py-2 hover:bg-slate-100">₹5,000 - ₹10,000</li>
                        </Link>
                        <Link href={getPriceUrl(10000, undefined)} onClick={onClose} scroll={false}>
                           <li className="px-6 py-2 hover:bg-slate-100">Over ₹10,000</li>
                        </Link>
                     </ul>
                  </div>
               </div>

               {/* Sub Menu (Category Types) */}
               <div className={cn(
                  "absolute inset-0 w-full transition-transform duration-300 bg-white min-h-screen",
                  activeMenu === 'category' ? "translate-x-0" : "translate-x-full"
               )}>
                  <div className="sticky top-0 bg-white border-b z-10">
                     <div
                        onClick={handleBack}
                        className="flex items-center gap-2 px-6 py-4 text-slate-600 font-bold uppercase text-sm tracking-wide cursor-pointer hover:bg-slate-100"
                     >
                        <ChevronLeft className="w-5 h-5" /> Main Menu
                     </div>
                  </div>

                  <div className="py-4">
                     <h3 className="px-6 font-bold text-lg mb-4 text-slate-900">{selectedCategory?.name}</h3>
                     <ul className="space-y-0">
                        <Link href={`/?category=${encodeURIComponent(selectedCategory?.name || '')}`} onClick={onClose}>
                           <li className="px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer">
                              View All {selectedCategory?.name}
                           </li>
                        </Link>
                        {selectedCategory?.types?.map((type: string) => (
                           <Link key={type} href={`/?category=${encodeURIComponent(selectedCategory?.name || '')}&type=${encodeURIComponent(type)}`} onClick={onClose}>
                              <li className={cn(
                                 "px-6 py-3 hover:bg-slate-100 text-sm text-slate-700 cursor-pointer",
                                 currentType === type && "font-bold text-black"
                              )}>
                                 {type}
                              </li>
                           </Link>
                        ))}
                     </ul>
                  </div>
               </div>

            </div>
         </div>
      </>
   );
}
