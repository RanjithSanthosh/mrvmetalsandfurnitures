
'use client';

import Link from 'next/link';
import { Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-heading tracking-tight text-foreground transition-colors hover:text-primary">
            MRV Group
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm font-medium">
          {/* <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="/#categories"
          >
            Products
          </Link> */}
        </nav>
        <div className="flex items-center gap-4 ml-auto md:ml-6">
          <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank">
             <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
               Contact Us
             </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
