'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export function ProductCard({ product }: { product: any }) {
  const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);
  const isOutOfStock = product.stockStatus === 'Out of Stock';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-xl"
    >
      {/* Top Section: Image & Badges */}
      <div className="relative aspect-[4/3] w-full bg-[#f8f8f8] overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Brand-consistent Discount Badge */}
        {discount > 0 && !isOutOfStock && (
          <div className="absolute top-3 left-3 bg-amber-500 text-black text-[11px] font-black px-2 py-1 rounded shadow-sm">
            {discount}% OFF
          </div>
        )}

        {/* Improved Archive Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white/90 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-lg border-t-2 border-amber-500">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Bottom Section: Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">
            {product.category}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors mb-3">
          {product.title}
        </h3>

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between">
          <div className="space-y-0.5">
            {product.mrpPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.mrpPrice.toLocaleString('en-IN')}
              </span>
            )}
            <div className="text-lg font-black text-slate-900 leading-none">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>

          {isOutOfStock ? (
            <button disabled className="text-[10px] font-bold text-slate-400 uppercase">Unavailable</button>
          ) : (
            <Link
              href={`/product/${product._id}`}
              className="relative z-20 flex items-center gap-1 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-amber-500 hover:text-black transition-colors"
            >
              Buy Now <ShoppingCart className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}