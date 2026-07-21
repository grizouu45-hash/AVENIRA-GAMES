import { Search, Instagram, Youtube, Video, Menu, X as CloseIcon, LogOut, ShieldAlert, BarChart2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { NotificationsCenter } from './NotificationsCenter';

// Simple TikTok SVG Icon Component
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Header({ onSearch, rightContent }: { onSearch?: (query: string) => void, rightContent?: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setShowProfileMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1A0B2E]/90 backdrop-blur-lg border-b border-purple-200/50 dark:border-purple-500/20 shadow-sm dark:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 shrink-0">
          <button 
            className="md:hidden p-2 text-purple-900 dark:text-purple-100 hover:bg-purple-200/50 dark:hover:bg-purple-500/10 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://i.ibb.co/bMtgKZLk/AVENIRA-GAMES-LOGO.jpg" 
              alt="Avenira Games Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md border-2 border-purple-200 dark:border-purple-800"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('ui-avatars')) {
                  target.src = 'https://ui-avatars.com/api/?name=A&background=8b5cf6&color=fff';
                }
              }}
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-300 dark:to-indigo-200 hidden lg:block">
              AVENIRA GAMES
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Ana Sayfa</Link>
          <div className="relative group">
            <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2">Kategoriler</button>
            <div className="absolute top-full left-0 w-48 bg-white dark:bg-[#1A0B2E] border border-purple-100 dark:border-purple-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
              <Link to="/?category=DLS" className="block px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/30">DLS</Link>
              <Link to="/?category=Bilgilendirmeler" className="block px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/30">Bilgilendirmeler</Link>
              <Link to="/?category=Diğer+Oyunlar" className="block px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/30">Diğer Oyunlar</Link>
            </div>
          </div>
          <Link to="/hakkinda" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Hakkında</Link>
          <Link to="/iletisim" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">İletişim</Link>
        </nav>

        {onSearch && (
          <div className="flex-1 max-w-md hidden lg:block mx-4">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-purple-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Haberlerde, oyunlarda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#1f0f35] border-2 border-gray-200 dark:border-purple-800/60 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:bg-white dark:focus:bg-[#2a1448] focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 text-gray-900 dark:text-[#E0E0E0] placeholder-gray-500 dark:placeholder-purple-300/60 shadow-inner transition-all"
              />
            </form>
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {onSearch && (
            <button 
              className="lg:hidden p-2 text-purple-900 dark:text-purple-100 hover:bg-purple-200/50 dark:hover:bg-purple-500/10 rounded-full transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
          )}
          
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2">
            <a href="https://instagram.com/aveniragames" target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-full transition-colors">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="https://youtube.com/@AVENIRAGAMES" target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-full transition-colors">
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a href="https://tiktok.com/@fevzicansigva" target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-full transition-colors">
              <TiktokIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          {user && <NotificationsCenter user={user} />}
          <div className="hidden sm:block h-6 w-[1px] bg-purple-200 dark:bg-purple-500/20"></div>
          
          {rightContent ? (
            rightContent
          ) : user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="Profile" className="w-8 h-8 rounded-full border border-purple-200 dark:border-purple-500/30" />
              </button>
              
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A0B2E] border border-purple-100 dark:border-purple-800 rounded-xl shadow-lg z-50 py-2 overflow-hidden">
                    <div className="px-4 py-2 border-b border-purple-100 dark:border-purple-800/50 mb-2 truncate">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Giriş yapıldı</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    
                    {(user.email === 'grizouu45@gmail.com' || user.email === 'sigvafevzican@gmail.com') && (
                      <>
                        <Link 
                          to="/admin" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                        >
                          <ShieldAlert className="w-4 h-4" /> Yönetim Paneli
                        </Link>
                        <Link 
                          to="/admin/statistics" 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                        >
                          <BarChart2 className="w-4 h-4" /> İstatistikler
                        </Link>
                      </>
                    )}
                    
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                    >
                      <LogOut className="w-4 h-4" /> Çıkış Yap
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-md shadow-purple-500/20">
              Giriş Yap / Kaydol
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Search */}
      {onSearch && isSearchOpen && (
        <div className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2 bg-white/80 dark:bg-[#1A0B2E]/90 backdrop-blur-lg">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-purple-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Haberlerde, oyunlarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full bg-gray-50 dark:bg-[#1f0f35] border-2 border-gray-200 dark:border-purple-800/60 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:bg-white dark:focus:bg-[#2a1448] focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 text-gray-900 dark:text-[#E0E0E0] placeholder-gray-500 dark:placeholder-purple-300/60 shadow-inner transition-all"
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-purple-100 dark:border-purple-800/50 bg-white dark:bg-[#1A0B2E]">
          <nav className="flex flex-col py-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30">Ana Sayfa</Link>
            <div className="px-4 py-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Kategoriler</p>
              <div className="flex flex-col gap-1 pl-2 border-l-2 border-purple-200 dark:border-purple-800">
                <Link to="/?category=DLS" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600">DLS</Link>
                <Link to="/?category=Bilgilendirmeler" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600">Bilgilendirmeler</Link>
                <Link to="/?category=Diğer+Oyunlar" onClick={() => setIsMenuOpen(false)} className="py-2 px-2 text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600">Diğer Oyunlar</Link>
              </div>
            </div>
            <Link to="/hakkinda" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30">Hakkında</Link>
            <Link to="/iletisim" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30">İletişim</Link>
            
            <div className="px-4 py-3 mt-2 border-t border-purple-100 dark:border-purple-800/50 flex items-center justify-center gap-4">
              <a href="https://instagram.com/aveniragames" target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@AVENIRAGAMES" target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@fevzicansigva" target="_blank" rel="noopener noreferrer" className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-full transition-colors">
                <TiktokIcon className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
