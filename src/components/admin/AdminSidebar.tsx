
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Layers, Lock, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
      toast.success('Logged out');
    } catch (e) {
      console.error(e);
      toast.error('Failed to logout');
    }
  }

  const links = [
    { href: '/admin', label: 'Products', icon: LayoutDashboard },
    { href: '/admin/categories', label: 'Categories', icon: Layers },
    { href: '/admin/password', label: 'Change Password', icon: Lock },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-900 text-slate-50">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
        <p className="text-xs text-slate-400">MRV Group Technologies</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href; // Exact match for admin root is tricky if subpaths. 
          // Actually '/admin' should match '/admin' strictly for Products.
          // Or I should put Products at '/admin/products'.
          // I will put Products at '/admin' as Dashboard.
          
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 mb-1 font-normal text-slate-300 hover:text-white hover:bg-slate-800",
                  isActive && "bg-slate-800 text-white font-medium"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-3 bg-red-600 hover:bg-red-700 text-white" 
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
