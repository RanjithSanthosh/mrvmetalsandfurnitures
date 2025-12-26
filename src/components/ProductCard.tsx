// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

// interface Product {
//   _id: string;
//   title: string;
//   category: string;
//   type: string;
//   price: number;
//   mrpPrice: number;
//   images: string[];
//   stockStatus: string;
//   description?: string;
// }

// export function ProductCard({ product }: { product: Product }) {
//   const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);

//   return (
//     <Card className="h-full flex flex-col group border-none shadow-none hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-200 bg-white rounded-none overflow-hidden relative p-2">
      
//       {/* Image Section */}
//       <Link href={`/product/${product._id}`} className="relative block aspect-[4/5] w-full bg-gray-50 mb-2 overflow-hidden rounded-md">
//         <Image
//           src={product.images[0] || '/placeholder.svg'}
//           alt={product.title}
//           fill
//           className="object-contain mix-blend-multiply p-4 transition-transform duration-300 group-hover:scale-105"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
        
//         {/* Out of Stock Overlay */}
//         {product.stockStatus === 'Out of Stock' && (
//           <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
//             <span className="text-red-600 font-bold uppercase text-xs border border-red-600 px-2 py-1 bg-white">
//               Out of Stock
//             </span>
//           </div>
//         )}
//       </Link>

//       {/* Details Section */}
//       <CardContent className="p-0 flex flex-col items-start text-left flex-grow">
        
//         {/* Title */}
//         <Link href={`/product/${product._id}`} className="group-hover:text-[#C7511F] transition-colors">
//           <h3 className="font-medium text-base text-slate-900 line-clamp-2 leading-snug mb-1">
//             {product.title}
//           </h3>
//         </Link>
        
//         {/* Category Badge instead of Fake Rating */}
//         <div className="flex items-center gap-1 mb-1">
//           <Badge variant="secondary" className="text-xs font-normal text-slate-600 bg-slate-100 hover:bg-slate-200">
//              {product.category}
//           </Badge>
//         </div>

//         {/* Pricing */}
//         <div className="mt-1 flex items-baseline gap-2">
//           <span className="text-xl font-medium text-slate-900">
//             <span className="text-xs align-top font-normal mr-0.5">₹</span>
//             {product.price.toLocaleString('en-IN')}
//           </span>
          
//           {product.mrpPrice > product.price && (
//              <span className="text-xs text-slate-500 line-through">
//                ₹{product.mrpPrice.toLocaleString('en-IN')}
//              </span>
//           )}
//         </div>
        
//         {discount > 0 && (
//            <span className="text-xs text-slate-600">
//              Save <span className="text-red-700 font-bold bg-red-100 px-1 rounded">{discount}%</span>
//            </span>
//          )}
        
//         {/* Delivery / Prime Mock */}
//         <div className="mt-1 text-xs text-slate-500">
//           <span className="text-slate-700 font-bold">FREE Delivery</span> by MRV
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  mrpPrice: number;
  images: string[];
  stockStatus: string;
}

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);
  const isOutOfStock = product.stockStatus === 'Out of Stock';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white border border-slate-100 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
    >
      <Link href={`/product/${product._id}`} className="absolute inset-0 z-30" aria-label="View Details" />
      
      {/* 1. Optimized Square Image Area */}
      <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.title}
          fill
          className="object-contain p-8 transition-transform duration-1000 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 20vw"
        />

        {/* Minimalist Visual Cues */}
        <div className="absolute top-3 right-3 z-40 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <div className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-900 border border-slate-100">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>

        {/* Discreet Status Tags */}
        <div className="absolute top-3 left-3 z-40 flex flex-col gap-1.5">
          {discount > 0 && !isOutOfStock && (
            <span className="bg-amber-400 text-[#131921] text-[9px] font-black px-2 py-0.5 rounded-sm tracking-tighter shadow-sm">
              {discount}% OFF
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-widest uppercase">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* 2. Professional Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-1 mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
            {product.title}
          </h3>
        </div>

        {/* 3. Pricing & Call to Action Row */}
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            {product.mrpPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through leading-none">
                ₹{product.mrpPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-lg font-black text-slate-950 leading-none mt-1.5">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            VIEW <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}