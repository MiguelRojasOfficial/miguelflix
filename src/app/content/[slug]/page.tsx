import ContentDetail from "@/app/content/[slug]/ContentDetail";
import { getCatalog, client } from "@/lib/getCatalog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const res = await client.getEntries({
    content_type: "catalog",
    "fields.slug": slug,
    include: 2,
  });

  const item = res.items.length > 0 ? res.items[0] : null;

  if (!item) return notFound();

  const contentItem = {
    id: item.sys.id,
    title: item.fields.title,
    image: "https:" + item.fields.image.fields.file.url,
    genre: item.fields.genre || null,
    releaseDate: item.fields.releaseDate ? new Date(item.fields.releaseDate) : null,
    slug: item.fields.slug || "",
    synopsis: item.fields.synopsis,
    rating: item.fields.rating || null,
    duration: item.fields.duration || null,
    director: item.fields.director || null,
    cast: item.fields.cast || null,
    episodes: item.fields.episodes?.map((episode: any) => ({
      sys: episode.sys,
      episodeNumber: episode.fields.episodeNumber,
      title: episode.fields.episodeTitle,
      synopsis: episode.fields.synopsis,
      duration: episode.fields.duration,
      image: { url: "https:" + episode.fields.image.fields.file.url },
    })) || null,
    trailerVideoUrl: item.fields.trailerVideo?.fields?.file?.url
      ? "https:" + item.fields.trailerVideo.fields.file.url
      : null,
    availableResolutions: item.fields.availableResolutions || [],
    availableLanguages: item.fields.availableLanguages || [],
    subtitles: item.fields.subtitles || [],
    audioFormat: item.fields.audioFormat || null,
  };

  const allItems = await getCatalog();
  const relatedItems = allItems.filter(
    (relatedItem) =>
      relatedItem.genre === contentItem.genre && relatedItem.slug !== contentItem.slug
  );

  return <ContentDetail item={contentItem} relatedItems={relatedItems} />;
}
