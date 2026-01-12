import { Skeleton } from "@/components/ui/skeleton"

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-8 w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}
