
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { MessageCircle, Info } from 'lucide-react';

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

//   const whatsappMessage = `Hi, I'm interested in this product:
// - Name: ${product.title}
// - Category: ${product.category}
// - Type: ${product.type}
// - Price: ₹${product.price}

// Please share more details.`;

//   const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

//   return (
//     <Card className="overflow-hidden h-full flex flex-col group border-slate-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-white">
//       <div className="relative aspect-square overflow-hidden bg-slate-100">
//         <Image
//           src={product.images[0] || '/placeholder.svg'}
//           alt={product.title}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         {discount > 0 && (
//           <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
//             {discount}% OFF
//           </Badge>
//         )}
//         {product.stockStatus === 'Out of Stock' && (
//            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//              <span className="text-white font-bold uppercase tracking-wider">Out of Stock</span>
//            </div>
//         )}
//       </div>
//       <CardHeader className="p-5 pb-0">
//         <div className="flex justify-between items-start mb-1">
//            <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-md font-medium text-xs tracking-wider uppercase">
//              {product.type}
//            </Badge>
//         </div>
//         <h3 className="font-heading font-bold text-lg leading-tight text-slate-800 group-hover:text-primary transition-colors">
//           {product.title}
//         </h3>
//       </CardHeader>
//       <CardContent className="p-5 pt-2 flex-grow">
//         {product.description && (
//           <p className="text-sm text-slate-500 line-clamp-2 mb-3 break-words font-light">
//             {product.description}
//           </p>
//         )}
//         <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-slate-100">
//           <span className="text-xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
//           {product.mrpPrice > product.price && (
//              <span className="text-sm text-slate-400 line-through">₹{product.mrpPrice.toLocaleString('en-IN')}</span>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="p-5 pt-0 gap-3">
//         <Link href={`/product/${product._id}`} className="flex-1">
//           <Button variant="outline" className="w-full gap-2 border-slate-300 hover:bg-slate-50 hover:text-primary transition-colors rounded-md">
//             <Info className="h-4 w-4" />
//             Details
//           </Button>
//         </Link>
//         <Link href={whatsappLink} target="_blank" className="flex-1">
//           <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all rounded-md">
//             <MessageCircle className="h-4 w-4" />
//             Inquiry
//           </Button>
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }



'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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
    <Link href={`/product/${product._id}`} className="block h-full">
      <Card className="h-full flex flex-col group border-slate-200 hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden cursor-pointer">
        
        {/* Image Section - Attached to Card Edges */}
        <div className="relative h-64 w-full bg-white">
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.title}
            fill
            // Added 'rounded-lg' here to round the actual image itself slightly
            className="object-contain transition-transform duration-500 group-hover:scale-105 rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Out of Stock Overlay */}
          {product.stockStatus === 'Out of Stock' && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-sm border-2 border-slate-500 px-3 py-1 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Text Details Section */}
        <CardContent className="p-4 flex flex-col items-center text-center flex-grow pt-2">
          
          {/* Title */}
          <h3 className="font-medium text-base text-slate-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Description / Subtitle */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-2 font-normal">
             {product.description ? `(${product.description.slice(0, 30)}...)` : `(${product.category})`}
          </p>

          {/* Pricing Row: Price | MRP | Discount */}
          <div className="mt-auto flex items-center justify-center gap-2">
            {/* Current Selling Price */}
            <span className="text-lg font-bold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {product.mrpPrice > product.price && (
              <>
                {/* MRP (Red Strikethrough) */}
                <span className="text-sm text-slate-400 line-through decoration-red-500 decoration-1 text-red-500">
                  ₹{product.mrpPrice.toLocaleString('en-IN')}
                </span>
                
                {/* Discount Percentage (Green) */}
                <span className="text-sm font-bold text-green-600">
                  {discount}% off
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}