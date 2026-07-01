import { Header } from '../components/Header';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-purple-50 dark:bg-[#0F051D] transition-colors duration-300">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1A0B2E] rounded-3xl overflow-hidden shadow-sm border border-purple-100 dark:border-purple-500/10 p-8 md:p-12 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shrink-0">
              <span className="text-4xl font-bold text-white">A</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Avenira Games Hakkında</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Oyun dünyasındaki en güncel gelişmeleri, son dakika haberlerini ve e-spor arenalarındaki heyecanı tek bir platformda topluyoruz. Özellikle mobil futbol oyunları (DLS) ve diğer popüler oyunlardaki güncellemeler, taktikler ve turnuvalarla ilgili en doğru bilgiyi sunmayı hedefliyoruz.
              </p>
            </div>
          </div>

          <div className="prose prose-purple dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vizyonumuz</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Oyuncuların ihtiyaç duyduğu haberlere hızlı ve güvenilir bir şekilde ulaşmasını sağlayarak, Türkiye'nin en sevilen mobil oyun ve genel oyun haber platformu olmak.
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Topluluğumuz</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Biz sadece haber sunmuyoruz, aynı zamanda kocaman bir topluluğuz. YouTube, Instagram ve TikTok platformlarındaki yüz binlerce takipçimizle oyun kültürünü büyütüyor, turnuvalar ve etkinliklerle bir araya geliyoruz.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
