"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CatalogItem } from "@/lib/getCatalog";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type Props = {
  items: CatalogItem[];
};

export default function CatalogGrid({ items }: Props) {
  const [filter, setFilter] = useState("Todos");

  const genres = Array.from(new Set(items.map((item) => item.genre)));

  const filteredItems =
    filter === "Todos" ? items : items.filter((item) => item.genre === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          variant={filter === "Todos" ? "default" : "outline"}
          onClick={() => setFilter("Todos")}
          aria-current={filter === "Todos" ? "true" : "false"}
        >
          Todos
        </Button>
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={filter === genre ? "default" : "outline"}
            onClick={() => setFilter(genre)}
            aria-current={filter === genre ? "true" : "false"}
          >
            {genre}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-w-[1600px] mx-auto">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
              tabIndex={0}
              aria-label={`Ver detalles de ${item.title}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={750}
                className="w-full aspect-[2/3]"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                loading="lazy"
              />
              <div className="p-3">
                <h3
                  className="text-base font-semibold truncate"
                  title={item.title}
                >
                  {item.title}
                </h3>
                <Link href={`/content/${item.slug}`} aria-label={`Ver ahora ${item.title}`}>
                  <Button size="sm" className="mt-2 w-full">
                    Ver ahora
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
