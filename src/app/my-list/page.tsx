"use client";

import { useEffect, useState } from "react";
import { useMyList } from "@/context/MyListContext";
import { CatalogItem } from "@/types";
import { Play, CheckCircle } from "lucide-react";

export default function MyListPage() {
  const { myList, isInList, toggleItem } = useMyList();
  const [allItems, setAllItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/catalog");
    const data = await res.json();
    setAllItems(data);
    setLoading(false);
  }
  fetchData();
}, []);

  const myListItems = allItems.filter(item => myList.includes(item.id));

  if (loading) {
    return <p className="p-8">Cargando tu lista...</p>;
  }

  return (
    <main className="bg-zinc-900 text-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto py-5">
        <h1 className="text-4xl font-bold py-5 mb-8">Mi Lista</h1>

        {myListItems.length === 0 ? (
          <p className="text-gray-400 text-lg">Tu lista está vacía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myListItems.map((item) => {
              const added = isInList(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-zinc-800 rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl flex flex-col items-center text-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 rounded-md mb-4"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {new Date(item.releaseDate).getFullYear()} · {item.genre}
                  </p>

                  <div className="flex items-center gap-4 mb-5">
                    <a href={`/content/${item.slug}`}>
                      <button
                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Play fill="white" size={17} />
                        Reproducir
                      </button>
                    </a>
  
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`inline-flex items-center justify-center gap-2 border font-bold px-3 py-2 rounded-full transition-colors duration-300 ${
                        added
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-gray-500 hover:bg-gray-700 text-white"
                      }`}
                    >
                      {added ? (
                        <>
                          <CheckCircle size={20} />
                          <span>En Mi Lista</span>
                        </>
                      ) : (
                        <>
                          <span>Mi Lista</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
