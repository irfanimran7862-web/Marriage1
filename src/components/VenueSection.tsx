import { MapPin, Navigation, CalendarPlus, PhoneCall, Info } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface VenueSectionProps {
  wedding: WeddingData;
}

export default function VenueSection({ wedding }: VenueSectionProps) {
  const handleAddToGoogleCalendar = () => {
    const title = encodeURIComponent(`Nikah: ${wedding.groomName} & ${wedding.brideName}`);
    const details = encodeURIComponent(
      `Nikah and Wedding Celebration of ${wedding.groomName} and ${wedding.brideName}.\nVenue: ${wedding.weddingVenueName}\nMay Allah bless this union.`
    );
    const location = encodeURIComponent(wedding.weddingAddress);
    // 20261120T183000 / 20261120T233000
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261120T130000Z/20261120T180000Z`;
    window.open(url, '_blank');
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nikah Celebration//Wedding Card//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding-nikah.com
DTSTAMP:20261120T000000Z
DTSTART:20261120T130000Z
DTEND:20261120T180000Z
SUMMARY:Nikah of ${wedding.groomName} & ${wedding.brideName}
DESCRIPTION:Wedding celebration of ${wedding.groomName} & ${wedding.brideName}
LOCATION:${wedding.weddingVenueName}, ${wedding.weddingAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Wedding-${wedding.groomName}-${wedding.brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="venue" className="relative py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          The Royal Destination
        </span>
        <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold mt-2">
          Venue & Location Details
        </h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="rounded-2xl border border-gold-glow bg-gradient-to-b from-[#250b3d]/90 to-[#180628]/95 p-6 md:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Venue Info Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-cinzel uppercase tracking-widest text-[#dfb548]">
              <MapPin className="h-4 w-4" />
              <span>Main Reception & Nikah Venue</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-[#fcedbb]">
              {wedding.weddingVenueName}
            </h3>

            <p className="text-sm md:text-base text-[#ebd6b8] leading-relaxed">
              {wedding.weddingAddress}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={wedding.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-5 py-2.5 text-xs font-cinzel font-bold uppercase tracking-wider text-[#180526] shadow-md transition-transform hover:scale-105"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <button
                onClick={handleAddToGoogleCalendar}
                className="flex items-center gap-2 rounded-lg border border-[#d4af37]/50 bg-[#280d3d] px-4 py-2.5 text-xs font-cinzel font-medium uppercase tracking-wider text-[#fce8a9] transition-all hover:bg-[#391257] hover:border-[#fce8a9]"
              >
                <CalendarPlus className="h-4 w-4" />
                <span>Google Calendar</span>
              </button>

              <button
                onClick={handleDownloadICS}
                className="flex items-center gap-2 rounded-lg border border-[#d4af37]/30 bg-[#1c082b] px-4 py-2.5 text-xs font-cinzel font-medium uppercase tracking-wider text-[#d4af37] transition-all hover:bg-[#2e0e47]"
              >
                <span>Download .ICS</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex items-start gap-2.5 text-xs text-[#d4af37]/90 font-serif">
              <Info className="h-4 w-4 shrink-0 mt-0.5 text-[#f6e27a]" />
              <span>
                Valet and ample parking available at Sree Convention entrance. Royal Halal banquet dinner will be served following the Nikah prayer.
              </span>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 flex flex-col justify-center rounded-xl border border-[#d4af37]/40 bg-[#1c072b]/80 p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#dfb548]/15 border border-[#dfb548] flex items-center justify-center text-[#f6e27a]">
              <PhoneCall className="h-5 w-5" />
            </div>

            <h4 className="font-cinzel text-lg font-bold text-[#fcedbb]">
              Hospitality & RSVP Desk
            </h4>
            <p className="text-xs text-[#e0cfb2] leading-relaxed">
              For outstation guests requiring hotel accommodation, airport transfers, or special assistance:
            </p>

            <div className="space-y-1 text-xs font-mono text-[#f6e27a]">
              <p>Brother Farhan: +91 98765 43210</p>
              <p>Sister Zara: +91 98765 43211</p>
            </div>

            <p className="text-[11px] text-[#d4af37]/80 italic font-serif">
              Kindly confirm attendance before {wedding.rsvpDeadline}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
