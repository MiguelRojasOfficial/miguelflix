import { client } from "./contentful"

export async function getFeaturedCatalog() {
  const res = await client.getEntries({ content_type: "catalog" })

  return res.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    image: "https:" + item.fields.image.fields.file.url,
  }))
}
