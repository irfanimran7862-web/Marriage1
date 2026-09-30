import { useState } from 'react';
import { X, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  wedding: WeddingData;
}

export default function ShareModal({ isOpen, onClose, wedding }: ShareModalProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratedFresh, setIsGeneratedFresh] = useState<boolean>(false);

  if (!isOpen) return null;

  // Build clean web link with current host
  const baseLink = `${window.location.origin}${window.location.pathname}`;
  
  // Encode wedding metadata into clean link parameter
  const sharePayload = {
    gn: wedding.groomName,
    gp: wedding.groomParents,
    bn: wedding.brideName,
    bp: wedding.brideParents,
    vn: wedding.weddingVenueName,
    va: wedding.weddingAddress,
    dt: wedding.weddingDate,
  };
  const encodedPayload = encodeURIComponent(JSON.stringify(sharePayload));
  const fullShareUrl = `${baseLink}#invite=${encodedPayload}`;

  const currentUrl = isGeneratedFresh ? fullShareUrl : (window.location.href.includes('#') ? window.location.href : baseLink);

  const whatsappMessage = encodeURIComponent(
    `✨ *Royal Nikah & Wedding Invitation* ✨\n\nWith the grace of Almighty Allah, you and your family are cordially invited to celebrate the Nikah of *${wedding.groomName}* & *${wedding.brideName}*.\n\n📅 *Date:* Friday, November 20, 2026\n📍 *Venue:* ${wedding.weddingVenueName} (${wedding.weddingAddress})\n\n🍽️ *Royal Dastarkhwan Menu:* Galouti Kebabs, Hyderabadi Dum Biryani, Mutton Rogan Josh, Shahi Tukda & Saffron Phirni\n🎵 *Song:* Tum Hi Ho (Aashiqui 2)\n\nTap to open the interactive wedding card, unveil the surprise & view the full royal menu:\n${currentUrl}`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGenerateFreshLink = () => {
    setIsGeneratedFresh(true);
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-gold-glow bg-[#1d072c] p-6 text-[#f5ebd6] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💌</span>
            <h3 className="font-cinzel text-base md:text-lg font-bold text-[#fcedbb]">
              Marriage Invitation Web Link
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#d4af37] hover:bg-[#34114f] hover:text-white"
            aria-label="Close share dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <p className="text-[#ebd9bf] leading-relaxed">
            Your personalized wedding invitation web link is active and ready. Send it to family and guests so they can open the card, listen to "Tum Hi Ho", view bride & groom portraits, and explore the complete royal feast menu!
          </p>

          {/* Highlights of card */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#270b3e]/80 border border-[#d4af37]/30 text-[11px] text-[#fce8a9]">
            <div>✨ Bismillah Divine Arch</div>
            <div>👰 Bride & Groom Reveal</div>
            <div>🍽️ Royal Dastarkhwan Menu</div>
            <div>🎶 "Tum Hi Ho" Audio</div>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#20ba59]"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Share Invitation on WhatsApp</span>
          </button>

          {/* Web link box */}
          <div className="rounded-xl border border-[#d4af37]/40 bg-[#160424] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="block text-[11px] font-cinzel uppercase text-[#d4af37]">
                Live Web Link
              </span>
              <button
                onClick={handleGenerateFreshLink}
                className="text-[10px] text-[#f6e27a] underline hover:text-white"
              >
                Regenerate Customized Link
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full truncate rounded border border-[#d4af37]/20 bg-[#250a3a] px-2.5 py-2 text-[11px] text-[#fce8a9] font-mono"
              />
              <button
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded bg-gradient-to-r from-[#dfb548] to-[#b38018] px-3.5 py-2 font-cinzel text-xs font-bold text-[#140420] hover:brightness-110 shadow-sm transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            {copied && (
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                ✓ Web link copied to clipboard! You can paste and send it anywhere.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
