import { useState } from 'react';
import { X, Check, Copy, Share2, Upload, Sliders, Image as ImageIcon } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  wedding: WeddingData;
  onSave: (updated: WeddingData) => void;
  onOpenGallerySettings?: () => void;
}

export default function CustomizerModal({
  isOpen,
  onClose,
  wedding,
  onSave,
  onOpenGallerySettings,
}: CustomizerModalProps) {
  const [formData, setFormData] = useState<WeddingData>({ ...wedding });
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'groomPhoto' | 'bridePhoto' | 'couplePhoto' | 'coverImage'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAndApply = () => {
    onSave(formData);
    onClose();
  };

  const handleCopyShareLink = () => {
    try {
      // Create minimal encoded payload for URL
      const sharePayload = {
        gn: formData.groomName,
        gp: formData.groomParents,
        bn: formData.brideName,
        bp: formData.brideParents,
        vn: formData.weddingVenueName,
        va: formData.weddingAddress,
        dt: formData.weddingDate,
      };
      const encoded = encodeURIComponent(JSON.stringify(sharePayload));
      const shareUrl = `${window.location.origin}${window.location.pathname}#invite=${encoded}`;

      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold-glow bg-[#1d072c] p-6 text-[#f5ebd6] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[#f6e27a]" />
            <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#fcedbb]">
              Customize Wedding Invitation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-[#d4af37] hover:bg-[#34114f] hover:text-white"
            aria-label="Close customizer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="mt-4 space-y-5 text-xs">
          
          {/* Groom Details */}
          <div className="rounded-xl border border-[#d4af37]/30 bg-[#250b3a] p-4 space-y-3">
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#dfb548]">
              Groom Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#d4af37] mb-1">Groom Name</label>
                <input
                  type="text"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#d4af37] mb-1">Groom's Parents</label>
                <input
                  type="text"
                  value={formData.groomParents}
                  onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                  className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#d4af37] mb-1">Upload Custom Groom Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'groomPhoto')}
                className="w-full text-[11px] text-[#e0cfb0] file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-cinzel file:bg-[#d4af37] file:text-[#1a0729] hover:file:bg-[#f6e27a]"
              />
            </div>
          </div>

          {/* Bride Details */}
          <div className="rounded-xl border border-[#d4af37]/30 bg-[#250b3a] p-4 space-y-3">
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#dfb548]">
              Bride Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#d4af37] mb-1">Bride Name</label>
                <input
                  type="text"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#d4af37] mb-1">Bride's Parents</label>
                <input
                  type="text"
                  value={formData.brideParents}
                  onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                  className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#d4af37] mb-1">Upload Custom Bride Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'bridePhoto')}
                className="w-full text-[11px] text-[#e0cfb0] file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-cinzel file:bg-[#d4af37] file:text-[#1a0729] hover:file:bg-[#f6e27a]"
              />
            </div>
          </div>

          {/* Venue & Date */}
          <div className="rounded-xl border border-[#d4af37]/30 bg-[#250b3a] p-4 space-y-3">
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#dfb548]">
              Venue & Wedding Date
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#d4af37] mb-1">Venue Name</label>
                <input
                  type="text"
                  value={formData.weddingVenueName}
                  onChange={(e) => setFormData({ ...formData, weddingVenueName: e.target.value })}
                  className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#d4af37] mb-1">Wedding Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.weddingDate.slice(0, 16)}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#d4af37] mb-1">Address</label>
              <input
                type="text"
                value={formData.weddingAddress}
                onChange={(e) => setFormData({ ...formData, weddingAddress: e.target.value })}
                className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-1.5 text-white"
              />
            </div>
          </div>

          {/* Couple Gallery Settings Trigger */}
          <div className="rounded-xl border border-[#d4af37]/40 bg-[#250b3a] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-[#f6e27a]" />
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#dfb548]">
                  Couple Gallery & Romantic Photos
                </span>
              </div>
              <p className="text-[#ebd9bf] text-[11px] mt-1">
                Customize photos, romantic quotes, carousel autoplay speed, aspect ratio & frame styles.
              </p>
            </div>
            {onOpenGallerySettings && (
              <button
                type="button"
                onClick={onOpenGallerySettings}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-3.5 py-1.5 text-xs font-cinzel font-bold text-[#140321] transition-transform hover:scale-105"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Gallery Settings</span>
              </button>
            )}
          </div>

          {/* Banquet / Menu Highlights */}
          <div className="rounded-xl border border-[#d4af37]/30 bg-[#250b3a] p-4 space-y-3">
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#dfb548]">
              Royal Banquet & Dastarkhwan
            </span>
            <p className="text-[#ebd9bf] text-[11px]">
              The invitation features a curated 5-course feast: Rooh Afza Zafrani Sharbat, Nawabi Galouti Kebabs, Hyderabadi Dum Biryani, Shahi Mutton Rogan Josh, Dal Bukhara, and Shahi Tukda with Malai Rabri.
            </p>
          </div>

          {/* Invitation Message */}
          <div className="rounded-xl border border-[#d4af37]/30 bg-[#250b3a] p-4 space-y-2">
            <label className="block font-cinzel text-xs font-bold uppercase tracking-wider text-[#dfb548]">
              Personal Invitation Note
            </label>
            <textarea
              rows={2}
              value={formData.invitationMessage}
              onChange={(e) => setFormData({ ...formData, invitationMessage: e.target.value })}
              className="w-full rounded border border-[#d4af37]/40 bg-[#160424] px-3 py-2 text-white"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#d4af37]/30 pt-4">
          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 rounded-lg border border-[#d4af37]/60 bg-[#290c3f] px-3.5 py-2 text-xs font-cinzel font-semibold text-[#fce8a9] transition-all hover:bg-[#381156]"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Shareable Link'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-cinzel text-[#d4af37] hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndApply}
              className="rounded-lg border border-[#fce8a9] bg-gradient-to-r from-[#dfb548] to-[#996e1b] px-5 py-2 text-xs font-cinzel font-bold uppercase tracking-wider text-[#160424] shadow-md transition-transform hover:scale-105"
            >
              Apply Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
