import FeaturedCatalogCarousel from "./FeaturedCatalogCarousel"
import type { CatalogItem } from "@/lib/getCatalog"

type Props = {
  title: string
  items: CatalogItem[]
}

export default function GenreSlider({ title, items }: Props) {
  if (items.length === 0) return null

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      <FeaturedCatalogCarousel items={items} />
    </section>
  )
}