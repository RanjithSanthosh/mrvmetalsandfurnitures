
// import { Navbar } from '@/components/Navbar';
// import { getCategories, getProducts } from '@/lib/data';
// import { ProductCard } from '@/components/ProductCard';
// import Link from 'next/link';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { ChevronRight } from 'lucide-react';

// // export const dynamic = 'force-dynamic';

// interface Props {
//   searchParams: Promise<{ category?: string; type?: string; search?: string; price_min?: string; price_max?: string }>;
// }

// export default async function Home(props: Props) {
//   const searchParams = await props.searchParams;
//   const categories = await getCategories();
//   const allProducts = await getProducts(searchParams);

//   // Group products for Home View
//   const newArrivals = [...allProducts].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
//   const bestSellers = [...allProducts].slice(0, 8); // Mocking best sellers as just first 8

//   const isFiltered = searchParams.category || searchParams.type || searchParams.search;

//   return (
//     <div className="min-h-screen bg-[#E3E6E6] font-sans flex flex-col">
//       <Navbar categories={categories} />

//       {/* Main Content Info */}
//       <div className="flex-1 max-w-[1500px] mx-auto w-full pb-12">

//         {/* Hero Section - Only show if no search/filter to keep it clean, or always show? User said "just display all products". I'll keep Hero on main page only. */}
//         {!isFiltered && (
//           <>
//             <div className="relative w-full h-[250px] md:h-[400px] bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden">
//               <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
//               <div className="container h-full flex items-center relative z-10 px-4 md:px-12">
//                 <div className="max-w-xl space-y-4 text-white p-6 md:p-0">
//                   <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 shadow-black drop-shadow-lg">
//                     Premium Industrial <br /> <span className="text-[#FFD814]">Furnitures & Steels</span>
//                   </h1>
//                   <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md">
//                     Equip your workspace with heavy-duty durability and modern aesthetics.
//                   </p>
//                   <Link href="/?category=Furniture">
//                     <Button size="lg" className="bg-[#FFD814] hover:bg-[#F7CA00] text-black border-none font-bold text-base px-8 h-12 rounded-sm">
//                       Shop Now
//                     </Button>
//                   </Link>
//                 </div>
//                 {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#E3E6E6] to-transparent"></div> */}
//               </div>
//             </div>

//             <div className="px-4 md:px-6 py-8 relative z-20">
//               {/* Detailed Category Cards - Circular Design */}
//               <div className="flex flex-wrap justify-start gap-4 md:gap-8">
//                 {categories.slice(0, 8).map((cat: any) => (
//                   <Link key={cat._id} href={`/?category=${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-2 group cursor-pointer max-w-[100px]">
//                     <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-white border border-gray-200 group-hover:border-[#FFD814] transition-all duration-300">
//                       {cat.image ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img src={cat.image} alt={cat.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
//                       ) : (
//                         <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-400 font-bold text-lg uppercase tracking-widest">
//                           {cat.name.substring(0, 2)}
//                         </div>
//                       )}
//                     </div>
//                     <h3 className="font-medium text-slate-900 text-center text-xs md:text-sm group-hover:text-[#C7511F] transition-colors leading-tight">{cat.name}</h3>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}

//         {/* All Products Grid */}
//         <div className="px-4 md:px-6">
//           <div className="flex items-center justify-between mb-4 bg-white p-3 shadow-sm border border-gray-200 mt-4">
//             <h1 className="text-lg font-bold text-slate-900">
//               {searchParams.search ? `Results for "${searchParams.search}"` : (searchParams.category ? `${searchParams.category}` : "All Products")}
//             </h1>
//             <span className="text-sm text-slate-500">{allProducts.length} results</span>
//           </div>

//           {allProducts.length === 0 ? (
//             <div className="p-12 text-center bg-white border border-gray-200">
//               <h3 className="text-xl font-medium text-slate-900">No results found.</h3>
//               <p className="text-slate-500">Try checking your spelling or use more general terms.</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {allProducts.map((product: any) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>


//       {/* Footer */}
//       <footer className="bg-[#232f3e] text-white mt-auto">
//         <a href="#" className="block py-4 bg-[#37475a] text-center text-sm font-medium hover:bg-[#485769] transition-colors">
//           Back to top
//         </a>
//         <div className="container py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
//           <div className="space-y-3">
//             <h4 className="font-bold text-base text-white">Get to Know Us</h4>
//             <ul className="space-y-2 text-gray-300">
//               <li><a href="#" className="hover:underline">About Us</a></li>
//               <li><a href="#" className="hover:underline">Careers</a></li>
//               <li><a href="#" className="hover:underline">Press Releases</a></li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h4 className="font-bold text-base text-white">Connect with Us</h4>
//             <ul className="space-y-2 text-gray-300">
//               <li><a href="#" className="hover:underline">Facebook</a></li>
//               <li><a href="#" className="hover:underline">Twitter</a></li>
//               <li><a href="#" className="hover:underline">Instagram</a></li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h4 className="font-bold text-base text-white">Make Money with Us</h4>
//             <ul className="space-y-2 text-gray-300">
//               <li><a href="/admin/login" className="hover:underline">Admin Login</a></li>
//               <li><a href="#" className="hover:underline">Sell on MRV</a></li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h4 className="font-bold text-base text-white">Let Us Help You</h4>
//             <ul className="space-y-2 text-gray-300">
//               <li><a href="#" className="hover:underline">Your Account</a></li>
//               <li><a href="#" className="hover:underline">Returns Centre</a></li>
//               <li><a href="#" className="hover:underline">Help</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-gray-700 py-8 text-center text-xs text-gray-400">
//           <p className="mb-2">© {new Date().getFullYear()} MRV Group of Technologies. All rights reserved.</p>
//           <p>Conditions of Use & Sale &nbsp; Privacy Notice &nbsp; Interest-Based Ads</p>
//         </div>
//       </footer>
//     </div>
//   );
// }



import { Navbar } from '@/components/Navbar';
import { getCategories, getProducts } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowUp } from 'lucide-react';

interface Props {
  searchParams: Promise<{ category?: string; type?: string; search?: string; price_min?: string; price_max?: string }>;
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const categories = await getCategories();
  const allProducts = await getProducts(searchParams);

  const isFiltered = searchParams.category || searchParams.type || searchParams.search;

  return (
    <div className="min-h-screen bg-[#F4F7F7] font-sans flex flex-col selection:bg-amber-100">
      <Navbar categories={categories} />

      <div className="flex-1 max-w-[1500px] mx-auto w-full pb-16">
        {!isFiltered && (
          <>
            {/* Hero Section - Refined with Glassmorphism and Depth */}
            {/* <div className="relative w-full h-[300px] md:h-[450px] bg-[#131921] overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 transition-opacity group-hover:opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-0" />
              
              <div className="container h-full flex items-center relative z-10 px-6 md:px-16">
                <div className="max-w-2xl space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                      Premium Industrial <br /> 
                      <span className="text-amber-400 drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                        Furnitures & Steels
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium max-w-lg">
                      Equip your workspace with heavy-duty durability and modern architectural aesthetics.
                    </p>
                  </div>
                  <Link href="/?category=Furniture">
                    <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-slate-950 border-none font-bold text-base px-10 h-14 rounded-md shadow-xl transition-all active:scale-95">
                      Shop Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div> */}

            {/* Circular Categories - Refined with better shadows and spacing */}
            <div className="px-4 py-6 relative z-20">
              <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10">
                {categories.slice(0, 8).map((cat: any) => (
                  <Link key={cat._id} href={`/?category=${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-3 group max-w-[110px]">
                    <div className="relative w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden bg-white shadow-md border border-slate-100 group-hover:border-amber-400 group-hover:shadow-xl group-hover:shadow-amber-400/10 transition-all duration-500">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-400 font-bold text-sm uppercase tracking-tighter">
                          {cat.name.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-700 text-center text-[11px] md:text-xs uppercase tracking-widest group-hover:text-amber-600 transition-colors">
                      {cat.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Product Grid Section - Clean & High Contrast */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-8 bg-white p-5 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 mt-6">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              {searchParams.search ? `Search: ${searchParams.search}` : (searchParams.category ? searchParams.category : "Current Inventory")}
            </h2>
            <div className="flex items-center gap-2">
               <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{allProducts.length} results</span>
            </div>
          </div>

          {allProducts.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No items found</h3>
              <p className="text-slate-500 italic">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {allProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer - High-End Dark Aesthetic */}
      <footer className="bg-[#0F172A] text-white mt-auto border-t border-white/5">
        <a href="#" className="flex items-center justify-center gap-2 py-4 bg-slate-800/50 hover:bg-slate-800 transition-colors text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Back to top <ArrowUp className="h-3 w-3" />
        </a>
        <div className="container py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          {["Get to Know Us", "Connect with Us", "Make Money", "Let Us Help"].map((title, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-white border-b border-amber-400/30 pb-2 inline-block">
                {title}
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Information Link 1</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Information Link 2</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Information Link 3</Link></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-slate-950 py-10 text-center px-6">
          <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest mb-3">
            © {new Date().getFullYear()} MRV Group of Technologies. Precision Engineered.
          </p>
          <div className="flex justify-center gap-6 text-[10px] text-slate-600 font-bold uppercase">
             <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
             <span className="hover:text-slate-400 cursor-pointer">Terms</span>
             <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </footer>
    </div>
  );
}