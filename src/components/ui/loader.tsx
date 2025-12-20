
import { Loader2, Hammer, Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#F2F4F8] z-[9999] flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-[#131921] rounded-full animate-[spin_3s_linear_infinite] border-t-transparent border-l-transparent opacity-20"></div>
        <div className="absolute inset-0 border-4 border-[#FFD814] rounded-full animate-[spin_2s_linear_infinite] border-b-transparent border-r-transparent"></div>

        {/* Inner Icons Queue */}
        <div className="relative z-10 flex flex-col items-center gap-1 animate-pulse">
          <div className="flex gap-2 text-[#131921]">
            <Hammer className="w-8 h-8 fill-current" />
            <Armchair className="w-8 h-8 fill-current" />
          </div>
          <span className="font-black text-3xl tracking-tighter text-[#131921]">MRV</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-[#131921] font-bold text-sm tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">Furnitures & Steels</p>
        <div className="h-1 w-12 bg-[#FFD814] rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>
  );
}
