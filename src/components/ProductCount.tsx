
import { getProducts } from "@/lib/data";

interface Props {
    searchParams: { category?: string; type?: string; search?: string; price_min?: string; price_max?: string };
}

export async function ProductCount({ searchParams }: Props) {
    const allProducts = await getProducts(searchParams);

    return (
        <div className="flex items-center gap-3">
            <div className="h-10 px-4 flex items-center bg-slate-100 rounded-xl text-xs font-bold text-slate-500">
                {allProducts.length} ITEMS FOUND
            </div>
        </div>
    );
}
