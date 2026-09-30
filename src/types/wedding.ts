export interface Ceremony {
  id: string;
  name: string;
  subTitle: string;
  arabicName?: string;
  date: string; // e.g. "Friday, November 20, 2026"
  time: string; // e.g. "07:30 PM Onwards"
  venue: string;
  address: string;
  attire: string;
  icon: 'nikah' | 'walima' | 'mehendi' | 'haldi';
}

export interface MenuItem {
  name: string;
  description: string;
  type: 'non-veg' | 'veg' | 'beverage' | 'sweet';
  highlight?: boolean;
}

export interface MenuCategory {
  id: string;
  categoryName: string;
  categoryArabic?: string;
  subtitle: string;
  items: MenuItem[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  quote: string;
}

export interface GallerySettings {
  autoPlay: boolean;
  intervalSeconds: number;
  showQuotes: boolean;
  showThumbnails: boolean;
  aspectRatio: '4/3' | '16/9' | '1/1' | '16/10';
  frameStyle: 'royal-gold' | 'ornate-arch' | 'minimal-luxury';
}

export interface WeddingData {
  groomName: string;
  groomTitle: string;
  groomParents: string;
  groomBio?: string;
  groomPhoto: string;

  brideName: string;
  brideTitle: string;
  brideParents: string;
  brideBio?: string;
  bridePhoto: string;

  couplePhoto: string;
  coverImage: string;

  weddingDate: string; // ISO string or parsable date
  weddingVenueName: string;
  weddingAddress: string;
  googleMapsUrl: string;

  quranicVerseArabic: string;
  quranicVerseTranslation: string;
  quranicReference: string;

  invitationMessage: string;
  rsvpDeadline: string;
  ceremonies: Ceremony[];
  menu?: MenuCategory[];
  galleryPhotos?: GalleryPhoto[];
  gallerySettings?: GallerySettings;
}

export interface GuestDua {
  id: string;
  senderName: string;
  relationship: string;
  message: string;
  date: string;
  likes: number;
}

export interface RSVPResponse {
  name: string;
  email?: string;
  phone: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  ceremoniesAttending: string[];
  dietaryNotes?: string;
}
