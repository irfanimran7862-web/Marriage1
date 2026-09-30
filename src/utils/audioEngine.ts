// Audio Engine for "Tum Hi Ho" - Playing the actual Song

export interface AudioState {
  isPlaying: boolean;
  trackTitle: string;
  volume: number;
  isMuted: boolean;
  isCustom: boolean;
}

// Fallback synth notes in case of offline / restricted environments
type NoteName = 
  | 'C3' | 'C#3' | 'D3' | 'D#3' | 'E3' | 'F3' | 'F#3' | 'G3' | 'G#3' | 'A3' | 'A#3' | 'B3'
  | 'C4' | 'C#4' | 'D4' | 'D#4' | 'E4' | 'F4' | 'F#4' | 'G4' | 'G#4' | 'A4' | 'A#4' | 'B4'
  | 'C5' | 'C#5' | 'D5' | 'D#5' | 'E5' | 'F5' | 'F#5' | 'G5' | 'G#5' | 'A5' | 'B5';

const NOTE_FREQS: Record<NoteName, number> = {
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'B5': 987.77,
};

const SONG_NOTES: { note: NoteName | null; duration: number }[] = [
  { note: 'C#4', duration: 0.5 },
  { note: 'E4', duration: 0.5 },
  { note: 'G#4', duration: 1.0 },
  { note: 'B4', duration: 1.0 },
  { note: 'A4', duration: 0.5 },
  { note: 'G#4', duration: 0.5 },
  { note: 'F#4', duration: 1.0 },
  { note: 'E4', duration: 1.0 },
  { note: 'D#4', duration: 1.0 },
  { note: 'C#4', duration: 1.5 },
  { note: 'C#5', duration: 1.25 },
  { note: 'B4', duration: 0.75 },
  { note: 'A4', duration: 0.75 },
  { note: 'G#4', duration: 1.5 },
  { note: 'B4', duration: 1.0 },
  { note: 'A4', duration: 0.75 },
  { note: 'G#4', duration: 0.75 },
  { note: 'F#4', duration: 1.5 },
];

class TumHiHoAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private isMuted = false;
  private volume = 0.8;
  private trackTitle = 'Tum Hi Ho (Song · Aashiqui 2)';
  private isCustom = false;
  private listeners: Set<(state: AudioState) => void> = new Set();
  private synthTimeout: number | null = null;
  private noteIdx = 0;

  constructor() {
    // Lazily initialized on first user interaction
  }

  private initAudio() {
    if (!this.audioElement) {
      this.audioElement = new Audio('/audio/tum-hi-ho.mp3');
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('playing', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', () => {
        // If MP3 fails, start fallback melody synthesizer
        if (this.isPlaying) {
          this.startSynth();
        }
      });
    }
  }

  public subscribe(cb: (state: AudioState) => void) {
    this.listeners.add(cb);
    cb(this.getState());
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => cb(state));
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      trackTitle: this.trackTitle,
      volume: this.volume,
      isMuted: this.isMuted,
      isCustom: this.isCustom,
    };
  }

  public setCustomAudioUrl(url: string, title?: string) {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.audioElement = new Audio(url);
    this.audioElement.loop = true;
    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    this.isCustom = true;
    if (title) {
      this.trackTitle = title;
    }
    if (this.isPlaying) {
      this.audioElement.play().catch(() => {});
    }
    this.notify();
  }

  public start() {
    this.initAudio();
    this.isPlaying = true;

    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.notify();
          })
          .catch((err) => {
            console.warn('Audio play prevented or file unavailable, falling back:', err);
            this.startSynth();
            this.notify();
          });
      }
    } else {
      this.startSynth();
      this.notify();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthTimeout) {
      window.clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  // Fallback synthesizer
  private startSynth() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.noteIdx = 0;
    this.playNextSynthNote();
  }

  private playNextSynthNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const item = SONG_NOTES[this.noteIdx];
    const durationSec = item.duration * 0.75;
    const now = this.ctx.currentTime;

    if (item.note && NOTE_FREQS[item.note]) {
      const freq = NOTE_FREQS[item.note];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + durationSec + 0.1);
    }

    this.noteIdx = (this.noteIdx + 1) % SONG_NOTES.length;
    this.synthTimeout = window.setTimeout(() => {
      this.playNextSynthNote();
    }, durationSec * 1000);
  }
}

export const weddingAudio = new TumHiHoAudioEngine();
