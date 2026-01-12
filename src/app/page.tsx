
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { getCategories } from '@/lib/data';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductCount } from '@/components/ProductCount';
import { ProductGridSkeleton } from '@/components/ProductGridSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/Footer';

interface Props {
  searchParams: Promise<{ category?: string; type?: string; search?: string; price_min?: string; price_max?: string }>;
}

export default async function Home(props: Props) {
  // Await the searchParams as required in Next.js 15/16
  const searchParams = await props.searchParams;

  // We pass the promise directly to the Navbar so it doesn't block the page shell.
  const categoriesPromise = getCategories();

  // Determine the title based on params (sync operation)
  const title = searchParams.search
    ? `Results for "${searchParams.search}"`
    : (searchParams.category || "Current Inventory");

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-amber-100">
      <Navbar categoriesPromise={categoriesPromise} />

      <main className="max-w-[1600px] mx-auto pb-24">
        {/* HERO SECTION DELETED/HIDDEN AS PER USER REQUEST FOR SPEED (OR JUST KEPT SIMPLE) */}
        {/* We can re-enable hero if needed, but for now we focus on products */}

        <section className="px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {title}
            </h2>
            <Suspense fallback={<Skeleton className="h-10 w-32 rounded-xl" />}>
              <ProductCount searchParams={searchParams} />
            </Suspense>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid searchParams={searchParams} />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}