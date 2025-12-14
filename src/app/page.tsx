
import { Navbar } from '@/components/Navbar';
import { getCategories, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ category?: string; type?: string }>;
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const categories = await getCategories();
  const products = await getProducts(searchParams);

  const currentCategory = categories.find((c: any) => c.name === searchParams.category);
  const types = currentCategory ? currentCategory.types : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      {/* Catalog Section */}
      <section id="catalog" className="py-16 md:py-24 container px-4 md:px-6 flex-1 max-w-7xl mx-auto">
        <div className="flex flex-col gap-10">
          
          <div className="text-center space-y-2 mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Products</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Browse through our categorized selection of premium metals and furniture.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-col gap-6 items-center">
             <div className="flex flex-wrap gap-2 justify-center p-1 bg-slate-100/80 rounded-full border border-slate-200 backdrop-blur-sm sticky top-20 z-40 shadow-sm">
               <Link href="/" scroll={false}>
                 <Button 
                   variant="ghost"
                   className={cn(
                       "rounded-full px-6 transition-all",
                       !searchParams.category ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                   )}
                 >
                   All Items
                 </Button>
               </Link>
               {categories.map((cat: any) => (
                 <Link key={cat._id} href={`/?category=${encodeURIComponent(cat.name)}`} scroll={false}>
                   <Button 
                     variant="ghost"
                     className={cn(
                        "rounded-full px-6 transition-all",
                        searchParams.category === cat.name ? "bg-white text-slate-900 shadow-sm font-semibold" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                     )}
                   >
                     {cat.name}
                   </Button>
                 </Link>
               ))}
             </div>

             {/* Type Pills */}
             {searchParams.category && types.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center animate-in fade-in slide-in-from-top-2">
                  <Link href={`/?category=${encodeURIComponent(searchParams.category)}`} scroll={false}>
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-sm border cursor-pointer transition-all hover:scale-105",
                      !searchParams.type 
                        ? "bg-slate-800 border-slate-800 text-white font-medium shadow-md"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    )}>
                      View All {searchParams.category}
                    </span>
                  </Link>
                  {types.map((type: string) => (
                    <Link key={type} href={`/?category=${encodeURIComponent(searchParams.category!)}&type=${encodeURIComponent(type)}`} scroll={false}>
                       <span className={cn(
                        "px-4 py-1.5 rounded-full text-sm border cursor-pointer transition-all hover:scale-105",
                        searchParams.type === type
                          ? "bg-slate-800 border-slate-800 text-white font-medium shadow-md"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                      )}>
                        {type}
                      </span>
                    </Link>
                  ))}
                </div>
             )}
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-xl text-slate-400 font-medium">No products found in this category.</p>
              <Button asChild variant="link" className="mt-2 text-primary">
                 <Link href="/" scroll={false}>Clear Filters</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product: any, idx: number) => (
                <div key={product._id} className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container px-4 text-center">
          <p>© {new Date().getFullYear()} MRV Group of Technologies. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4 text-sm">
             <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
