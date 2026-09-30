import { Share2, Sliders } from 'lucide-react';

interface TopNavProps {
  onOpenCustomizer: () => void;
  onShare: () => void;
}

export default function TopNav({ onOpenCustomizer, onShare }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#d4af37]/30 bg-[#160524]/90 px-4 md:px-8 py-3.5 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-decorative text-lg md:text-xl font-bold tracking-wider text-gold-gradient hover:opacity-90 transition-opacity"
        >
          Royal Noor
        </a>

        {/* Zone 2: clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-cinzel uppercase tracking-widest text-[#ebd7be]">
          <a href="#couple" className="hover:text-[#f6e27a] transition-colors">
            Bride & Groom
          </a>
          <a href="#gallery" className="hover:text-[#f6e27a] transition-colors text-[#fcedbb]">
            Gallery
          </a>
          <a href="#ceremonies" className="hover:text-[#f6e27a] transition-colors">
            Ceremonies
          </a>
          <a href="#menu" className="hover:text-[#f6e27a] transition-colors text-[#fcedbb] font-semibold">
            Banquet Menu
          </a>
          <a href="#venue" className="hover:text-[#f6e27a] transition-colors">
            Venue
          </a>
          <a href="#duas" className="hover:text-[#f6e27a] transition-colors">
            Duas
          </a>
          <a href="#rsvp" className="hover:text-[#f6e27a] transition-colors">
            RSVP
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 rounded-lg border border-[#d4af37]/50 bg-[#250a3a] px-3 py-1.5 text-xs font-cinzel font-medium text-[#fcedbb] transition-all hover:bg-[#381156] hover:border-[#f6e27a]"
            title="Share Wedding Invitation"
          >
            <Share2 className="h-3.5 w-3.5 text-[#f6e27a]" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-3.5 py-1.5 text-xs font-cinzel font-bold text-[#140321] shadow-sm transition-transform hover:scale-105"
            title="Edit wedding card details & photos"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Customize</span>
          </button>
        </div>

      </div>
    </header>
  );
}
