import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '../types';

export function ProductSlider({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    if (!emblaApi) return;
    
    // Auto-scroll every 5 seconds if there is more than 1 product
    let intervalId: NodeJS.Timeout;
    if (products.length > 1) {
      intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [emblaApi, products.length]);

  if (!products || products.length === 0) return null;

  return (
    <div className="overflow-hidden h-full rounded-2xl xl:rounded-3xl" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {products.map((product, index) => (
          <div className="flex-[0_0_100%] min-w-0 h-full" key={product.id || index}>
            <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 dark:from-green-500/10 dark:to-blue-500/10 bg-white dark:bg-[#1A0B2E] p-3 sm:p-4 xl:p-6 border border-gray-200 dark:border-purple-800/50 flex flex-row xl:flex-col items-center xl:items-stretch shadow-sm h-full gap-3 sm:gap-4 xl:gap-6 group hover:border-green-500/30 transition-all duration-300">
              <div className="w-24 h-24 sm:w-32 sm:h-32 xl:w-full xl:flex-1 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#140824] border border-gray-100 dark:border-purple-800/30 relative shadow-inner">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5 xl:py-0">
                <div className="xl:text-center xl:mb-2">
                  <h3 className="text-sm sm:text-base xl:text-xl font-bold text-gray-900 dark:text-white mb-0.5 xl:mb-2 line-clamp-1 xl:line-clamp-none">
                    {product.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs xl:text-sm text-gray-500 dark:text-purple-300/80 mb-1.5 xl:mb-4 line-clamp-2 xl:line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 xl:gap-2 xl:justify-center">
                    <span className="text-[10px] xl:text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-md shadow-sm">
                      {product.price}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] xl:text-xs font-semibold text-pink-500 uppercase tracking-wider bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-100 dark:border-pink-500/20">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-2.5 xl:py-3.5 px-3 xl:px-6 rounded-lg xl:rounded-xl transition-all duration-200 text-xs sm:text-sm text-center shadow-lg shadow-green-500/20 hover:shadow-green-500/40 active:scale-[0.98] mt-2 xl:mt-auto block"
                >
                  Hemen Satın Al
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
