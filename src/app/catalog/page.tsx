import { getCatalog } from "@/lib/getCatalog";
import CatalogGrid from "@/components/CatalogGrid";

export default async function CatalogPage() {
  const allItems = await getCatalog();

  return (
    <main className="px-6 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Todo para ver</h1>
      <CatalogGrid items={allItems} />
    </main>
  );
}
