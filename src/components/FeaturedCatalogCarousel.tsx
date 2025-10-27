"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { CatalogItem } from "@/lib/getCatalog";

type Props = {
  items: CatalogItem[];
};

export default function FeaturedCatalogCarousel({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full ml-2 disabled:opacity-30"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full mr-2 disabled:opacity-30"
      >
        <ChevronRight size={24} />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="min-w-[251px] max-w-[251px] bg-gray-900 rounded-lg overflow-hidden shadow-lg flex-shrink-0"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={250}
                height={375}
                className="object-bottom w-full h-84"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <Link href={`/content/${item.slug}`} passHref>
                  <Button size="sm" className="mt-3 w-full">
                    Ver ahora
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
