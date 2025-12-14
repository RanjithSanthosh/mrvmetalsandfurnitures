"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    // Update state when carousel slides
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx}>
              <div className="p-1">
                <Card className="border-0 shadow-none">
                  <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden rounded-xl bg-white border border-slate-100">
                    <Image
                      src={img}
                      alt={`${title} view ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                      priority={idx === 0}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white backdrop-blur-sm" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white backdrop-blur-sm" />
          </>
        )}
      </Carousel>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
                current === idx
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt="Thumbnail"
                fill
                className="object-cover bg-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}