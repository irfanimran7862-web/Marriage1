import { useEffect, useState } from 'react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-12 px-4 max-w-4xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel mb-2">
        <Clock className="h-3.5 w-3.5" />
        <span>Counting Down To The Sacred Moment</span>
        <Sparkles className="h-3.5 w-3.5" />
      </div>

      <h3 className="text-2xl md:text-3xl font-decorative text-gold-gradient font-bold mb-8">
        The Auspicious Nikah Begins In
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center rounded-xl border border-gold-glow bg-gradient-to-b from-[#2a0e43]/90 to-[#190729]/95 p-4 md:p-6 shadow-xl"
          >
            <span className="font-cinzel text-3xl md:text-5xl font-bold text-[#fcedbb] tabular-nums tracking-wider drop-shadow-md">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="mt-2 text-[11px] md:text-xs font-cinzel uppercase tracking-widest text-[#d4af37]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs md:text-sm text-[#e0cfb2] font-serif">
        <Calendar className="h-4 w-4 text-[#f6e27a]" />
        <span>Friday, November 20, 2026 · 06:30 PM Onwards</span>
      </div>
    </section>
  );
}
