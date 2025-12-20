'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  _id: string;
  title: string;
  category: string;
  type: string;
  price: number;
  mrpPrice: number;
  images: string[];
  stockStatus: string;
  description?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);

  return (
    <Card className="h-full flex flex-col group border-none shadow-none hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-200 bg-white rounded-none overflow-hidden relative p-2">
      
      {/* Image Section */}
      <Link href={`/product/${product._id}`} className="relative block aspect-[4/5] w-full bg-gray-50 mb-2 overflow-hidden rounded-md">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.title}
          fill
          className="object-contain mix-blend-multiply p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Out of Stock Overlay */}
        {product.stockStatus === 'Out of Stock' && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
            <span className="text-red-600 font-bold uppercase text-xs border border-red-600 px-2 py-1 bg-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Details Section */}
      <CardContent className="p-0 flex flex-col items-start text-left flex-grow">
        
        {/* Title */}
        <Link href={`/product/${product._id}`} className="group-hover:text-[#C7511F] transition-colors">
          <h3 className="font-medium text-base text-slate-900 line-clamp-2 leading-snug mb-1">
            {product.title}
          </h3>
        </Link>
        
        {/* Category Badge instead of Fake Rating */}
        <div className="flex items-center gap-1 mb-1">
          <Badge variant="secondary" className="text-xs font-normal text-slate-600 bg-slate-100 hover:bg-slate-200">
             {product.category}
          </Badge>
        </div>

        {/* Pricing */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl font-medium text-slate-900">
            <span className="text-xs align-top font-normal mr-0.5">₹</span>
            {product.price.toLocaleString('en-IN')}
          </span>
          
          {product.mrpPrice > product.price && (
             <span className="text-xs text-slate-500 line-through">
               ₹{product.mrpPrice.toLocaleString('en-IN')}
             </span>
          )}
        </div>
        
        {discount > 0 && (
           <span className="text-xs text-slate-600">
             Save <span className="text-red-700 font-bold bg-red-100 px-1 rounded">{discount}%</span>
           </span>
         )}
        
        {/* Delivery / Prime Mock */}
        <div className="mt-1 text-xs text-slate-500">
          <span className="text-slate-700 font-bold">FREE Delivery</span> by MRV
        </div>
      </CardContent>
    </Card>
  );
}