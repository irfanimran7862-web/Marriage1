import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, MessageCircle } from 'lucide-react';
import { GuestDua } from '../types/wedding';
import { INITIAL_DUAS } from '../data/defaultWedding';

export default function GuestDuas() {
  const [duas, setDuas] = useState<GuestDua[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guest_duas');
      return saved ? JSON.parse(saved) : INITIAL_DUAS;
    } catch {
      return INITIAL_DUAS;
    }
  });

  const [senderName, setSenderName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Family Friend');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      localStorage.setItem('wedding_guest_duas', JSON.stringify(duas));
    } catch {
      // storage unavailable
    }
  }, [duas]);

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return;
    setLikedIds((prev) => new Set(prev).add(id));
    setDuas((prev) =>
      prev.map((d) => (d.id === id ? { ...d, likes: d.likes + 1 } : d))
    );
  };

  const handleQuickDua = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newDua: GuestDua = {
      id: `dua-${Date.now()}`,
      senderName: senderName.trim(),
      relationship,
      message: message.trim(),
      date: 'Just now',
      likes: 1,
    };

    setDuas((prev) => [newDua, ...prev]);
    setSenderName('');
    setMessage('');
    setIsSubmitting(false);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#dfb548', '#fce8a9', '#ffffff'],
    });
  };

  return (
    <section id="duas" className="relative py-16 md:py-24 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          Sacred Prayers & Well Wishes
        </span>
        <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold mt-2">
          Duas & Blessings For The Couple
        </h2>
        <p className="mt-3 text-xs md:text-sm text-[#e3d0b2] max-w-md mx-auto font-serif">
          Leave your heartfelt prayers and warm congratulations for Irfan and Ayesha.
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Send Dua Form */}
        <div className="lg:col-span-5 rounded-2xl border border-gold-glow bg-gradient-to-b from-[#250b3d]/90 to-[#190628]/95 p-6 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-cinzel uppercase tracking-widest text-[#dfb548] mb-4">
            <MessageCircle className="h-4 w-4" />
            <span>Send Your Blessing</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Uncle Rashid & Family"
                className="w-full rounded-lg border border-[#d4af37]/40 bg-[#160424] px-3.5 py-2 text-xs text-white placeholder-[#d4af37]/40 focus:border-[#f6e27a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                Relation
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full rounded-lg border border-[#d4af37]/40 bg-[#160424] px-3.5 py-2 text-xs text-white focus:border-[#f6e27a] focus:outline-none"
              >
                <option value="Groom’s Family">Groom’s Family</option>
                <option value="Bride’s Family">Bride’s Family</option>
                <option value="Groom’s Friend">Groom’s Friend</option>
                <option value="Bride’s Friend">Bride’s Friend</option>
                <option value="Colleague / Mentor">Colleague / Mentor</option>
                <option value="Well Wisher">Well Wisher</option>
              </select>
            </div>

            {/* Quick Dua Presets */}
            <div>
              <label className="block text-[11px] font-cinzel uppercase tracking-wider text-[#d4af37]/90 mb-1.5">
                Quick Traditional Duas
              </label>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDua("بارك الله لكما وبارك عليكما وجمع بينكما في خير - May Allah bless you both and shower His peace upon your marriage!")}
                  className="text-left text-[11px] text-[#fce8a9] bg-[#2a0e43] border border-[#d4af37]/30 hover:border-[#fce8a9] rounded p-2 transition-colors font-arabic"
                >
                  بارك الله لكما وبارك عليكما وجمع بينكما في خير
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDua("Wishing you a lifetime of endless laughter, serene love, and eternal barakah. Congratulations!")}
                  className="text-left text-[11px] text-[#e8d5ba] bg-[#2a0e43] border border-[#d4af37]/30 hover:border-[#fce8a9] rounded p-1.5 transition-colors font-serif"
                >
                  "Wishing you a lifetime of endless laughter & barakah..."
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                Your Message / Prayer
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers and wishes here..."
                className="w-full rounded-lg border border-[#d4af37]/40 bg-[#160424] px-3.5 py-2 text-xs text-white placeholder-[#d4af37]/40 focus:border-[#f6e27a] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] py-2.5 text-xs font-cinzel font-bold uppercase tracking-wider text-[#150422] shadow-md transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Blessing</span>
            </button>
          </form>
        </div>

        {/* Live Duas Stream Right */}
        <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
          {duas.map((dua) => (
            <div
              key={dua.id}
              className="rounded-xl border border-[#d4af37]/30 bg-[#210935]/80 p-4 md:p-5 shadow-md transition-all hover:border-[#f6e27a]/60"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-[#fcedbb]">
                    {dua.senderName}
                  </h4>
                  <span className="text-[11px] text-[#dfb548] font-serif">
                    {dua.relationship} · {dua.date}
                  </span>
                </div>

                <button
                  onClick={() => handleLike(dua.id)}
                  className={`flex items-center gap-1 text-xs rounded-full px-2.5 py-1 border transition-colors ${
                    likedIds.has(dua.id)
                      ? 'border-[#e63946] bg-[#e63946]/20 text-[#ff8591]'
                      : 'border-[#d4af37]/30 text-[#d4af37] hover:border-[#f6e27a]'
                  }`}
                  aria-label="Send love to this dua"
                >
                  <Heart className={`h-3 w-3 ${likedIds.has(dua.id) ? 'fill-[#e63946]' : ''}`} />
                  <span className="font-mono text-[10px]">{dua.likes}</span>
                </button>
              </div>

              <p className="text-xs md:text-sm text-[#ead7bc] leading-relaxed font-serif">
                {dua.message}
              </p>
            </div>
          ))}

          <div className="text-center pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#d4af37]/80 font-cinzel">
              <Sparkles className="h-3.5 w-3.5" />
              <span>May Allah bless every kind prayer made for the couple</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
