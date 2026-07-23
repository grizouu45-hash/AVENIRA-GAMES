import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Game } from '../types';
import { Header } from '../components/Header';
import { ArrowLeft, Calendar, ExternalLink, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Comments } from '../components/Comments';
import { AdSense } from '../components/AdSense';

export function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Bağlantı kopyalandı!');
    }
  };

  useEffect(() => {
    async function fetchPost() {
      if (!id) return;
      try {
        const docRef = doc(db, 'games', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Game);
          
          // Only increment if we haven't in this session
          const sessionKey = `viewed_${id}`;
          if (!sessionStorage.getItem(sessionKey)) {
            try {
              await updateDoc(docRef, { views: increment(1) });
              sessionStorage.setItem(sessionKey, 'true');
            } catch (e) {
              console.error("Error incrementing views:", e);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 dark:bg-[#0F051D] transition-colors duration-300">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-purple-50 dark:bg-[#0F051D] transition-colors duration-300">
        <Header />
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Haber Bulunamadı</h2>
          <Link to="/" className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-[#0F051D] transition-colors duration-300">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Geri Dön
          </Link>
          <button 
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Paylaş
          </button>
        </div>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1A0B2E] rounded-3xl overflow-hidden shadow-sm border border-purple-100 dark:border-purple-500/10 mb-12"
        >
          {post.imageUrl && (
            <div className="aspect-[21/9] relative bg-purple-50 dark:bg-[#2D164B]">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-10">
                <span className="bg-purple-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
          )}

          <div className="p-6 md:p-10">
            {!post.imageUrl && (
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 inline-block">
                {post.category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8 text-sm text-gray-600 dark:text-gray-400 border-b border-purple-100 dark:border-purple-500/10 pb-8">
              {(post.eventDate || post.eventTime) && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>
                    {post.eventDate && new Date(post.eventDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {post.eventDate && post.eventTime && ' - '}
                    {post.eventTime}
                  </span>
                </div>
              )}
              {post.link && (!post.links || post.links.length === 0) && (
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Bağlantıya Git
                </a>
              )}
            </div>

            {post.youtubeLink && (
              <div className="mb-8 aspect-video rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-500/20 shadow-md">
                <iframe
                  src={post.youtubeLink.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  title="YouTube video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="prose prose-purple dark:prose-invert max-w-none mb-10">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                {post.description}
              </p>
              
              <div 
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
            </div>

            <AdSense />

            {post.links && post.links.length > 0 && (
              <div className="pt-8 border-t border-purple-100 dark:border-purple-500/10 flex flex-wrap gap-4">
                {post.links.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-xl font-medium transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    {link.title || `Bağlantı ${index + 1}`}
                  </a>
                ))}
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-purple-100 dark:border-purple-800/30">
                {(Array.isArray(post.tags) ? post.tags : [post.tags]).map((tag, idx) => (
                  <span key={idx} className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-800/50 text-xs font-semibold px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Comments Section */}
            <Comments postId={id!} />
            
          </div>
        </motion.article>
      </main>
    </div>
  );
}
