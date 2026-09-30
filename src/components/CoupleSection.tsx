import { Heart, Sparkles, Quote } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface CoupleSectionProps {
  wedding: WeddingData;
}

export default function CoupleSection({ wedding }: CoupleSectionProps) {
  return (
    <section id="couple" className="relative py-16 md:py-24 px-4 max-w-6xl mx-auto">
      {/* Quranic Verse Sacred Plaque */}
      <div className="relative mx-auto max-w-3xl rounded-2xl border border-gold-glow bg-gradient-to-b from-[#280c3f]/90 via-[#1c072b]/95 to-[#280c3f]/90 p-6 md:p-10 text-center shadow-xl mb-16 backdrop-blur-sm">
        <div className="flex justify-center mb-3 text-[#f6e27a]">
          <Quote className="h-8 w-8 opacity-70 rotate-180" />
        </div>
        
        <p className="font-arabic text-xl md:text-3xl font-bold text-[#fcedbb] leading-loose drop-shadow-md">
          {wedding.quranicVerseArabic}
        </p>

        <p className="mt-4 font-serif text-sm md:text-base italic text-[#ebd9bd] max-w-2xl mx-auto leading-relaxed">
          "{wedding.quranicVerseTranslation}"
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-xs font-cinzel uppercase tracking-widest text-[#d4af37]">
          <Sparkles className="h-3 w-3" />
          <span>{wedding.quranicReference}</span>
          <Sparkles className="h-3 w-3" />
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          Two Souls, One Divine Journey
        </span>
        <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold mt-2">
          The Bride & The Groom
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Bride & Groom Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        
        {/* Groom Card */}
        <div className="relative flex flex-col items-center rounded-2xl border border-[#d4af37]/40 bg-gradient-to-b from-[#230a38]/90 to-[#190628]/95 p-6 md:p-8 text-center shadow-2xl transition-all duration-300 hover:border-[#f6e27a]/70 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          {/* Islamic Arch Top Frame */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 mb-6 overflow-hidden rounded-t-[120px] rounded-b-2xl border-2 border-[#dfb548] p-1.5 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <img
              src={wedding.groomPhoto}
              alt={`Groom ${wedding.groomName}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-t-[115px] rounded-b-xl transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-t-[115px] rounded-b-xl border border-[#fce8a9]/30 pointer-events-none" />
          </div>

          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#dfb548] mb-1">
            The Groom
          </span>
          <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-[#fcedbb]">
            {wedding.groomName}
          </h3>

          <div className="mt-2 text-xs md:text-sm text-[#d4af37]/90 font-serif">
            <span>{wedding.groomTitle}</span>
            <p className="font-semibold text-[#f7e8ce] mt-0.5">{wedding.groomParents}</p>
          </div>

          {wedding.groomBio && (
            <p className="mt-4 text-xs md:text-sm text-[#e0cfb5] font-light leading-relaxed max-w-sm">
              {wedding.groomBio}
            </p>
          )}

          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 w-full flex items-center justify-center gap-2 text-xs text-[#d4af37] font-cinzel">
            <Heart className="h-3.5 w-3.5 fill-[#d4af37]" />
            <span>Alhumdulillah</span>
          </div>
        </div>

        {/* Bride Card */}
        <div className="relative flex flex-col items-center rounded-2xl border border-[#d4af37]/40 bg-gradient-to-b from-[#230a38]/90 to-[#190628]/95 p-6 md:p-8 text-center shadow-2xl transition-all duration-300 hover:border-[#f6e27a]/70 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          {/* Islamic Arch Top Frame */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 mb-6 overflow-hidden rounded-t-[120px] rounded-b-2xl border-2 border-[#dfb548] p-1.5 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <img
              src={wedding.bridePhoto}
              alt={`Bride ${wedding.brideName}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-t-[115px] rounded-b-xl transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-t-[115px] rounded-b-xl border border-[#fce8a9]/30 pointer-events-none" />
          </div>

          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em] text-[#dfb548] mb-1">
            The Bride
          </span>
          <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-[#fcedbb]">
            {wedding.brideName}
          </h3>

          <div className="mt-2 text-xs md:text-sm text-[#d4af37]/90 font-serif">
            <span>{wedding.brideTitle}</span>
            <p className="font-semibold text-[#f7e8ce] mt-0.5">{wedding.brideParents}</p>
          </div>

          {wedding.brideBio && (
            <p className="mt-4 text-xs md:text-sm text-[#e0cfb5] font-light leading-relaxed max-w-sm">
              {wedding.brideBio}
            </p>
          )}

          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 w-full flex items-center justify-center gap-2 text-xs text-[#d4af37] font-cinzel">
            <Heart className="h-3.5 w-3.5 fill-[#d4af37]" />
            <span>MashaAllah</span>
          </div>
        </div>

      </div>

      {/* Royal Couple Together Showcase Banner */}
      <div className="mt-16 rounded-2xl border border-gold-glow bg-gradient-to-r from-[#210933]/90 via-[#2d0e45]/90 to-[#210933]/90 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-80 lg:h-96 relative">
            <img
              src={wedding.couplePhoto}
              alt={`${wedding.groomName} and ${wedding.brideName} together in royal wedding attire`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-transparent to-[#210933]" />
          </div>

          <div className="lg:col-span-7 p-6 md:p-10 text-center lg:text-left space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#dfb548] font-cinzel">
              Sacred Bond of Eternal Love
            </span>
            <h3 className="text-2xl md:text-4xl font-decorative text-gold-bright font-bold">
              Together Forever In The Light of Allah
            </h3>
            <p className="text-sm md:text-base text-[#ebdcc6] leading-relaxed font-light">
              {wedding.invitationMessage}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#fce8a9] font-cinzel">
              <span className="rounded-full border border-[#d4af37]/40 px-3 py-1 bg-[#190628]/60">
                ✨ Sacred Nikah
              </span>
              <span className="rounded-full border border-[#d4af37]/40 px-3 py-1 bg-[#190628]/60">
                💐 Grand Walima
              </span>
              <span className="rounded-full border border-[#d4af37]/40 px-3 py-1 bg-[#190628]/60">
                🕊️ Prayers & Duas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
