import React, { useEffect } from 'react';

interface AdSenseProps {
  client?: string; // Örn: "ca-pub-1234567890123456"
  slot?: string;   // Örn: "1234567890"
  format?: string; // Örn: "auto", "fluid"
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSense({ 
  client = 'ca-pub-XXXXXXXXXXXXXXXX', // Kendi AdSense Client ID'niz ile değiştirin
  slot = 'XXXXXXXXXX',               // Kendi AdSense Slot ID'niz ile değiştirin
  format = 'auto', 
  responsive = true, 
  style, 
  className 
}: AdSenseProps) {
  
  const adPushed = React.useRef(false);

  useEffect(() => {
    if (!adPushed.current) {
      adPushed.current = true;
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err: any) {
        if (!err.message?.includes('already have ads')) {
          console.error('AdSense error:', err);
        }
      }
    }
  }, []);

  return (
    <div className={`adsense-wrapper w-full flex justify-center my-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl overflow-hidden min-h-[100px] border border-dashed border-gray-200 dark:border-gray-700 items-center relative ${className || ''}`}>
      {/* Bu div sadece test ortamında reklamın nerede çıkacağını göstermek için */}
      <span className="absolute text-xs text-gray-400 font-medium">Reklam Alanı</span>
      
      <ins
        className="adsbygoogle relative z-10"
        style={{ display: 'block', width: '100%', minHeight: '100px', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
