import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export type CatalogItem = {
  id: string;
  title: string;
  image: string;
  slug: string;
  synopsis: string;
  genre?: string;
  rating?: string;
  releaseDate?: Date | null;
  duration?: string;
  director?: string;
  writer?: string;
  cast?: string[];
  episodes?: {
    sys: { id: string };
    episodeNumber: number;
    title: string;
    synopsis: string;
    duration: string;
    image: { url: string };
  }[];
  trailerVideoUrl?: string;
  availableResolutions?: string[];
  availableLanguages?: string[];
  subtitles?: string[];
  audioFormat?: string;
};

export async function getCatalog(): Promise<CatalogItem[]> {
  const res = await client.getEntries({
    content_type: "catalog",
    include: 10,
  });

  const assets = res.includes?.Asset ?? [];

  return res.items.map((item: any) => {
    const link = item.fields.trailerVideo;
    let trailerUrl: string | null = null;

    if (link && link.sys && assets.length) {
      const asset = assets.find((a: any) => a.sys.id === link.sys.id);
      if (asset && asset.fields?.file?.url) {
        trailerUrl = "https:" + asset.fields.file.url;
      }
    }

    return {
      id: item.sys.id,
      title: item.fields.title,
      image: "https:" + item.fields.image.fields.file.url,
      slug: item.fields.slug || "",
      synopsis: item.fields.synopsis,
      genre: item.fields.genre || null,
      rating: item.fields.rating || null,
      releaseDate: item.fields.releaseDate ? new Date(item.fields.releaseDate) : null,
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
      })) || [],
      trailerVideoUrl: trailerUrl,
      availableResolutions: item.fields.availableResolutions || [],
      availableLanguages: item.fields.availableLanguages || [],
      subtitles: item.fields.subtitles || [],
      audioFormat: item.fields.audioFormat || null,
    };
  });
}
