"use client";

import { Play, CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useMyList } from "@/context/MyListContext";

interface CatalogItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  releaseDate?: Date;
  genre?: string;
  rating?: string;
  duration?: string;
  synopsis?: string;
  director?: string;
  writer?: string;
  cast?: string[];
  episodes?: { sys: { id: string }, title: string, image: { url: string }, episodeNumber: number, synopsis: string, duration: string }[];
  trailerVideoUrl?: string;
  availableResolutions?: string[];
  availableLanguages?: string[];
  subtitles?: string[];
  audioFormat?: string;
}

interface ContentDetailProps {
  item: CatalogItem;
  relatedItems: CatalogItem[];
}

function FullscreenVideo({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-50  pointer-events-auto"
      >
        <X size={24} />
      </button>
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full object-contain z-40 pointer-events-auto"
      ></video>
    </div>
  );
}

export default function ContentDetail({ item, relatedItems }: ContentDetailProps) {
  if (!item) return null;

  const isSeries = !!item.episodes && item.episodes.length > 0;
  const [watchedEpisodes, setWatchedEpisodes] = useState({});
  const [playMessage, setPlayMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isInList, toggleItem } = useMyList();

  useEffect(() => {
    try {
      const storedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes') || '{}');
      setWatchedEpisodes(storedEpisodes);
    } catch (error) {
      console.error("Error al cargar datos de localStorage:", error);
    }
  }, [item.id]);

  const handlePlay = () => {
    if (item.trailerVideoUrl) {
      setIsFullscreen(true);
    } else {
      setPlayMessage("No hay tráiler disponible");
      setTimeout(() => setPlayMessage(""), 2000);
    }
  };

  const handlePlayEpisode = (episode) => {
    try {
      const currentProgress = watchedEpisodes[episode.sys.id] || 0;
      if (currentProgress === 100) return;
      const newProgress = Math.min(currentProgress + 20, 100);
      const newWatchedState = { ...watchedEpisodes, [episode.sys.id]: newProgress };
      setWatchedEpisodes(newWatchedState);
      localStorage.setItem('watchedEpisodes', JSON.stringify(newWatchedState));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  };

  const handleToggleMyList = () => {
    toggleItem(item.id);
  };

  const getWatchedProgress = (episodeId) => {
    return watchedEpisodes[episodeId] || 0;
  };

  const isAddedToList = isInList(item.id);

  return (
    <main className="bg-zinc-900 text-zinc-50 min-h-screen py-12 px-6 lg:py-24 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
          <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center md:justify-start">
              <div className="mb-6 w-full aspect-[2/3] rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 text-white">{item.title}</h1>
            <p className="text-lg text-gray-400 mb-6 font-medium">({item.releaseDate?.getFullYear()})</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-gray-300">
              {item.genre && <span className="text-sm font-semibold text-red-500">{item.genre}</span>}
              {item.rating && <span className="px-2 py-1 bg-red-600 text-xs font-bold rounded-full">{item.rating}</span>}
              {!isSeries && item.duration && <span className="text-sm">{item.duration}</span>}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={handlePlay}
              >
                <Play fill="white" size={20} />
                {playMessage || "Reproducir"}
              </button>
              <button 
                className={`border font-semibold py-3 px-8 rounded-full transition-colors duration-300 ${isAddedToList ? 'border-red-600 bg-red-600 text-white' : 'border-gray-500 hover:bg-gray-700 text-white'}`}
                onClick={handleToggleMyList}
              >
                {isAddedToList ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>En Mi Lista</span>
                  </div>
                ) : (
                  '+ Mi Lista'
                )}
              </button>
            </div>

            {item.synopsis && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2 text-white">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed">{item.synopsis}</p>
              </div>
            )}

            <div className="border-t border-gray-700 mb-4 mt-8 pt-6">
              <h3 className="text-xl font-bold text-white mb-3">Información técnica:</h3>
              <ul className="text-gray-300">
                {item.availableResolutions?.length > 0 && (
                  <li><strong>Resolución:</strong> {item.availableResolutions.join(", ")}</li>
                )}
                {item.availableLanguages?.length > 0 && (
                  <li><strong>Idiomas disponibles:</strong> {item.availableLanguages.join(", ")}</li>
                )}
                {item.subtitles?.length > 0 && (
                  <li><strong>Subtítulos:</strong> {item.subtitles.join(", ")}</li>
                )}
                {item.audioFormat && (
                  <li><strong>Formato de audio:</strong> {item.audioFormat}</li>
                )}
              </ul>
            </div>

            {!isSeries && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.director && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Director:</h3>
                    <p className="text-gray-300">{item.director}</p>
                  </div>
                )}
                {item.writer && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Guionista:</h3>
                    <p className="text-gray-300">{item.writer}</p>
                  </div>
                )}
                {item.cast && item.cast.length > 0 && (
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-3">Reparto Principal:</h3>
                    <p className="text-gray-300">{item.cast.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSeries && (
        <section className="w-full max-w-7xl mx-auto mt-16 px-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Episodios</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {item.episodes.map((episode) => {
              const progress = getWatchedProgress(episode.sys.id);
              const isWatched = progress === 100;

              return (
                <div
                  key={episode.sys.id}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-xl cursor-pointer hover:-translate-y-2"
                  onClick={() => handlePlayEpisode(episode)}
                >
                  <div className="relative w-full h-36 md:h-40 lg:h-44 overflow-hidden">
                    {episode.image && (
                      <img
                        src={episode.image.url}
                        alt={episode.title}
                        className="absolute inset-0 object-cover w-full h-full transition-all duration-500 group-hover:scale-[1.15] group-hover:opacity-75"
                      />
                    )}
                    {isWatched ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                        <CheckCircle className="text-white h-12 w-12" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                        <Play className="text-white h-10 w-10 md:h-12 md:w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100" fill="white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 w-full h-1 bg-gray-600">
                      <div
                        className="bg-red-600 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <span className="text-xs font-medium text-gray-400 block mb-1">E{episode.episodeNumber}</span>
                    <h4 className="text-base md:text-lg font-bold text-white line-clamp-2 mb-1">{episode.title}</h4>
                    <p className="text-xs text-gray-300 line-clamp-2 mb-2">{episode.synopsis}</p>
                    <span className="text-gray-500 text-xs">{episode.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {relatedItems.length > 0 && (
        <section className="w-full max-w-7xl mx-auto mt-16 px-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Más títulos como este:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedItems.map((relatedItem) => (
              <div key={relatedItem.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
                <img
                  src={relatedItem.image}
                  alt={relatedItem.title}
                  width={400}
                  height={600}
                  className="object-bottom w-full h-72"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white line-clamp-2 md:line-clamp-none md:h-auto h-[3.5rem] overflow-hidden">{relatedItem.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{relatedItem.releaseDate?.getFullYear()}</p>
                  <a href={`/content/${relatedItem.slug}`}>
                    <button size="sm" className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                      Ver ahora
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {isFullscreen && item.trailerVideoUrl && (
        <FullscreenVideo
          videoUrl={item.trailerVideoUrl}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </main>
  );
}