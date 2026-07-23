import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, getDoc, where } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Header } from '../components/Header';
import { ShieldAlert, Users, MousePointerClick, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { AdminCommentsModal } from '../components/AdminCommentsModal';

export function StatisticsPanel() {
  const [weeklyVisits, setWeeklyVisits] = useState(0);
  const [dailyVisits, setDailyVisits] = useState(0);
  const [monthlyVisits, setMonthlyVisits] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [topGames, setTopGames] = useState<any[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !['grizouu45@gmail.com', 'sigvafevzican@gmail.com', 'ytsite2109@gmail.com'].includes(user.email?.toLowerCase() || '')) {
        navigate('/');
      } else {
        fetchStats();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function fetchStats() {
    try {
      const today = new Date();
      const dayStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      const monthStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
      const d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
      const weekStr = `${d.getUTCFullYear()}-W${weekNo}`;

      // Weekly Visits
      try {
        const statsRef = doc(db, 'site_stats', weekStr);
        const statsDoc = await getDoc(statsRef);
        if (statsDoc.exists()) {
          setWeeklyVisits(statsDoc.data().visits || 0);
        }
      } catch(e) { console.error('Weekly error', e) }

      // Daily Visits
      try {
        const dailyRef = doc(db, 'site_stats', `daily_${dayStr}`);
        const dailyDoc = await getDoc(dailyRef);
        if (dailyDoc.exists()) {
          setDailyVisits(dailyDoc.data().visits || 0);
        }
      } catch(e) { console.error('Daily error', e) }

      // Monthly Visits
      try {
        const monthlyRef = doc(db, 'site_stats', `monthly_${monthStr}`);
        const monthlyDoc = await getDoc(monthlyRef);
        if (monthlyDoc.exists()) {
          setMonthlyVisits(monthlyDoc.data().visits || 0);
        }
      } catch(e) { console.error('Monthly error', e) }

      // Total Users
      try {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        setTotalUsers(usersSnapshot.size || 0);
      } catch(e) { console.error('Users error', e) }

      try {
        const gamesRef = collection(db, 'games');
        const q = query(gamesRef, orderBy('views', 'desc'), limit(10));
        const gamesSnapshot = await getDocs(q);
        
        const gamesData = [];
        let allCommentsCount = 0;

        for (const gameDoc of gamesSnapshot.docs) {
          const game = gameDoc.data();
          const commentsRef = collection(db, 'comments');
          const commentsQuery = query(commentsRef, where('postId', '==', gameDoc.id));
          const commentsSnapshot = await getDocs(commentsQuery);
          
          gamesData.push({
            id: gameDoc.id,
            title: game.title,
            views: game.views || 0,
            comments: commentsSnapshot.size || 0
          });

          allCommentsCount += commentsSnapshot.size;
        }

        setTopGames(gamesData);
        setTotalComments(allCommentsCount);
      } catch(e) { console.error('Games error', e) }
      setLoading(false);

    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F051D] flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors text-purple-600 dark:text-purple-400">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">İstatistik Paneli</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Site trafiği ve etkileşim raporları</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#1A0B2E] p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Günlük Ziyaretçi</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{dailyVisits}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1A0B2E] p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Haftalık Ziyaretçi</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{weeklyVisits}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1A0B2E] p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Aylık Ziyaretçi</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{monthlyVisits}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1A0B2E] p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Siteye Üye Olan Kullanıcılar</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalUsers}</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#1A0B2E] p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                  <MousePointerClick className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">En Çok Okunan Haber Tıklanması</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {topGames.length > 0 ? topGames[0].views : 0}
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setShowCommentsModal(true)}
                className="bg-white dark:bg-[#1A0B2E] p-6 rounded-2xl border border-purple-100 dark:border-purple-800/50 shadow-sm flex items-center gap-4 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
              >
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Yorum (Popüler)</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalComments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A0B2E] border border-purple-100 dark:border-purple-800/50 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-purple-100 dark:border-purple-800/50">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">En Çok Okunan Haberler (Top 10)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                  <thead className="bg-purple-50/50 dark:bg-purple-900/20 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold border-b border-purple-100 dark:border-purple-800/30">
                    <tr>
                      <th className="px-6 py-4">Haber Başlığı</th>
                      <th className="px-6 py-4 text-center">Görüntülenme</th>
                      <th className="px-6 py-4 text-center">Yorumlar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100 dark:divide-purple-800/30">
                    {topGames.map((game) => (
                      <tr key={game.id} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white max-w-md truncate">
                          {game.title}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium">
                            <MousePointerClick className="w-3.5 h-3.5" />
                            {game.views}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {game.comments}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {topGames.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                          Henüz veri bulunmuyor.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <AdminCommentsModal 
        isOpen={showCommentsModal} 
        onClose={() => setShowCommentsModal(false)} 
      />
    </div>
  );
}
