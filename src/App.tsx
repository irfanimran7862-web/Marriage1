/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { DEFAULT_WEDDING } from './data/defaultWedding';
import { WeddingData, GalleryPhoto, GallerySettings } from './types/wedding';
import FrontPageCover from './components/FrontPageCover';
import CoupleSection from './components/CoupleSection';
import CoupleGallery from './components/CoupleGallery';
import CountdownTimer from './components/CountdownTimer';
import CeremoniesTimeline from './components/CeremoniesTimeline';
import MenuSection from './components/MenuSection';
import VenueSection from './components/VenueSection';
import GuestDuas from './components/GuestDuas';
import RSVPSection from './components/RSVPSection';
import AudioPlayerFloating from './components/AudioPlayerFloating';
import PetalShower from './components/PetalShower';
import TopNav from './components/TopNav';
import CustomizerModal from './components/CustomizerModal';
import GallerySettingsModal from './components/GallerySettingsModal';
import ShareModal from './components/ShareModal';
import bgTexture from './assets/images/purple_gold_palace_bg_1790513872707.jpg';

export default function App() {
  const [wedding, setWedding] = useState<WeddingData>(DEFAULT_WEDDING);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isGallerySettingsOpen, setIsGallerySettingsOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  // Load saved gallery customizations from localStorage if present
  useEffect(() => {
    try {
      const savedGallery = localStorage.getItem('royal_wedding_gallery_v1');
      if (savedGallery) {
        const parsed = JSON.parse(savedGallery);
        if (parsed.photos && Array.isArray(parsed.photos)) {
          setWedding((prev) => ({
            ...prev,
            galleryPhotos: parsed.photos,
            gallerySettings: parsed.settings || prev.gallerySettings,
          }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Parse URL hash for shared custom invitations
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash.includes('invite=')) {
        const payloadStr = decodeURIComponent(hash.split('invite=')[1]);
        const data = JSON.parse(payloadStr);
        setWedding((prev) => ({
          ...prev,
          groomName: data.gn || prev.groomName,
          groomParents: data.gp || prev.groomParents,
          brideName: data.bn || prev.brideName,
          brideParents: data.bp || prev.brideParents,
          weddingVenueName: data.vn || prev.weddingVenueName,
          weddingAddress: data.va || prev.weddingAddress,
          weddingDate: data.dt || prev.weddingDate,
        }));
      }
    } catch {
      // ignore parsing errors
    }
  }, []);

  const handleOpenSurprise = () => {
    setIsOpened(true);
    // Smooth scroll to bride & groom details
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSaveGallery = (updatedPhotos: GalleryPhoto[], updatedSettings: GallerySettings) => {
    setWedding((prev) => ({
      ...prev,
      galleryPhotos: updatedPhotos,
      gallerySettings: updatedSettings,
    }));

    try {
      localStorage.setItem(
        'royal_wedding_gallery_v1',
        JSON.stringify({ photos: updatedPhotos, settings: updatedSettings })
      );
    } catch {
      // ignore localstorage errors (e.g. quota)
    }
  };

  return (
    <div className="relative min-h-screen bg-[#12051d] text-[#f5ebd6] selection:bg-[#dfb548]/30 selection:text-[#fff8db]">
      {/* Subtle Palace Background Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 -z-10 bg-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />

      {/* Floating Rose Petal & Jasmine Shower */}
      <PetalShower />

      {/* Persistent Floating Audio Player (Tum Hi Ho - Song Track) */}
      <AudioPlayerFloating />

      {/* Navigation Header */}
      <TopNav
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onShare={() => setIsShareOpen(true)}
      />

      <main>
        {/* Front Page with Sacred God Image / Divine Calligraphy & Surprise Reveal */}
        <FrontPageCover
          wedding={wedding}
          isOpened={isOpened}
          onOpenSurprise={handleOpenSurprise}
          onShare={() => setIsShareOpen(true)}
        />

        {/* Unveiled Surprise & Wedding Contents (Scrollable once revealed) */}
        <div ref={detailsRef} className="transition-opacity duration-1000">
          {/* Bride and Groom Photos & Details */}
          <CoupleSection wedding={wedding} />

          {/* Couple Gallery Carousel with Settings Control */}
          <CoupleGallery
            photos={wedding.galleryPhotos}
            settings={wedding.gallerySettings}
            onOpenSettings={() => setIsGallerySettingsOpen(true)}
          />

          {/* Countdown to Ceremony */}
          <CountdownTimer targetDate={wedding.weddingDate} />

          {/* Detailed Ceremonies (Haldi, Mehendi, Nikah, Walima) */}
          <CeremoniesTimeline ceremonies={wedding.ceremonies} />

          {/* Royal Banquet & Dastarkhwan Menu */}
          <MenuSection menu={wedding.menu} />

          {/* Venue & Location with Google Maps & Calendar */}
          <VenueSection wedding={wedding} />

          {/* Duas & Well Wishes Guestbook */}
          <GuestDuas />

          {/* RSVP Form */}
          <RSVPSection wedding={wedding} />
        </div>
      </main>

      {/* Royal Footer */}
      <footer className="relative border-t border-[#d4af37]/30 bg-[#100318] py-12 px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="font-arabic text-xl md:text-2xl text-[#fcedbb] font-bold">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">
            May Allah Bless Your Union With Boundless Love & Barakah
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          <p className="text-[11px] text-[#dfb548]/70 font-serif">
            With best compliments from the Imran & Ahmed families.
          </p>
        </div>
      </footer>

      {/* General Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        wedding={wedding}
        onSave={(updated) => setWedding(updated)}
        onOpenGallerySettings={() => {
          setIsCustomizerOpen(false);
          setIsGallerySettingsOpen(true);
        }}
      />

      {/* Dedicated Couple Gallery Settings Modal */}
      <GallerySettingsModal
        isOpen={isGallerySettingsOpen}
        onClose={() => setIsGallerySettingsOpen(false)}
        photos={wedding.galleryPhotos || []}
        settings={wedding.gallerySettings || {
          autoPlay: true,
          intervalSeconds: 4.5,
          showQuotes: true,
          showThumbnails: true,
          aspectRatio: '4/3',
          frameStyle: 'royal-gold',
        }}
        onSave={handleSaveGallery}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        wedding={wedding}
      />
    </div>
  );
}
