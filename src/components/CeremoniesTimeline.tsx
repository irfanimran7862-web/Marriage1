import { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { Ceremony } from '../types/wedding';

interface CeremoniesTimelineProps {
  ceremonies: Ceremony[];
}

export default function CeremoniesTimeline({ ceremonies }: CeremoniesTimelineProps) {
  const [selectedId, setSelectedId] = useState<string>('all');

  const filteredCeremonies =
    selectedId === 'all'
      ? ceremonies
      : ceremonies.filter((c) => c.id === selectedId);

  return (
    <section id="ceremonies" className="relative py-16 md:py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          Celebrations of Joy & Barakah
        </span>
        <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold mt-2">
          Wedding Ceremonies Itinerary
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Interactive Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setSelectedId('all')}
          className={`px-4 py-2 text-xs font-cinzel uppercase tracking-wider rounded-lg transition-all ${
            selectedId === 'all'
              ? 'bg-gradient-to-r from-[#dfb548] to-[#996e1b] text-[#12041d] font-bold shadow-md'
              : 'border border-[#d4af37]/30 text-[#e0cfb0] hover:border-[#f6e27a]'
          }`}
        >
          All Ceremonies
        </button>
        {ceremonies.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`px-4 py-2 text-xs font-cinzel uppercase tracking-wider rounded-lg transition-all ${
              selectedId === c.id
                ? 'bg-gradient-to-r from-[#dfb548] to-[#996e1b] text-[#12041d] font-bold shadow-md'
                : 'border border-[#d4af37]/30 text-[#e0cfb0] hover:border-[#f6e27a]'
            }`}
          >
            {c.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Timeline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredCeremonies.map((ceremony, idx) => (
          <div
            key={ceremony.id}
            className="relative flex flex-col justify-between rounded-2xl border border-gold-glow bg-gradient-to-b from-[#250b3d]/90 via-[#1a072b]/95 to-[#240a3a]/90 p-6 md:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
          >
            {/* Top decorative Arabic name */}
            {ceremony.arabicName && (
              <div className="text-right font-arabic text-xl text-[#fce8a9]/80 font-bold mb-2">
                {ceremony.arabicName}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-cinzel text-[#d4af37] font-semibold">
                  Phase 0{idx + 1}
                </span>
                <span className="text-[#d4af37]/40">·</span>
                <span className="text-[11px] font-serif text-[#ebd6b5] italic">
                  {ceremony.subTitle}
                </span>
              </div>

              <h3 className="text-2xl font-cinzel font-bold text-[#fcedbb] mb-4">
                {ceremony.name}
              </h3>

              {/* Event Details */}
              <div className="space-y-3 text-xs md:text-sm text-[#ebd9bf]">
                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-[#f6e27a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{ceremony.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-[#f6e27a] shrink-0 mt-0.5" />
                  <div>
                    <span>{ceremony.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#f6e27a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">{ceremony.venue}</span>
                    <p className="text-[#d4af37]/90 text-xs mt-0.5">{ceremony.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attire suggestion */}
            <div className="mt-6 pt-4 border-t border-[#d4af37]/25 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#dfb548]">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-cinzel text-[11px] uppercase tracking-wider">
                  Attire: {ceremony.attire}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
