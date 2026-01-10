import { Navbar } from '@/components/Navbar';
import { getCategories, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowUp, Sparkles, SlidersHorizontal, ArrowRight, Package2 } from 'lucide-react';
import { Footer } from '@/components/Footer';

interface Props {
  searchParams: Promise<{ category?: string; type?: string; search?: string; price_min?: string; price_max?: string }>;
}

export default async function Home(props: Props) {
  // Await the searchParams as required in Next.js 15/16
  const searchParams = await props.searchParams;

  // These calls now run safely on the Server
  const categories = await getCategories();
  const allProducts = await getProducts(searchParams);

  const isFiltered = !!(searchParams.category || searchParams.type || searchParams.search);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-amber-100">
      <Navbar categories={categories} />

      <main className="max-w-[1600px] mx-auto pb-24">
        {/* HERO SECTION */}
        {/* {!isFiltered && (
          <section className="px-6 pt-12 pb-6">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0F172A] p-8 md:p-16 text-white shadow-2xl">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                  <Sparkles className="h-3 w-3" /> New Season Collection
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
                  MRV Group <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Steel & Furniture.
                  </span>
                </h1>
                <p className="text-slate-400 text-lg mb-8 max-w-md">
                  Premium industrial solutions engineered for modern living.
                </p>
                <button className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:bg-amber-500 transition-all flex items-center gap-2 group">
                  Explore Inventory <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />
            </div>
          </section>
        )} */}

        {/* PRODUCT GRID */}
        <section className="px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {searchParams.search ? `Results for "${searchParams.search}"` : (searchParams.category || "Current Inventory")}
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-10 px-4 flex items-center bg-slate-100 rounded-xl text-xs font-bold text-slate-500">
                {allProducts.length} ITEMS FOUND
              </div>
            </div>
          </div>

          {allProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
              {allProducts.map((product: any) => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Package2 className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Products Found</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                We currently don't have any items in this specific category or matching your search.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all transform hover:scale-105 shadow-lg"
              >
                View All Inventory
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}