import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Game } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function GameSlider({ games }: { games: Game[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  if (!games || games.length === 0) return null;

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {games.map((game, index) => {
            const isNew = game.createdAt?.toDate && 
              (new Date().getTime() - game.createdAt.toDate().getTime()) < 4 * 24 * 60 * 60 * 1000;
            return (
            <div className="flex-[0_0_100%] min-w-0" key={game.id || index}>
              <div className="relative aspect-[1/1] sm:aspect-[4/3] md:aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[3/1] rounded-3xl overflow-hidden bg-gray-900 border border-purple-200 dark:border-purple-500/30 shadow-lg group">
                {game.imageUrl && (
                  <div className="absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-50" style={{ backgroundImage: `url(${game.imageUrl})` }}></div>
                )}
                {isNew && (
                  <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                    Yeni
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent dark:from-[#0F051D]/95 dark:via-[#0F051D]/80 dark:to-transparent"></div>
                
                <div className="relative h-full flex flex-col justify-end p-6 md:p-10 lg:p-16 space-y-3 md:space-y-4">
                  <div className="inline-flex self-start items-center space-x-2 bg-purple-600 dark:bg-purple-500 text-white text-[10px] md:text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-sm">
                    <span className="animate-pulse">●</span> En Popüler
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl text-white drop-shadow-lg line-clamp-3 md:line-clamp-2">
                    {game.title}
                  </h2>
                  <p className="text-gray-200 dark:text-purple-100 text-sm md:text-base lg:text-lg max-w-3xl line-clamp-2 drop-shadow-md font-medium">
                    {game.description}
                  </p>
                  <div className="flex space-x-4 items-center pt-2">
                    <Link to={`/post/${game.id}`}>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2.5 md:py-3 text-sm md:text-base bg-purple-600 hover:bg-purple-500 transition-colors text-white font-bold rounded-xl shadow-lg"
                      >
                        Haberi Oku
                      </motion.button>
                    </Link>
                    <div className="hidden md:flex items-center space-x-2 px-2 z-20">
                      {scrollSnaps.map((_, snapIndex) => (
                        <button
                          key={snapIndex}
                          onClick={() => emblaApi?.scrollTo(snapIndex)}
                          className={`rounded-full transition-all duration-300 ${
                            snapIndex === selectedIndex 
                              ? "w-8 h-2.5 bg-purple-500" 
                              : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                          }`}
                          aria-label={`Slayt ${snapIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={scrollPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 ${!canScrollPrev && 'hidden'}`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 ${!canScrollNext && 'hidden'}`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
