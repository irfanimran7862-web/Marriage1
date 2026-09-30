import { useEffect, useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2, Upload, Sparkles } from 'lucide-react';
import { weddingAudio, AudioState } from '../utils/audioEngine';

export default function AudioPlayerFloating() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [trackTitle, setTrackTitle] = useState<string>('Tum Hi Ho (Song · Aashiqui 2)');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((state: AudioState) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
      setTrackTitle(state.trackTitle);
    });
    return unsub;
  }, []);

  const handleTogglePlay = () => {
    weddingAudio.togglePlay();
  };

  const handleToggleMute = () => {
    weddingAudio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    weddingAudio.setVolume(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      weddingAudio.setCustomAudioUrl(url, file.name.replace(/\.[^/.]+$/, ''));
      weddingAudio.start();
    }
  };

  return (
    <aside
      aria-label="Wedding Song Player"
      className="fixed bottom-4 left-4 z-40 flex flex-col gap-2"
    >
      {/* Expanded Controls Card */}
      {isExpanded && (
        <div className="w-80 rounded-xl border border-gold-glow bg-[#1e0a2e]/95 p-4 text-[#f4ecd8] shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
            <div className="flex items-center gap-2">
              <Music2 className="h-4 w-4 text-[#f6e27a]" />
              <span className="text-xs font-semibold tracking-wider text-[#f6e27a] uppercase font-cinzel">
                Wedding Song
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-[#d4af37] hover:text-[#fff]"
              aria-label="Close audio controls"
            >
              Close
            </button>
          </div>

          <div className="my-3 space-y-1">
            <h4 className="text-sm font-bold text-white">
              Tum Hi Ho (Song)
            </h4>
            <p className="text-xs text-[#dfb548] font-serif">
              Aashiqui 2 · Official Song Track
            </p>
          </div>

          {/* Volume slider */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[#e0cfb0]">
            <button
              onClick={handleToggleMute}
              className="text-[#f6e27a] hover:text-white"
              aria-label={isMuted ? 'Unmute song' : 'Mute song'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="h-1.5 w-full cursor-pointer accent-[#d4af37]"
              aria-label="Volume slider"
            />
            <span className="w-8 text-right font-mono text-[10px]">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

          {/* Custom audio upload */}
          <div className="mt-3 border-t border-[#d4af37]/20 pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#d4af37]/30 bg-[#2f1244] py-1.5 text-[11px] font-medium text-[#f6e27a] transition-all hover:bg-[#3e185c]"
            >
              <Upload className="h-3.5 w-3.5" />
              Choose Custom Song File (MP3)
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Mini Bar */}
      <div className="flex items-center gap-2 rounded-full border border-gold-glow bg-[#210935]/95 px-3.5 py-2 shadow-2xl backdrop-blur-md">
        <button
          onClick={handleTogglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#dfb548] to-[#fce8a9] text-[#1a0729] shadow-md transition-transform hover:scale-105"
          aria-label={isPlaying ? 'Pause Tum Hi Ho song' : 'Play Tum Hi Ho song'}
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
        </button>

        {/* Dynamic Equalizer Visualizer & Title */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex cursor-pointer items-center gap-2 pr-1"
          title="Click to view song controls"
        >
          <div className="flex items-end gap-0.5 h-4 w-4">
            <span
              className={`w-1 bg-[#f6e27a] rounded-t transition-all duration-150 ${
                isPlaying ? 'animate-bounce h-3' : 'h-1'
              }`}
            />
            <span
              className={`w-1 bg-[#dfb548] rounded-t transition-all duration-200 ${
                isPlaying ? 'animate-pulse h-4' : 'h-1.5'
              }`}
            />
            <span
              className={`w-1 bg-[#f6e27a] rounded-t transition-all duration-150 ${
                isPlaying ? 'animate-bounce h-2.5' : 'h-1'
              }`}
            />
          </div>

          <div className="max-w-[170px] truncate text-left">
            <p className="truncate text-xs font-bold text-[#fdedc9]">
              {isPlaying ? 'Song: Tum Hi Ho ♫' : 'Play Tum Hi Ho Song'}
            </p>
            <p className="truncate text-[10px] text-[#dfb548] font-serif">
              {isPlaying ? 'Now Playing Song' : 'Tap to Play Song'}
            </p>
          </div>

          <span className="flex h-5 w-5 items-center justify-center rounded-full text-[#d4af37] hover:text-white">
            <Sparkles className="h-3 w-3" />
          </span>
        </div>
      </div>
    </aside>
  );
}
