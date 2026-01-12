'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Package2, Search, ShoppingCart, PhoneCall, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarFilter } from './SidebarFilter';
import { cn } from '@/lib/utils'; // Ensure you have this utility for Tailwind classes

interface NavbarProps {
  categoriesPromise?: Promise<any[]>;
}

export function Navbar({ categoriesPromise = Promise.resolve([]) }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for a "floating" feel
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-[#131921]/95 backdrop-blur-md shadow-lg" : "bg-[#131921]"
      )}>
        {/* Main Navigation Row */}
        <div className="mx-auto max-w-[1500px] px-4 h-16 flex items-center gap-6">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 transition-transform active:scale-95">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
              <Package2 className="h-6 w-6 text-[#131921]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                MRV <span className="text-amber-400">GROUP</span>
              </span>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.15em]">
                Furnitures & Steels
              </span>
            </div>
          </Link>

          {/* Centered Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl group relative hidden md:flex"
          >
            <div className="relative flex items-center w-full bg-white rounded-lg overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-amber-400 focus-within:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <div className="hidden sm:flex items-center px-4 bg-gray-50 border-r border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                <span className="text-xs font-semibold text-gray-600">All</span>
              </div>
              <Input
                type="text"
                placeholder="Search premium products..."
                className="h-10 border-none bg-transparent text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 px-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-12 rounded-none bg-amber-400 hover:bg-amber-500 transition-colors"
              >
                <Search className="h-5 w-5 text-[#131921]" />
              </Button>
            </div>
          </form>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi! I'm interested in MRV products.`}
              target="_blank"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <div className="relative">
                <PhoneCall className="h-6 w-6 text-white group-hover:text-amber-400 transition-colors" />

              </div>
              <div className="hidden xl:flex flex-col items-start leading-none">
                <span className="text-[11px] text-gray-400">Quick</span>
                <span className="text-sm font-bold text-white">Inquiry</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search - Only visible on small screens */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex bg-white rounded-lg overflow-hidden ring-1 ring-gray-200">
            <Input
              type="text"
              placeholder="Search..."
              className="flex-1 border-none focus-visible:ring-0 text-black h-10 px-4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="bg-amber-400 rounded-none h-10 px-4">
              <Search className="h-5 w-5 text-black" />
            </Button>
          </form>
        </div>

        {/* Secondary Navigation (Category Strip) */}
        <div className="bg-[#232f3e] border-t border-white/5">
          <div className="mx-auto max-w-[1500px] flex items-center h-10 px-4 overflow-hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 mr-4 text-sm font-bold text-white rounded-md hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <Menu className="h-4 w-4" />
              All Categories
            </button>


            <div>

            </div>
            <div className="ml-auto hidden md:block">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Limited Offers Available</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <SidebarFilter
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categoriesPromise={categoriesPromise}
      />
    </>
  );
}