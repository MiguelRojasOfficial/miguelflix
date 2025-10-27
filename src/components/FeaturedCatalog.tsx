import FeaturedCatalogCarousel from "./FeaturedCatalogCarousel"

type Item = {
  id: string
  title: string
  image: string
}

type Props = {
  items: Item[]
}

export default function FeaturedCatalog({ items }: Props) {
  return <FeaturedCatalogCarousel items={items} />
}