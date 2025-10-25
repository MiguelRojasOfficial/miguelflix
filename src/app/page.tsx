import Hero from "@/components/Hero"
import FeaturedCatalog from "@/components/FeaturedCatalog"
import FeaturedCatalogCarousel from "@/components/FeaturedCatalogCarousel"
import GenreSlider from "@/components/GenreSlider"
import { getCatalog } from "@/lib/getCatalog"
import CallToAction from "@/components/CallToAction"

export default async function Page() {
  const allItems = await getCatalog();
  const today = new Date();
  const upcomingItems = allItems
    .filter(item => item.releaseDate && item.releaseDate > today)
    .sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());

  const popularItems = allItems
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  const sortedByDate = allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestItems = sortedByDate.slice(0, 5);
  const genres = ["Drama", "Comedy", "Action", "Animation"];

  return (
    <main>
      <Hero />
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Catálogo Destacado</h2>
        <FeaturedCatalog items={allItems.slice(0, 10)} />
      </section>

      {genres.map((genre) => {
        const genreItems = allItems.filter((item) => item.genre === genre);
        return <GenreSlider key={genre} title={genre} items={genreItems} />;
      })}

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Últimos Lanzamientos</h2>
        <FeaturedCatalog items={latestItems} />
      </section>
      
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Más Vistos</h2>
        <FeaturedCatalog items={popularItems} />
      </section>

      {upcomingItems.length > 0 && (
        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold mb-8">Próximos Lanzamientos</h2>
          <FeaturedCatalogCarousel items={upcomingItems} />
        </section>
      )}

      <CallToAction />
    </main>
  )
}
