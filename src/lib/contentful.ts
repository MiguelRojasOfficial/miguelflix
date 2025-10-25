import { createClient } from "contentful";
import { CatalogItem } from "@/types";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getAllContentItems(): Promise<CatalogItem[]> {
  const response = await client.getEntries({
    content_type: "catalog",
  });

  return response.items.map((item) => {
    const fields: any = item.fields;

    return {
      id: item.sys.id,
      slug: fields.slug || "",
      title: fields.title,
      image: fields.image ? "https:" + fields.image.fields.file.url : "",
      releaseDate: fields.releaseDate ? new Date(fields.releaseDate) : null,
      genre: fields.genre || null,
      synopsis: fields.synopsis || null,
      duration: fields.duration || null,
      rating: fields.rating || null,
      director: fields.director || null,
      cast: fields.cast || null,
    } as CatalogItem;
  });
}
