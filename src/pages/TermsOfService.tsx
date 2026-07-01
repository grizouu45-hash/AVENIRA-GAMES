import { Header } from '../components/Header';
import { motion } from 'motion/react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0314] font-sans transition-colors">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Hizmet Şartları</h1>
          
          <div className="prose prose-purple dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Kabul Edilme</h2>
            <p className="mb-4">
              Bu web sitesini kullanarak veya ziyaret ederek, bu Hizmet Şartlarını ve Gizlilik Politikamızı 
              kabul etmiş sayılırsınız. Şartların herhangi bir bölümünü kabul etmiyorsanız, 
              lütfen sitemizi kullanmayı bırakın.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. İçerik ve Kullanım</h2>
            <p className="mb-4">
              Sitemizdeki tüm içerikler yalnızca bilgilendirme amaçlıdır. Avenıra Games, sunulan 
              bilgilerin doğruluğu ve güncelliği konusunda elinden geleni yapsa da, herhangi bir 
              garanti vermez. İçeriklerin izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Kullanıcı Sorumlulukları</h2>
            <p className="mb-4">
              Siteyi kullanırken yasalara uygun davranmayı ve diğer kullanıcıların haklarına saygı 
              göstermeyi kabul edersiniz. Siteye zarar verecek, işleyişini bozacak veya haksız erişim 
              sağlayacak herhangi bir eylemden kaçınmanız gerekmektedir.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Değişiklikler</h2>
            <p className="mb-4">
              Avenıra Games, bu Hizmet Şartlarını önceden bildirmeksizin istediği zaman değiştirme hakkını saklı tutar. 
              Değişiklikler sitede yayınlandığı andan itibaren geçerlidir. Sitenin güncel kullanım şartlarını takip etmek kullanıcının sorumluluğundadır.
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. İletişim</h2>
            <p className="mb-4">
              Hizmet şartlarımızla ilgili her türlü soru ve öneriniz için 
              <a href="mailto:yarimvoleiletisim@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline mx-1">
                yarimvoleiletisim@gmail.com
              </a> 
              adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
