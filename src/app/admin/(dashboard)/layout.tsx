'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
          <AdminSidebar className="h-full border-r" />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center h-14 px-4 border-b bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-40 lg:h-[60px]">
             <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
               <SheetTrigger asChild>
                 <Button variant="ghost" size="icon" className="mr-2 -ml-2">
                   <Menu className="h-5 w-5" />
                   <span className="sr-only">Toggle menu</span>
                 </Button>
               </SheetTrigger>
               <SheetContent side="left" className="p-0 w-64 border-r-slate-800 bg-slate-900 text-slate-50">
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                 <AdminSidebar onLinkClick={() => setIsMobileOpen(false)} />
               </SheetContent>
             </Sheet>
             <h1 className="font-semibold text-lg">Admin Panel</h1>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-[100vw]">
            {children}
          </main>
      </div>
    </div>
  );
}
