import { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, Users, Sparkles } from 'lucide-react';
import { WeddingData, RSVPResponse } from '../types/wedding';

interface RSVPSectionProps {
  wedding: WeddingData;
}

export default function RSVPSection({ wedding }: RSVPSectionProps) {
  const [formData, setFormData] = useState<RSVPResponse>({
    name: '',
    phone: '',
    email: '',
    attending: 'yes',
    guestsCount: 2,
    ceremoniesAttending: ['nikah', 'walima'],
    dietaryNotes: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleCeremonyToggle = (id: string) => {
    setFormData((prev) => {
      const exists = prev.ceremoniesAttending.includes(id);
      return {
        ...prev,
        ceremoniesAttending: exists
          ? prev.ceremoniesAttending.filter((c) => c !== id)
          : [...prev.ceremoniesAttending, id],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#dfb548', '#fce8a9', '#c1121f', '#ffffff'],
    });
  };

  return (
    <section id="rsvp" className="relative py-16 md:py-24 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          Kindly Respond
        </span>
        <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold mt-2">
          RSVP For The Wedding
        </h2>
        <p className="mt-2 text-xs md:text-sm text-[#e0ceb2] font-serif">
          Please confirm your attendance by {wedding.rsvpDeadline} so we may prepare the feast in your honour.
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="rounded-2xl border border-gold-glow bg-gradient-to-b from-[#280c40]/95 via-[#1b062b]/95 to-[#240a3a]/95 p-6 md:p-10 shadow-2xl">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#dfb548]/20 border-2 border-[#dfb548] flex items-center justify-center text-[#f6e27a]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-[#fcedbb]">
              JazakAllah Khair! RSVP Received
            </h3>

            <p className="text-sm text-[#ebd7be] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-white">{formData.name}</span>. We are deeply honoured and eagerly look forward to welcoming you and your family to celebrate this blessed milestone!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-cinzel text-[#d4af37] underline hover:text-white"
            >
              Update or submit another response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Aamir Khan & Family"
                  className="w-full rounded-lg border border-[#d4af37]/40 bg-[#160424] px-3.5 py-2.5 text-xs text-white placeholder-[#d4af37]/40 focus:border-[#f6e27a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                  Contact Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full rounded-lg border border-[#d4af37]/40 bg-[#160424] px-3.5 py-2.5 text-xs text-white placeholder-[#d4af37]/40 focus:border-[#f6e27a] focus:outline-none"
                />
              </div>
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
                Will You Be Attending? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-3 px-4 text-xs font-cinzel uppercase tracking-wider transition-all ${
                    formData.attending === 'yes'
                      ? 'border-[#f6e27a] bg-gradient-to-r from-[#b38018] to-[#dfb548] text-[#12041d] font-bold shadow-md'
                      : 'border-[#d4af37]/30 bg-[#190628] text-[#e0cfb0] hover:border-[#d4af37]'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Joyfully Accept</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-3 px-4 text-xs font-cinzel uppercase tracking-wider transition-all ${
                    formData.attending === 'no'
                      ? 'border-[#c1121f] bg-[#c1121f]/20 text-[#ff8f98] font-bold shadow-md'
                      : 'border-[#d4af37]/30 bg-[#190628] text-[#e0cfb0] hover:border-[#d4af37]'
                  }`}
                >
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <>
                {/* Guest Count */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                    Number of Attendees (Including Yourself)
                  </label>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-[#f6e27a]" />
                    <select
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) })}
                      className="rounded-lg border border-[#d4af37]/40 bg-[#160424] px-4 py-2 text-xs text-white focus:border-[#f6e27a] focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ceremonies Attending */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-2">
                    Ceremonies You Wish To Grace
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {wedding.ceremonies.map((c) => {
                      const isChecked = formData.ceremoniesAttending.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleCeremonyToggle(c.id)}
                          className={`rounded-lg border p-2.5 text-center text-xs font-cinzel transition-all ${
                            isChecked
                              ? 'border-[#f6e27a] bg-[#3a1357] text-[#fcedbb] font-bold shadow-sm'
                              : 'border-[#d4af37]/30 bg-[#190628]/60 text-[#d4af37]/80 hover:border-[#d4af37]'
                          }`}
                        >
                          <div className="font-semibold">{c.name.split(' ')[0]}</div>
                          <div className="text-[10px] text-[#e0cfb0] font-serif">{c.date.split(',')[0]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1">
                Special Requests or Dietary Preferences (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.dietaryNotes}
                onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                placeholder="Vegetarian preference, wheelchair assistance, etc."
                className="w-full rounded-lg border border-[#d4af37]/40 bg-[#160424] px-3.5 py-2 text-xs text-white placeholder-[#d4af37]/40 focus:border-[#f6e27a] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] py-3.5 text-xs md:text-sm font-cinzel font-bold uppercase tracking-wider text-[#140321] shadow-lg transition-transform hover:scale-[1.01] active:scale-95"
            >
              <Send className="h-4 w-4" />
              <span>Confirm RSVP</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
