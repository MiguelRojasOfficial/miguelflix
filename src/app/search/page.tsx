import CatalogGrid from "@/components/CatalogGrid";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || "";

  const res = await fetch(`http://localhost:3000/api/catalog`);
  const allItems = await res.json();

  const filteredItems = allItems.filter((item: any) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="px-6 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Resultados para: "{query}"</h1>
      <CatalogGrid items={filteredItems} />
    </main>
  );
}
