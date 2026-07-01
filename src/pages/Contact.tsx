import { Header } from '../components/Header';
import { motion } from 'motion/react';
import { Mail, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-purple-50 dark:bg-[#0F051D] transition-colors duration-300">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1A0B2E] rounded-3xl overflow-hidden shadow-sm border border-purple-100 dark:border-purple-500/10 p-8 md:p-12 text-center"
        >
          <div className="inline-flex bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-4 rounded-2xl mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">İletişime Geçin</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            Sorularınız, önerileriniz veya iş birlikleri için bize ulaşın. Size en kısa sürede geri dönüş yapacağız.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-purple-50/50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">E-posta</h3>
              <a href="mailto:yarimvoleiletisim@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline break-all">
                yarimvoleiletisim@gmail.com
              </a>
            </div>
            
            <div className="bg-purple-50/50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Konum</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Türkiye
              </p>
            </div>

            <div className="bg-purple-50/50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800/30">
              <div className="text-purple-600 dark:text-purple-400 mb-4">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sosyal Medya</h3>
              <div className="flex flex-col gap-1">
                <a href="https://instagram.com/aveniragames" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">@aveniragames</a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
