import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Music, ChevronDown, Share2 } from 'lucide-react';
import { WeddingData } from '../types/wedding';
import { weddingAudio } from '../utils/audioEngine';

interface FrontPageCoverProps {
  wedding: WeddingData;
  isOpened: boolean;
  onOpenSurprise: () => void;
  onShare?: () => void;
}

export default function FrontPageCover({ wedding, isOpened, onOpenSurprise, onShare }: FrontPageCoverProps) {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState<boolean>(false);

  const handleOpenClick = () => {
    setIsOpeningAnimation(true);

    // Start playing Tum Hi Ho
    weddingAudio.start();

    // Trigger royal celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#dfb548', '#fce8a9', '#c1121f', '#8b1e3f', '#ffffff'],
    });

    setTimeout(() => {
      onOpenSurprise();
      setIsOpeningAnimation(false);
    }, 700);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-12 md:py-16">
      {/* Background with deep royal purple gradient & subtle arabesque texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#180728] via-[#210935] to-[#12041d] -z-20" />
      
      {/* Ornate Gold Filigree Corner Accents */}
      <div className="pointer-events-none absolute top-4 left-4 h-24 w-24 md:h-36 md:w-36 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-3xl opacity-80" />
      <div className="pointer-events-none absolute top-4 right-4 h-24 w-24 md:h-36 md:w-36 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-24 w-24 md:h-36 md:w-36 border-b-2 border-l-2 border-[#d4af37]/60 rounded-bl-3xl opacity-80" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 md:h-36 md:w-36 border-b-2 border-r-2 border-[#d4af37]/60 rounded-br-3xl opacity-80" />

      {/* Hanging Golden Moroccan Lanterns */}
      <div className="pointer-events-none absolute top-0 left-12 hidden md:block animate-float-lantern">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#d4af37] to-transparent mx-auto" />
        <div className="w-8 h-12 border border-[#d4af37] rounded-b-xl bg-[#2e1047]/80 shadow-[0_0_15px_rgba(246,226,122,0.5)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#fcedbb] animate-ping" />
        </div>
      </div>
      <div className="pointer-events-none absolute top-0 right-12 hidden md:block animate-float-lantern" style={{ animationDelay: '1.5s' }}>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#d4af37] to-transparent mx-auto" />
        <div className="w-8 h-12 border border-[#d4af37] rounded-b-xl bg-[#2e1047]/80 shadow-[0_0_15px_rgba(246,226,122,0.5)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#fcedbb] animate-ping" />
        </div>
      </div>

      {/* Main Royal Card Enclosure */}
      <div className={`relative w-full max-w-2xl rounded-2xl border-2 border-gold-glow bg-gradient-to-b from-[#2b0d44]/95 via-[#1d082e]/95 to-[#280b3f]/95 p-6 md:p-10 text-center shadow-2xl backdrop-blur-md transition-all duration-700 ${
        isOpeningAnimation ? 'scale-105 opacity-90' : 'scale-100 opacity-100'
      }`}>
        {/* Sacred Divine Calligraphy Ribbon */}
        <div className="mb-4">
          <p className="font-arabic text-2xl md:text-3xl font-bold tracking-wide text-[#fcedbb] leading-relaxed drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="text-[12px] md:text-sm uppercase tracking-widest text-[#d4af37] mt-1 font-cinzel">
            In the Name of Allah, the Most Beneficent, the Most Merciful
          </p>
        </div>

        {/* Sacred Arch & God Image Display */}
        <div className="relative mx-auto my-5 max-w-md overflow-hidden rounded-t-[140px] rounded-b-xl border-2 border-[#d4af37]/80 shadow-[0_0_35px_rgba(212,175,55,0.35)]">
          <img
            src={wedding.coverImage}
            alt="Sacred Divine Calligraphy of Allah and Bismillah framed in royal Islamic arch"
            referrerPolicy="no-referrer"
            className="h-64 md:h-72 w-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b062b] via-transparent to-[#1b062b]/30 pointer-events-none" />
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="font-arabic text-xl text-[#fce8a9] font-bold tracking-widest drop-shadow-md">
              تبارك الله أحسن الخالقين
            </span>
          </div>
        </div>

        {/* Invitation Kicker */}
        <div className="my-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            The Auspicious Wedding & Nikah Ceremony
          </p>
          <h1 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold tracking-wider pt-1">
            {wedding.groomName.split(' ')[1] || wedding.groomName} & {wedding.brideName.split(' ')[0] || wedding.brideName}
          </h1>
          <p className="text-xs md:text-sm text-[#e6d6bc] font-cinzel tracking-wider pt-2">
            Mohammed Irfan & Ayesha Noor
          </p>
        </div>

        {/* Surprise Royal Wax Seal & Action Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            onClick={handleOpenClick}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#fce8a9] bg-gradient-to-r from-[#b38018] via-[#dfb548] to-[#996e1b] px-8 py-4 font-cinzel text-sm md:text-base font-bold uppercase tracking-widest text-[#160424] shadow-[0_0_25px_rgba(246,226,122,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(246,226,122,0.9)] active:scale-95"
            aria-label="Open wedding invitation and reveal bride and groom surprise"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            
            <Sparkles className="h-5 w-5 text-[#240638] animate-spin" style={{ animationDuration: '6s' }} />
            <span>{isOpened ? 'Explore Wedding Details' : 'Open Invitation & Reveal Surprise'}</span>
            <Heart className="h-5 w-5 fill-[#240638] text-[#240638]" />
          </button>

          {/* Subtext info highlighting the song */}
          <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-[#fcedbb] font-serif bg-[#1d062b]/80 px-4 py-1.5 rounded-full border border-[#d4af37]/30 shadow">
            <Music className="h-4 w-4 text-[#f6e27a] animate-pulse" />
            <span className="font-semibold text-white">Song: Tum Hi Ho</span>
            <span className="text-xs text-[#d4af37] hidden sm:inline">(Aashiqui 2 · Official Song)</span>
          </div>

          {/* Quick Share / Generate Link Trigger */}
          {onShare && (
            <button
              onClick={onShare}
              className="mt-4 flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#1e072d]/80 px-4 py-1.5 text-xs font-cinzel text-[#fce8a9] transition-all hover:bg-[#34114f] hover:border-[#f6e27a]"
            >
              <Share2 className="h-3.5 w-3.5 text-[#f6e27a]" />
              <span>Get & Share Web Link (WhatsApp)</span>
            </button>
          )}

          {/* Down Chevron indicator if already opened */}
          {isOpened && (
            <div className="mt-6 flex flex-col items-center text-[#d4af37] animate-bounce">
              <span className="text-[11px] uppercase tracking-widest font-cinzel">Scroll to Explore</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
