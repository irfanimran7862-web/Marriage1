import { WeddingData, GuestDua, MenuCategory, GalleryPhoto, GallerySettings } from '../types/wedding';

// Import local high-resolution generated visual assets
import coverImg from '../assets/images/sacred_bismillah_arch_1790513842728.jpg';
import coupleImg from '../assets/images/royal_wedding_couple_1790513859996.jpg';
import groomImg from '../assets/images/groom_photo_portrait_1790513886527.jpg';
import brideImg from '../assets/images/bride_photo_portrait_1790513900797.jpg';
import coupleGardenImg from '../assets/images/couple_garden_walk_1790777058063.jpg';
import coupleSmileImg from '../assets/images/couple_candid_smile_1790777069901.jpg';
import coupleBalconyImg from '../assets/images/couple_royal_balcony_1790777082138.jpg';

export const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: coupleImg,
    title: 'Written in the Stars',
    subtitle: 'Mohammed Irfan & Ayesha Noor in Royal Attire',
    quote: '"And We created you in pairs." — Surah An-Naba (78:8)',
  },
  {
    id: 'photo-2',
    url: coupleGardenImg,
    title: 'Walking into Forever',
    subtitle: 'Hand in Hand Beneath Palace Arches & Lantern Glow',
    quote: '"With every step, my soul found its home in yours."',
  },
  {
    id: 'photo-3',
    url: coupleSmileImg,
    title: 'A Lifetime of Smiles',
    subtitle: 'Shared Laughter & Tender Blessings',
    quote: '"You are the tranquility and answered prayer of my heart."',
  },
  {
    id: 'photo-4',
    url: coupleBalconyImg,
    title: 'Under the Palace Stars',
    subtitle: 'A Sacred Promise of Eternal Devotion',
    quote: '"Two hearts bound by love, faith, and timeless grace."',
  },
];

export const DEFAULT_GALLERY_SETTINGS: GallerySettings = {
  autoPlay: true,
  intervalSeconds: 4.5,
  showQuotes: true,
  showThumbnails: true,
  aspectRatio: '4/3',
  frameStyle: 'royal-gold',
};

export const DEFAULT_MENU: MenuCategory[] = [
  {
    id: 'welcome',
    categoryName: 'Welcome Elixirs & Sharbats',
    categoryArabic: 'مشروبات الاستقبال والترحيب',
    subtitle: 'Chilled traditional refreshers to greet our esteemed guests',
    items: [
      {
        name: 'Rooh Afza Zafrani Sharbat',
        description: 'Chilled rose nectar blended with fragrant saffron milk, basil seeds (tukmaria) & fresh rose petals',
        type: 'beverage',
        highlight: true,
      },
      {
        name: 'Royal Kashmiri Saffron Kahwa',
        description: 'Simmered Kashmiri green tea leaves infused with whole saffron strands, cinnamon bark, cardamom & slivered almonds',
        type: 'beverage',
        highlight: false,
      },
      {
        name: 'Fresh Mint & Pudina Shikanji',
        description: 'Crisp sparkling limeade with bruised garden mint, roasted cumin & black mineral salt',
        type: 'beverage',
        highlight: false,
      },
    ],
  },
  {
    id: 'starters',
    categoryName: 'Shahi Muqabbilaat (Kebabs & Starters)',
    categoryArabic: 'المقبلات والمشويات الملكية',
    subtitle: 'Charcoal grilled delicacies and melt-in-mouth appetizers',
    items: [
      {
        name: 'Nawabi Galouti Kebab',
        description: 'Melt-in-mouth smoked minced lamb kebab slow-pan cooked with 32 secret fragrant spices and clarified butter',
        type: 'non-veg',
        highlight: true,
      },
      {
        name: 'Murgh Malai Tikka Lazeez',
        description: 'Boneless tender chicken morsels steeped in rich clotted cream, green cardamom and crushed white pepper, roasted in the tandoor',
        type: 'non-veg',
        highlight: false,
      },
      {
        name: 'Mutton Seekh Kebab Shahi',
        description: 'Spiced minced lamb infused with fresh coriander, mint & royal garam masala, grilled on iron skewers',
        type: 'non-veg',
        highlight: false,
      },
      {
        name: 'Paneer Tikka Angara',
        description: 'Soft cottage cheese cubes marinated in spiced mustard oil, hung curd, and roasted red chillies',
        type: 'veg',
        highlight: false,
      },
      {
        name: 'Crispy Dahi Ke Kebab',
        description: 'Crisp golden discs of spiced hung yogurt seasoned with roasted cumin, finely diced bell peppers & herbs',
        type: 'veg',
        highlight: true,
      },
    ],
  },
  {
    id: 'biryani',
    categoryName: 'The Royal Biryani Handi',
    categoryArabic: 'برياني الدوم الفاخر',
    subtitle: 'The timeless centerpiece of royal wedding feasts, slow cooked in sealed earthen handis',
    items: [
      {
        name: 'Hyderabadi Mutton Dum Biryani',
        description: 'Aged long-grain basmati rice layered with succulent kacchi gosht mutton, caramelized shallots, saffron milk & ghee, sealed with dough and cooked on dum',
        type: 'non-veg',
        highlight: true,
      },
      {
        name: 'Awadhi Zafrani Murgh Biryani',
        description: 'Fragrant Lucknowi chicken biryani flavored with mild spices, kewra water, rose essence and golden saffron threads',
        type: 'non-veg',
        highlight: false,
      },
      {
        name: 'Subz-e-Bahar Dum Biryani',
        description: 'Tender baby carrots, beans, green peas, and paneer cubes infused with whole spices and basmati rice',
        type: 'veg',
        highlight: false,
      },
      {
        name: 'Mirchi Ka Salan & Burhani Raita',
        description: 'Authentic Hyderabadi Bhavnagri chili curry in nutty sesame peanut gravy paired with thick roasted-garlic tempered yogurt',
        type: 'veg',
        highlight: true,
      },
    ],
  },
  {
    id: 'mains',
    categoryName: 'Dastarkhwan-e-Khaas (Royal Gravies & Breads)',
    categoryArabic: 'الأطباق الرئيسية والمخبوزات',
    subtitle: 'Simmered gravies, artisanal tandoor breads & accompaniments',
    items: [
      {
        name: 'Shahi Mutton Rogan Josh',
        description: 'Tender lamb cuts slow-braised in an aromatic crimson sauce of Kashmiri mirch, fennel seeds, and mace',
        type: 'non-veg',
        highlight: true,
      },
      {
        name: 'Dum Ka Murgh Nawabi',
        description: 'Whole chicken pieces gently cooked under steam in a velvety puree of roasted cashew nuts, melon seeds, and fried onions',
        type: 'non-veg',
        highlight: false,
      },
      {
        name: 'Dal Bukhara (Overnight Simmered)',
        description: 'Creamy black lentils and red kidney beans simmered for 18 hours over charcoal with churned butter and fresh tomato reduction',
        type: 'veg',
        highlight: false,
      },
      {
        name: 'Paneer Lababdar Nazakat',
        description: 'Rich cottage cheese in a rich tomato, ginger, and onion seed gravy garnished with grated paneer and kasuri methi',
        type: 'veg',
        highlight: false,
      },
      {
        name: 'Awadhi Sheermal & Roomali Roti',
        description: 'Traditional saffron-scented leavened sweet milk bread and paper-thin hand-stretched roomali rotis baked on an inverted kadhai',
        type: 'veg',
        highlight: true,
      },
      {
        name: 'Tandoori Butter Garlic Naan',
        description: 'Soft crisp tandoor flatbread brushed with fresh garlic butter, nigella seeds, and fresh coriander leaves',
        type: 'veg',
        highlight: false,
      },
    ],
  },
  {
    id: 'desserts',
    categoryName: 'Shahi Meetha & Halwai (Royal Desserts)',
    categoryArabic: 'الحلويات الملكية والمسك',
    subtitle: 'Celebratory sweets, earthen pot puddings and digestive paan',
    items: [
      {
        name: 'Royal Shahi Tukda with Malai Rabri',
        description: 'Crispy ghee-fried brioche soaked in cardamom sugar syrup, crowned with thick saffron clotted rabri and silver warq',
        type: 'sweet',
        highlight: true,
      },
      {
        name: 'Zafrani Matka Phirni',
        description: 'Finely ground basmati rice pudding slow-simmered in rich buffalo milk with green cardamom, served chilled in clay pots',
        type: 'sweet',
        highlight: false,
      },
      {
        name: 'Warm Gulab Jamun with Crushed Pista',
        description: 'Velvety khoya dumplings dipped in rosewater sugar nectar, garnished with roasted Iranian pistachios',
        type: 'sweet',
        highlight: false,
      },
      {
        name: 'Royal Pista Kulfi Falooda',
        description: 'Traditional slow-reduced milk kulfi topped with fragrant rose syrup, sweet vermicelli, and chia seeds',
        type: 'sweet',
        highlight: false,
      },
      {
        name: 'Banarasi Meetha Paan & Shahi Mukhwas',
        description: 'Fresh betel leaf filled with sweet gulkand (rose jam), fennel seeds, candied fruits, desiccated coconut & silver leaf',
        type: 'sweet',
        highlight: true,
      },
    ],
  },
];

export const DEFAULT_WEDDING: WeddingData = {
  groomName: 'Mohammed Irfan',
  groomTitle: 'Son of',
  groomParents: 'Mr. Mohammed Imran & Mrs. Parveen Begum',
  groomBio: 'Software Engineer & Entrepreneur with a warm heart, deep reverence for family values, and a passion for travel and technology.',
  groomPhoto: groomImg,

  brideName: 'Ayesha Noor',
  brideTitle: 'Daughter of',
  brideParents: 'Mr. Farooq Ahmed & Mrs. Shabana Begum',
  brideBio: 'Creative Architectural Designer, passionate about Islamic calligraphy, garden botany, and bringing warmth to every space.',
  bridePhoto: brideImg,

  couplePhoto: coupleImg,
  coverImage: coverImg,

  // Set to a date in future: November 20, 2026
  weddingDate: '2026-11-20T18:30:00',
  weddingVenueName: 'Sree Convention',
  weddingAddress: 'Near Vatluru, Eluru, West Godavari District, Andhra Pradesh - 534007',
  googleMapsUrl: 'https://maps.google.com/?q=Sree+Convention+Near+Vatluru+Eluru',

  quranicVerseArabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  quranicVerseTranslation: 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.',
  quranicReference: 'Surah Ar-Rum (30:21)',

  invitationMessage: 'With the heavenly blessings of Almighty Allah, we cordially invite you and your family to celebrate the auspicious Nikah and union of hearts of our beloved son and daughter. Your esteemed presence and gracious prayers will grace this joyous milestone in our lives.',
  rsvpDeadline: 'November 10, 2026',

  ceremonies: [
    {
      id: 'haldi',
      name: 'Haldi & Mayun Celebration',
      subTitle: 'Golden Radiance & Auspicious Turmeric Rituals',
      arabicName: 'مراسم الحناء والكركم',
      date: 'Thursday, November 19, 2026',
      time: '04:00 PM Onwards',
      venue: 'Sree Convention, Lawn Pavilion',
      address: 'Near Vatluru, Eluru, Andhra Pradesh',
      attire: 'Shades of Marigold Yellow & Festive Floral Pastels',
      icon: 'haldi',
    },
    {
      id: 'mehendi',
      name: 'Mehendi & Sangeet Raat',
      subTitle: 'Fragrance of Henna & Melodious Celebrations',
      arabicName: 'ليلة الحناء والبهجة',
      date: 'Thursday, November 19, 2026',
      time: '07:30 PM Onwards',
      venue: 'Sree Convention, Open Courtyard',
      address: 'Near Vatluru, Eluru, Andhra Pradesh',
      attire: 'Emerald Green, Teal, & Shimmering Gold Accents',
      icon: 'mehendi',
    },
    {
      id: 'nikah',
      name: 'Auspicious Nikah Ceremony',
      subTitle: 'Sacred Covenant of Marriage Under Divine Grace',
      arabicName: 'مراسم عقد القران المقدس',
      date: 'Friday, November 20, 2026',
      time: '06:30 PM (Auspicious Ijab-o-Qubool)',
      venue: 'Sree Convention, Main Central Hall',
      address: 'Near Vatluru, Eluru, Andhra Pradesh',
      attire: 'Royal Purple, Rich Ivory & Embellished Traditional Formals',
      icon: 'nikah',
    },
    {
      id: 'walima',
      name: 'Royal Walima (Grand Reception)',
      subTitle: 'Feast of Gratitude & Joyous Banquet',
      arabicName: 'وليمة العرس المبارك',
      date: 'Saturday, November 21, 2026',
      time: '07:30 PM Onwards',
      venue: 'Sree Convention, Grand Reception & Banquet Lawn',
      address: 'Near Vatluru, Eluru, Andhra Pradesh',
      attire: 'Regal Black Tie / Opulent Traditional Evening Wear',
      icon: 'walima',
    },
  ],
  menu: DEFAULT_MENU,
  galleryPhotos: DEFAULT_GALLERY_PHOTOS,
  gallerySettings: DEFAULT_GALLERY_SETTINGS,
};

export const INITIAL_DUAS: GuestDua[] = [
  {
    id: 'dua-1',
    senderName: 'Uncle Tariq & Family',
    relationship: 'Groom’s Family',
    message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير (Barakallahu lakuma wa baraka alaykuma wa jama\'a baynakuma fee khayr). May Allah shower your union with infinite happiness, boundless peace, and abundant barakah!',
    date: 'Yesterday',
    likes: 18,
  },
  {
    id: 'dua-2',
    senderName: 'Dr. Zameer & Samina Begum',
    relationship: 'Bride’s Grandparents',
    message: 'May your home be filled with laughter, your hearts with tender mercy, and your steps guided together on the path of piety. Congratulations to Irfan and Ayesha!',
    date: '2 days ago',
    likes: 24,
  },
  {
    id: 'dua-3',
    senderName: 'Hamza, Bilal & College Friends',
    relationship: 'Groom’s Friends',
    message: 'So incredibly overjoyed for you both! Can’t wait to celebrate the grand Nikah and dance to Tum Hi Ho! Mubarak Irfan Bhai!',
    date: '3 days ago',
    likes: 15,
  },
];

