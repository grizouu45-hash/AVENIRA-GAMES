import React from 'react';
import { Game } from '../types';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const isNew = game.createdAt?.toDate && 
    (new Date().getTime() - game.createdAt.toDate().getTime()) < 4 * 24 * 60 * 60 * 1000;

  return (
    <Link to={`/post/${game.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group cursor-pointer bg-white dark:bg-[#1A0B2E] p-4 rounded-2xl border border-purple-100 dark:border-purple-500/10 hover:border-purple-300 dark:hover:border-purple-500/40 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col relative"
      >
        {isNew && (
          <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shadow-md animate-pulse">
            Yeni
          </div>
        )}
        <div className="aspect-video bg-purple-50 dark:bg-[#2D164B] rounded-xl mb-4 overflow-hidden relative shrink-0">
          {game.imageUrl ? (
            <img 
              src={game.imageUrl} 
              alt={game.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-indigo-900 to-purple-800"></div>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h4 className="font-bold mb-1 text-gray-900 dark:text-[#E0E0E0] line-clamp-1">{game.title}</h4>
          <p className="text-xs text-purple-600/70 dark:text-purple-300/50 mb-2 uppercase tracking-wider">{game.category}</p>
          {game.tags && game.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {game.tags.map((tag, idx) => (
                <span key={idx} className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
            {game.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-purple-500/10">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {game.eventDate ? new Date(game.eventDate).toLocaleDateString('tr-TR') : ''}
            </span>
            <div className="flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
              Detayları Gör
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
