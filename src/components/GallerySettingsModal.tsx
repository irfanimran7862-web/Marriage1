import { useState } from 'react';
import {
  X,
  Sliders,
  Image,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  Sparkles,
  Settings,
  Eye,
  Clock,
  Layout,
} from 'lucide-react';
import { GalleryPhoto, GallerySettings } from '../types/wedding';
import { DEFAULT_GALLERY_PHOTOS, DEFAULT_GALLERY_SETTINGS } from '../data/defaultWedding';

interface GallerySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  settings: GallerySettings;
  onSave: (updatedPhotos: GalleryPhoto[], updatedSettings: GallerySettings) => void;
}

export default function GallerySettingsModal({
  isOpen,
  onClose,
  photos,
  settings,
  onSave,
}: GallerySettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'display' | 'reset'>('photos');
  const [currentPhotos, setCurrentPhotos] = useState<GalleryPhoto[]>([...photos]);
  const [currentSettings, setCurrentSettings] = useState<GallerySettings>({ ...settings });

  // State for new photo form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newSubtitle, setNewSubtitle] = useState<string>('');
  const [newQuote, setNewQuote] = useState<string>('');
  const [newUrl, setNewUrl] = useState<string>('');
  const [isAddingPhoto, setIsAddingPhoto] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  if (!isOpen) return null;

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, photoId?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const dataUrl = reader.result;
          if (photoId) {
            // Replace existing photo
            setCurrentPhotos((prev) =>
              prev.map((p) => (p.id === photoId ? { ...p, url: dataUrl } : p))
            );
          } else {
            // Setting for new photo form
            setNewUrl(dataUrl);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reordering
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...currentPhotos];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setCurrentPhotos(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === currentPhotos.length - 1) return;
    const updated = [...currentPhotos];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setCurrentPhotos(updated);
  };

  const handleDeletePhoto = (id: string) => {
    if (currentPhotos.length <= 1) {
      alert('The gallery must contain at least one photo.');
      return;
    }
    setCurrentPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddPhotoSubmit = () => {
    if (!newUrl) {
      alert('Please select or upload a photo first.');
      return;
    }
    const newEntry: GalleryPhoto = {
      id: `custom-photo-${Date.now()}`,
      url: newUrl,
      title: newTitle || 'Cherished Wedding Moment',
      subtitle: newSubtitle || 'Mohammed Irfan & Ayesha Noor',
      quote: newQuote || '"Two souls, one shared eternity in love and grace."',
    };

    setCurrentPhotos((prev) => [...prev, newEntry]);
    setNewUrl('');
    setNewTitle('');
    setNewSubtitle('');
    setNewQuote('');
    setIsAddingPhoto(false);
  };

  const handleSave = () => {
    onSave(currentPhotos, currentSettings);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 500);
  };

  const handleResetToDefaults = () => {
    setCurrentPhotos([...DEFAULT_GALLERY_PHOTOS]);
    setCurrentSettings({ ...DEFAULT_GALLERY_SETTINGS });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border border-gold-glow bg-gradient-to-b from-[#240a38] via-[#1a0528] to-[#25093a] text-[#f5ebd6] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d4af37]/30 px-5 py-4 bg-[#180424]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dfb548]/20 border border-[#dfb548] text-[#f6e27a]">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base md:text-lg font-bold text-[#fcedbb]">
                Customize Couple Gallery Settings
              </h3>
              <p className="text-[11px] text-[#dfb548] font-serif">
                Manage photos, romantic quotes, transitions & layout
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#d4af37] hover:bg-[#34114f] hover:text-white"
            aria-label="Close gallery settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#d4af37]/20 bg-[#160421] px-5 pt-2">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-cinzel font-semibold transition-all ${
              activeTab === 'photos'
                ? 'border-[#dfb548] text-[#fcedbb] bg-[#290d3d]/50'
                : 'border-transparent text-[#cdbeab] hover:text-white'
            }`}
          >
            <Image className="h-3.5 w-3.5" />
            <span>Photos & Quotes ({currentPhotos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('display')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-cinzel font-semibold transition-all ${
              activeTab === 'display'
                ? 'border-[#dfb548] text-[#fcedbb] bg-[#290d3d]/50'
                : 'border-transparent text-[#cdbeab] hover:text-white'
            }`}
          >
            <Layout className="h-3.5 w-3.5" />
            <span>Carousel Display & Timing</span>
          </button>

          <button
            onClick={() => setActiveTab('reset')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-cinzel font-semibold transition-all ${
              activeTab === 'reset'
                ? 'border-[#dfb548] text-[#fcedbb] bg-[#290d3d]/50'
                : 'border-transparent text-[#cdbeab] hover:text-white'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          
          {/* TAB 1: Photos & Captions */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-cinzel text-[#dfb548] uppercase tracking-wider">
                  Current Photos in Gallery
                </span>

                {!isAddingPhoto && (
                  <button
                    onClick={() => setIsAddingPhoto(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#d4af37]/60 bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-3 py-1 text-xs font-cinzel font-bold text-[#140321] transition-transform hover:scale-105"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New Photo</span>
                  </button>
                )}
              </div>

              {/* Add New Photo Form */}
              {isAddingPhoto && (
                <div className="rounded-xl border border-[#dfb548] bg-[#220733] p-4 space-y-3 shadow-lg animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-2">
                    <span className="font-cinzel text-xs font-bold text-[#fcedbb]">
                      Add A New Couple Photo
                    </span>
                    <button
                      onClick={() => setIsAddingPhoto(false)}
                      className="text-xs text-[#d4af37] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                    <div className="sm:col-span-1">
                      <div className="relative aspect-[4/3] rounded-lg border border-[#d4af37]/40 overflow-hidden bg-black/50 flex items-center justify-center">
                        {newUrl ? (
                          <img
                            src={newUrl}
                            alt="New preview"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-2 text-[#998774]">
                            <Image className="h-6 w-6 mx-auto mb-1 opacity-50" />
                            <span className="text-[10px] block">No Photo Selected</span>
                          </div>
                        )}
                      </div>
                      <label className="mt-2 block cursor-pointer text-center rounded bg-[#350f4a] py-1 text-[11px] text-[#fce8a9] border border-[#d4af37]/40 hover:bg-[#481566]">
                        <Upload className="h-3 w-3 inline mr-1" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <div>
                        <label className="block text-[11px] text-[#d4af37]">Photo Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Walking into Forever"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-2.5 py-1 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#d4af37]">Subtitle</label>
                        <input
                          type="text"
                          placeholder="e.g. Hand in Hand Beneath Palace Arches"
                          value={newSubtitle}
                          onChange={(e) => setNewSubtitle(e.target.value)}
                          className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-2.5 py-1 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#d4af37]">Romantic Quote / Quranic Verse</label>
                        <input
                          type="text"
                          placeholder='e.g. "With every step, my soul found its home in yours."'
                          value={newQuote}
                          onChange={(e) => setNewQuote(e.target.value)}
                          className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-2.5 py-1 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-[#d4af37]/20">
                    <button
                      onClick={handleAddPhotoSubmit}
                      className="rounded bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-4 py-1 text-xs font-bold text-[#140321]"
                    >
                      Save Photo to Gallery
                    </button>
                  </div>
                </div>
              )}

              {/* Photo Cards List */}
              <div className="space-y-3">
                {currentPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="rounded-xl border border-[#d4af37]/30 bg-[#1e072b] p-3 transition-all hover:border-[#dfb548]/60 shadow"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      {/* Thumbnail & Replace */}
                      <div className="relative group w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/40 bg-black">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-[9px] text-[#fcedbb]">
                          <Upload className="h-3.5 w-3.5 mb-0.5" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, photo.id)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Title & Quote Edit Fields */}
                      <div className="flex-1 space-y-1.5 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-[#d4af37] block">Title</span>
                            <input
                              type="text"
                              value={photo.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCurrentPhotos((prev) =>
                                  prev.map((p) => (p.id === photo.id ? { ...p, title: val } : p))
                                );
                              }}
                              className="w-full rounded border border-[#d4af37]/40 bg-[#140421] px-2 py-1 text-white text-xs"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] text-[#d4af37] block">Subtitle</span>
                            <input
                              type="text"
                              value={photo.subtitle}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCurrentPhotos((prev) =>
                                  prev.map((p) => (p.id === photo.id ? { ...p, subtitle: val } : p))
                                );
                              }}
                              className="w-full rounded border border-[#d4af37]/40 bg-[#140421] px-2 py-1 text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-[#d4af37] block">Romantic Quote / Caption</span>
                          <input
                            type="text"
                            value={photo.quote}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCurrentPhotos((prev) =>
                                prev.map((p) => (p.id === photo.id ? { ...p, quote: val } : p))
                              );
                            }}
                            className="w-full rounded border border-[#d4af37]/40 bg-[#140421] px-2 py-1 text-[#fce8a9] italic text-xs font-serif"
                          />
                        </div>
                      </div>

                      {/* Actions: Move Up / Down / Delete */}
                      <div className="flex sm:flex-col items-center gap-1 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="rounded p-1 text-[#d4af37] hover:bg-[#34114f] hover:text-white disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(index)}
                          disabled={index === currentPhotos.length - 1}
                          className="rounded p-1 text-[#d4af37] hover:bg-[#34114f] hover:text-white disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="rounded p-1 text-red-400 hover:bg-red-950/50 hover:text-red-300"
                          title="Delete Photo"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Carousel Display & Timing */}
          {activeTab === 'display' && (
            <div className="space-y-4">
              
              {/* Autoplay & Transition Interval */}
              <div className="rounded-xl border border-[#d4af37]/30 bg-[#1f072d] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-cinzel text-xs font-bold text-[#fcedbb] block">
                      Autoplay Carousel
                    </span>
                    <span className="text-[11px] text-[#cdbeab]">
                      Automatically advances to the next romantic photo
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setCurrentSettings((prev) => ({ ...prev, autoPlay: !prev.autoPlay }))
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      currentSettings.autoPlay ? 'bg-[#dfb548]' : 'bg-[#3b1254]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        currentSettings.autoPlay ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Transition Speed Options */}
                <div>
                  <span className="text-[11px] text-[#d4af37] block mb-1.5">
                    Transition Duration / Speed
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: '3s (Fast)', val: 3 },
                      { label: '4.5s (Normal)', val: 4.5 },
                      { label: '6s (Cinematic)', val: 6 },
                      { label: '8s (Relaxed)', val: 8 },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() =>
                          setCurrentSettings((prev) => ({ ...prev, intervalSeconds: opt.val }))
                        }
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          currentSettings.intervalSeconds === opt.val
                            ? 'bg-[#dfb548] text-[#140321] border-[#fce8a9] font-bold shadow'
                            : 'border-[#d4af37]/40 bg-[#160424] text-[#ebd7bd] hover:border-[#dfb548]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display Element Toggles */}
              <div className="rounded-xl border border-[#d4af37]/30 bg-[#1f072d] p-4 space-y-3">
                <span className="font-cinzel text-xs font-bold text-[#fcedbb] block">
                  Slide Overlay & Thumbnail Controls
                </span>

                <div className="flex items-center justify-between border-b border-[#d4af37]/15 pb-2.5">
                  <div>
                    <span className="text-xs font-medium text-white block">
                      Show Romantic Quotes & Captions
                    </span>
                    <span className="text-[10px] text-[#cdbeab]">
                      Displays romantic verses & titles at the bottom of the photo
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentSettings.showQuotes}
                    onChange={(e) =>
                      setCurrentSettings((prev) => ({ ...prev, showQuotes: e.target.checked }))
                    }
                    className="h-4 w-4 rounded accent-[#dfb548] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-white block">
                      Show Thumbnail Preview Strip
                    </span>
                    <span className="text-[10px] text-[#cdbeab]">
                      Displays clickable miniature photos below the main carousel
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentSettings.showThumbnails}
                    onChange={(e) =>
                      setCurrentSettings((prev) => ({ ...prev, showThumbnails: e.target.checked }))
                    }
                    className="h-4 w-4 rounded accent-[#dfb548] cursor-pointer"
                  />
                </div>
              </div>

              {/* Aspect Ratio & Frame Style */}
              <div className="rounded-xl border border-[#d4af37]/30 bg-[#1f072d] p-4 space-y-3">
                <span className="font-cinzel text-xs font-bold text-[#fcedbb] block">
                  Frame Style & Aspect Ratio
                </span>

                <div>
                  <span className="text-[11px] text-[#d4af37] block mb-1">
                    Frame Aspect Ratio
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: '4:3 Classic', val: '4/3' },
                      { label: '16:9 Cinema', val: '16/9' },
                      { label: '16:10 Wide', val: '16/10' },
                      { label: '1:1 Square', val: '1/1' },
                    ].map((ratio) => (
                      <button
                        key={ratio.val}
                        onClick={() =>
                          setCurrentSettings((prev) => ({
                            ...prev,
                            aspectRatio: ratio.val as '4/3' | '16/9' | '1/1' | '16/10',
                          }))
                        }
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          currentSettings.aspectRatio === ratio.val
                            ? 'bg-[#dfb548] text-[#140321] border-[#fce8a9] font-bold shadow'
                            : 'border-[#d4af37]/40 bg-[#160424] text-[#ebd7bd] hover:border-[#dfb548]'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-[#d4af37] block mb-1">
                    Architectural Frame Border Style
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Royal Gold Glow', val: 'royal-gold' },
                      { label: 'Palace Arch Style', val: 'ornate-arch' },
                      { label: 'Minimal Luxury', val: 'minimal-luxury' },
                    ].map((style) => (
                      <button
                        key={style.val}
                        onClick={() =>
                          setCurrentSettings((prev) => ({
                            ...prev,
                            frameStyle: style.val as 'royal-gold' | 'ornate-arch' | 'minimal-luxury',
                          }))
                        }
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                          currentSettings.frameStyle === style.val
                            ? 'bg-[#dfb548] text-[#140321] border-[#fce8a9] font-bold shadow'
                            : 'border-[#d4af37]/40 bg-[#160424] text-[#ebd7bd] hover:border-[#dfb548]'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Reset */}
          {activeTab === 'reset' && (
            <div className="rounded-xl border border-[#d4af37]/30 bg-[#1f072d] p-5 text-center space-y-4">
              <RotateCcw className="h-8 w-8 text-[#dfb548] mx-auto opacity-80" />
              <div>
                <h4 className="font-cinzel text-sm font-bold text-white">
                  Reset Gallery to Default Settings
                </h4>
                <p className="text-xs text-[#cdbeab] max-w-md mx-auto mt-1">
                  This will restore the 4 original romantic photos of Mohammed Irfan & Ayesha Noor, default romantic quotes, and standard 4.5s autoplay timing.
                </p>
              </div>

              <button
                onClick={handleResetToDefaults}
                className="inline-flex items-center gap-2 rounded-lg border border-[#dfb548] bg-[#3a104e] px-4 py-2 text-xs font-cinzel font-bold text-[#fcedbb] hover:bg-[#4d1668] transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Restore Royal Defaults</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#d4af37]/30 px-5 py-3.5 bg-[#170422]">
          <div className="text-[11px] text-[#dfb548]">
            {savedNotice ? (
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Check className="h-3.5 w-3.5" /> Saved & Applied!
              </span>
            ) : (
              <span>All changes will reflect live on the invitation.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="rounded-lg border border-[#d4af37]/40 px-3.5 py-1.5 text-xs text-[#ebd7be] hover:bg-[#320d4b]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-4 py-1.5 text-xs font-cinzel font-bold text-[#140321] shadow-md transition-transform hover:scale-105"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
