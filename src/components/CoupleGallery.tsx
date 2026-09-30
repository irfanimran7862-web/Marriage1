import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Maximize2, X, Play, Pause, Sliders } from 'lucide-react';
import { GalleryPhoto, GallerySettings } from '../types/wedding';
import { DEFAULT_GALLERY_PHOTOS, DEFAULT_GALLERY_SETTINGS } from '../data/defaultWedding';

interface CoupleGalleryProps {
  photos?: GalleryPhoto[];
  settings?: GallerySettings;
  onOpenSettings?: () => void;
}

export default function CoupleGallery({
  photos = DEFAULT_GALLERY_PHOTOS,
  settings = DEFAULT_GALLERY_SETTINGS,
  onOpenSettings,
}: CoupleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(settings.autoPlay);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Keep index within bounds if photos length changes
  useEffect(() => {
    if (currentIndex >= photos.length) {
      setCurrentIndex(0);
    }
  }, [photos.length, currentIndex]);

  // Sync autoplay state with settings
  useEffect(() => {
    setIsAutoPlaying(settings.autoPlay);
  }, [settings.autoPlay]);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Autoplay timer based on customized intervalSeconds
  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen || photos.length <= 1) return;
    const intervalMs = (settings.intervalSeconds || 4.5) * 1000;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isLightboxOpen, photos.length, settings.intervalSeconds]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  // Touch Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape' && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const currentPhoto = photos[currentIndex] || photos[0] || DEFAULT_GALLERY_PHOTOS[0];

  // Dynamic aspect ratio class
  const getAspectRatioClass = () => {
    switch (settings.aspectRatio) {
      case '16/9':
        return 'aspect-video';
      case '1/1':
        return 'aspect-square';
      case '16/10':
        return 'aspect-[16/10]';
      case '4/3':
      default:
        return 'aspect-[4/3] md:aspect-[16/10]';
    }
  };

  // Dynamic frame style class
  const getFrameStyleClass = () => {
    switch (settings.frameStyle) {
      case 'ornate-arch':
        return 'rounded-t-[80px] md:rounded-t-[120px] rounded-b-3xl border-2 border-[#dfb548] shadow-[0_0_35px_rgba(223,181,72,0.35)]';
      case 'minimal-luxury':
        return 'rounded-2xl border border-[#d4af37]/40 shadow-2xl';
      case 'royal-gold':
      default:
        return 'rounded-3xl border-2 border-gold-glow shadow-[0_15px_40px_rgba(0,0,0,0.6)]';
    }
  };

  return (
    <section id="gallery" className="relative py-16 md:py-24 px-4 max-w-5xl mx-auto">
      {/* Decorative Section Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#280c3f]/80 px-4 py-1.5 text-xs font-cinzel text-[#f6e27a] shadow-sm mb-3">
          <Heart className="h-3.5 w-3.5 fill-[#dfb548] text-[#dfb548]" />
          <span>A Journey of Love & Destiny</span>
          <Heart className="h-3.5 w-3.5 fill-[#dfb548] text-[#dfb548]" />
        </div>

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold">
            Couple Gallery
          </h2>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/50 bg-[#2b0d42] px-3 py-1 text-xs font-cinzel font-medium text-[#fcedbb] shadow-sm transition-all hover:bg-[#3d135e] hover:border-[#f6e27a] hover:scale-105"
              title="Customize Gallery Settings (Photos, Quotes, Timing & Layout)"
            >
              <Sliders className="h-3.5 w-3.5 text-[#f6e27a]" />
              <span className="hidden sm:inline">Customize Gallery</span>
            </button>
          )}
        </div>

        <p className="mt-3 text-xs md:text-sm font-serif italic text-[#dfb548]/90 max-w-xl mx-auto">
          "Celebrating the sacred companionship and cherished moments of Mohammed Irfan & Ayesha Noor"
        </p>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Main Carousel Frame */}
      <div
        className={`relative mx-auto max-w-3xl overflow-hidden bg-gradient-to-b from-[#240a38] via-[#1a0528] to-[#25093a] p-3 md:p-5 backdrop-blur-md transition-all duration-300 ${getFrameStyleClass()}`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(settings.autoPlay)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Main Image Container */}
        <div className={`relative ${getAspectRatioClass()} w-full overflow-hidden rounded-2xl bg-black`}>
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-opacity duration-700 ease-in-out select-none"
          />

          {/* Vignette & Soft Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#140321]/95 via-transparent to-black/30" />

          {/* Top Bar on Image: Counter, Fullscreen, Autoplay Toggle & Settings Button */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-[#fcedbb] backdrop-blur-md border border-[#d4af37]/30">
              {currentIndex + 1} / {photos.length}
            </span>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Quick Settings Shortcut */}
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#f6e27a] backdrop-blur-md border border-[#d4af37]/30 transition-all hover:bg-black/80 hover:scale-105"
                  aria-label="Gallery Settings"
                  title="Customize gallery photos & settings"
                >
                  <Sliders className="h-3.5 w-3.5" />
                </button>
              )}

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#f6e27a] backdrop-blur-md border border-[#d4af37]/30 transition-all hover:bg-black/80 hover:scale-105"
                aria-label={isAutoPlaying ? 'Pause carousel autoplay' : 'Play carousel autoplay'}
                title={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              >
                {isAutoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
              </button>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-[#f6e27a] backdrop-blur-md border border-[#d4af37]/30 transition-all hover:bg-black/80 hover:scale-105"
                aria-label="View photo in fullscreen"
                title="Expand fullscreen"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Romantic Caption & Quote Overlay at Bottom (Configurable) */}
          {settings.showQuotes && (
            <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 text-center z-10 transition-opacity">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-cinzel uppercase tracking-widest text-[#f6e27a] mb-1">
                <Sparkles className="h-3 w-3" />
                <span>{currentPhoto.title}</span>
                <Sparkles className="h-3 w-3" />
              </div>

              {currentPhoto.subtitle && (
                <p className="text-[11px] text-[#fcedbb]/90 font-serif mb-1">
                  {currentPhoto.subtitle}
                </p>
              )}

              <p className="font-serif text-xs md:text-sm text-[#ebd7bd] italic drop-shadow max-w-xl mx-auto">
                {currentPhoto.quote}
              </p>
            </div>
          )}

          {/* Left Arrow Navigation */}
          {photos.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#1b0629]/75 text-[#fcedbb] border border-[#d4af37]/50 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-[#320d4d] hover:border-[#f6e27a] hover:scale-110 active:scale-95"
              aria-label="Previous Couple Photo"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}

          {/* Right Arrow Navigation */}
          {photos.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#1b0629]/75 text-[#fcedbb] border border-[#d4af37]/50 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-[#320d4d] hover:border-[#f6e27a] hover:scale-110 active:scale-95"
              aria-label="Next Couple Photo"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          )}
        </div>

        {/* Indicator Dots Bar */}
        {photos.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[#dfb548] to-[#fce8a9] shadow-[0_0_8px_#dfb548]'
                    : 'w-2 bg-[#d4af37]/30 hover:bg-[#d4af37]/60'
                }`}
                aria-label={`Jump to photo ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail Preview Row (Configurable via Settings) */}
        {settings.showThumbnails && photos.length > 1 && (
          <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-3 px-1 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                className={`group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-[#dfb548] shadow-[0_0_15px_rgba(223,181,72,0.5)] scale-[1.03]'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#d4af37]/40'
                }`}
                aria-label={`Select photo ${index + 1}: ${photo.title}`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 border border-[#fce8a9] pointer-events-none rounded-lg" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-[#fcedbb] border border-[#d4af37]/50 hover:bg-black/90"
              aria-label="Close fullscreen view"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-gold-glow object-contain shadow-2xl"
            />

            <div className="mt-4 text-center">
              <h4 className="font-cinzel text-base md:text-lg font-bold text-[#fcedbb]">
                {currentPhoto.title}
              </h4>
              {currentPhoto.subtitle && (
                <p className="text-xs text-[#dfb548] font-serif">
                  {currentPhoto.subtitle}
                </p>
              )}
              {settings.showQuotes && (
                <p className="font-serif text-xs md:text-sm text-[#ebd7bd] italic mt-1 max-w-md mx-auto">
                  {currentPhoto.quote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
