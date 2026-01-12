
import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Package2 } from "lucide-react";
import Link from "next/link";

interface ProductGridProps {
    searchParams: { category?: string; type?: string; search?: string; price_min?: string; price_max?: string };
}

export async function ProductGrid({ searchParams }: ProductGridProps) {
    // Artificial delay to test skeleton (remove in production if needed, or keep low)
    // await new Promise(resolve => setTimeout(resolve, 1000)); 

    const allProducts = await getProducts(searchParams);

    if (allProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center col-span-full">
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
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {allProducts.map((product: any) => (
                <ProductCard key={product._id.toString()} product={product} />
            ))}
        </div>
    );
}
