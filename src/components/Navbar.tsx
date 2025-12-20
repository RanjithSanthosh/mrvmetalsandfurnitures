
'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Package2, Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { SidebarFilter } from './SidebarFilter';

interface NavbarProps {
  categories?: any[];
}

export function Navbar({ categories = [] }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#131921] text-white shadow-md flex flex-col">
        {/* Top Bar - Main Navigation */}
        <div className="container flex items-center h-16 px-4 gap-4 md:gap-8 max-w-[1500px] mx-auto w-full">

          {/* Logo */}
          <Link className="flex items-center gap-2 font-semibold shrink-0" href="/">
            <div className="relative flex items-center justify-center w-8 h-8 rounded bg-white/10">
              <Package2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-white">MRV Group</span>
              <span className="text-[10px] text-gray-300 tracking-wider uppercase">Furnitures & Steels</span>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative group">
            <div className="flex w-full rounded-md overflow-hidden bg-white h-10 ring-2 ring-transparent focus-within:ring-[#FFD814]">
              {/* Category Select Mock */}
              <button type="button" className="px-3 text-xs text-gray-600 bg-gray-100 border-r border-gray-300 hover:bg-gray-200 transition-colors">
                All
              </button>
              <Input
                type="text"
                placeholder="Search MRV Products..."
                className="flex-1 border-0 shadow-none focus-visible:ring-0 rounded-none text-black h-full px-3"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="bg-[#FFD814] hover:bg-[#F7CA00] px-5 flex items-center justify-center transition-colors">
                <Search className="h-5 w-5 text-black" />
              </button>
            </div>
          </form>

          {/* Mobile Search Icon (visible only on small screens) */}
          <div className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Actions */}
          <nav className="flex items-center gap-4 ml-auto md:ml-0 shrink-0">

            {/* Admin / Login */}
            {/* <Link href="/admin/login" className="hidden sm:flex flex-col text-xs leading-none hover:outline outline-1 outline-white p-1 rounded-sm">
              <span className="text-gray-300">Hello, Admin</span>
              <span className="font-bold text-sm">Account & Lists</span>
            </Link> */}

            {/* Orders / Returns (Mock) */}
            {/* <div className="hidden sm:flex flex-col text-xs leading-none hover:outline outline-1 outline-white p-1 rounded-sm cursor-pointer">
              <span className="text-gray-300">Returns</span>
              <span className="font-bold text-sm">& Orders</span>
            </div> */}

            {/* Cart / Contact */}
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" className="flex items-end gap-1 hover:outline outline-1 outline-white p-2 rounded-sm">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-white" />
                {/* <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#FFD814] text-black text-[10px] font-bold flex items-center justify-center"></span> */}
              </div>
              <span className="font-bold text-sm hidden sm:inline mb-1">Inquiry</span>
            </Link>
          </nav>
        </div>

        {/* Sub-navigation (Categories Strip) */}
        <div className="bg-[#232f3e] h-10 flex items-center px-4 text-white text-sm gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-white/10 relative z-40">
          <div className="container max-w-[1500px] mx-auto flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-1 font-bold hover:outline outline-1 outline-white p-1 px-2 rounded-sm cursor-pointer"
            >
              <Menu className="h-5 w-5" /> All
            </button>

            {/* Top Level Categories */}
            {categories.slice(0, 10).map((cat) => (
              <Link
                key={cat._id}
                href={`/?category=${encodeURIComponent(cat.name)}`}
                className="hover:outline outline-1 outline-white p-1 px-2 rounded-sm cursor-pointer font-medium text-sm text-gray-200 hover:text-white"
              >
                {cat.name}
              </Link>
            ))}

            {/* <Link href="/?sort=new" className="hover:outline outline-1 outline-white p-1 px-2 rounded-sm cursor-pointer font-medium text-sm text-gray-200 hover:text-white ml-auto hidden md:block">
              New Releases
            </Link> */}
          </div>
        </div>
      </header>

      <SidebarFilter
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
      />
    </>
  );
}
