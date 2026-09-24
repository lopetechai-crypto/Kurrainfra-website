// Asset URL helper to support both local dev and production base paths (e.g. GitHub Pages)
export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};

// Hero frame sequence filenames from /hero_intro/ folder (300 frames)
export const HERO_FRAMES = Array.from(
  { length: 300 },
  (_, i) => getAssetUrl(`hero_intro/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`)
);

// Project Images from /kurra/ folder
export const KURRA_IMAGES = {
  heroReveal: getAssetUrl('kurra/1.png'),
  scaleVisual: getAssetUrl('kurra/2.png'),
  interiors: getAssetUrl('kurra/3.png'),
  bedroom: getAssetUrl('kurra/4.png'),
  clubhouse: getAssetUrl('kurra/5.png'),
  pool: getAssetUrl('kurra/6.png'),
  fitness: getAssetUrl('kurra/7.png'),
  lounge: getAssetUrl('kurra/8.png'),
};

// Project Statistics
export const PROJECT_STATS = [
  { label: 'Acres', value: 3.65, prefix: '', suffix: '', isDecimal: true },
  { label: 'Towers', value: 2, prefix: '', suffix: '' },
  { label: 'Floors', value: 50, prefix: 'G+', suffix: '' },
  { label: 'sq.ft. Lifestyle Amenities', value: 81840, prefix: '', suffix: '', formatted: '81,840' },
  { label: 'Total Units', value: 194, prefix: '', suffix: '' },
  { label: 'Car Parking Spaces', value: 840, prefix: '', suffix: '' },
  { label: 'Basement Floors', value: 4, prefix: '', suffix: '' },
  { label: 'Residence Type', value: 4, prefix: '', suffix: ' BHK', isString: '4BHK' }
];

// Why Choose Amaris Highlights
export const AMARIS_HIGHLIGHTS = [
  {
    title: "Iconic Twin Towers",
    description: "Rising 50 storeys into Financial District's skyline, standing as architectural landmarks of Hyderabad."
  },
  {
    title: "Expansive 4 BHK Residences",
    description: "Masterfully crafted residences engineered for grand living, privacy, and seamless indoor-outdoor transitions."
  },
  {
    title: "Private Plunge Pools & Decks",
    description: "Exclusive sky pools integrated into select residence decks offering breathtaking panoramic sunset vistas."
  },
  {
    title: "Triple-Height Grand Lobby",
    description: "An awe-inspiring arrival experience designed with imported marble, brass accents, and soaring glass facades."
  },
  {
    title: "81,840 sq.ft. Lifestyle Amenities",
    description: "A comprehensive sanctuary featuring state-of-the-art wellness, leisure, and entertainment facilities."
  },
  {
    title: "Grand Clubhouse & Gardens",
    description: "Naturally contoured topography embracing curated botanical gardens, water cascades, and private lounges."
  }
];

// Experience Amaris Directional Gallery Items featuring authentic imagery from Interiors, Exterior, and Club House & Play Area
export const EXPERIENCE_SCENES = [
  {
    id: 1,
    title: "ICONIC TWIN TOWERS",
    subtitle: "G+50 Architectural Landmark of Hyderabad",
    category: "Exterior",
    image: getAssetUrl('experience/exterior_twin_towers.jpg'),
    direction: 'left',
    description: "Rising 50 storeys into Financial District's skyline, Amaris stands as a masterwork of modern architectural engineering, combining aerodynamic glass facades with naturally contoured podium landscapes."
  },
  {
    id: 2,
    title: "TRIPLE-HEIGHT GRAND LOBBY",
    subtitle: "Soaring Arrival Sanctuary & Reception",
    category: "Interiors",
    image: getAssetUrl('experience/interior_grand_lobby.jpg'),
    direction: 'right',
    description: "An awe-inspiring arrival experience crafted with imported book-matched marble, brushed champagne bronze accents, and ambient indirect lighting designed to evoke immediate grandeur."
  },
  {
    id: 3,
    title: "THE GRAND BANQUET HALL",
    subtitle: "81,840 sq.ft. Multi-Level Lifestyle Hub",
    category: "Club House",
    image: getAssetUrl('experience/clubhouse_banquet_hall.jpg'),
    direction: 'left',
    description: "An opulent multi-tier social haven featuring private dining suites, executive gala ballrooms, and custom crystal lighting installations designed for high-society entertaining."
  },
  {
    id: 4,
    title: "DOUBLE-HEIGHT FAMILY ROOM",
    subtitle: "Expansive Living & Dining Sanctuaries",
    category: "Interiors",
    image: getAssetUrl('experience/interior_living_dining.jpg'),
    direction: 'right',
    description: "Sprawling open-plan living environments framed by floor-to-ceiling glass walling, providing uninterrupted 270-degree panoramas across Hyderabad's Financial District."
  },
  {
    id: 5,
    title: "HYDROTHERAPY SKY POOL",
    subtitle: "Temperature-Controlled Infinity Pool & Deck",
    category: "Club House",
    image: getAssetUrl('experience/clubhouse_hydro_pool.jpg'),
    direction: 'left',
    description: "Immerse in pure serenity surrounded by ambient warm stone lighting, hydro-massage loungers, and expansive sunbathing decks overlooking the contoured botanical gardens."
  },
  {
    id: 6,
    title: "MASTER SUITE RETREAT",
    subtitle: "Restorative Bedrooms with Private Sky Decks",
    category: "Interiors",
    image: getAssetUrl('experience/interior_master_suite.jpg'),
    direction: 'right',
    description: "Quiet luxury refined for restorative rest. Features bespoke timber panelling, spa-inspired ensuite bathrooms, and direct access to private plunge pool decks."
  },
  {
    id: 7,
    title: "INDOOR GAMES & LEISURE SALON",
    subtitle: "Billiards, Cards & Executive Sports Hub",
    category: "Club House",
    image: getAssetUrl('experience/clubhouse_games_lounge.jpg'),
    direction: 'left',
    description: "A sophisticated entertainment lounge equipped with championship billiards tables, private poker salons, VR gaming simulators, and bespoke leather seating."
  },
  {
    id: 8,
    title: "CHILDREN'S PLAY SANCTUARY",
    subtitle: "Vehicle-Free Podium & Botanical Gardens",
    category: "Play Area",
    image: getAssetUrl('experience/play_area_sanctuary.jpg'),
    direction: 'right',
    description: "A safe, vehicle-free outdoor haven set amidst 3.65 acres of contoured botanical greenery, cascading water features, and soft-impact play zones for young minds."
  },
  {
    id: 9,
    title: "DRAMATIC NIGHT SKYLINE",
    subtitle: "Architectural Lighting Beacon at Dusk",
    category: "Exterior",
    image: getAssetUrl('experience/exterior_night_skyline.jpg'),
    direction: 'left',
    description: "As twilight settles over Hyderabad, Amaris transforms into a glowing architectural beacon with custom linear vertical LED accents highlighting its G+50 crown."
  },
  {
    id: 10,
    title: "CONTOURED BOTANICAL PODIUM",
    subtitle: "80% Open Green Space & Water Cascades",
    category: "Exterior",
    image: getAssetUrl('experience/exterior_podium_landscape.jpg'),
    direction: 'right',
    description: "Naturally contoured topography integrating native flora, ambient stone pathways, tranquil reflecting pools, and private outdoor reading nooks."
  }
];

// Floor & Layout Plans Data using authentic architectural drawings from /layouts/
export const FLOOR_PLANS = [
  {
    id: 'residence-type-a',
    code: 'TYPE A - 4BHK RESIDENCE',
    area: '4,250 SQ.FT.',
    facing: 'EAST FACING',
    image: getAssetUrl('layouts/layout_1.jpg'),
    features: [
      'Private Lift Lobby & Vestibule',
      'Plunge Pool Deck (24\' x 10\')',
      'Double-Height Grand Living Room',
      'Italian Marble Flooring',
      'Ensuite Maid Quarters'
    ]
  },
  {
    id: 'residence-type-b',
    code: 'TYPE B - 4BHK SKY VILLA',
    area: '4,850 SQ.FT.',
    facing: 'WEST FACING',
    image: getAssetUrl('layouts/layout_2.jpg'),
    features: [
      '360° Corner View Deck',
      'Master Spa Suite with Jacuzzi',
      'Dual Chef & Show Kitchens',
      'Biometric Entry Automation',
      'Private Wine Cellar Storage'
    ]
  },
  {
    id: 'residence-type-c',
    code: 'TYPE C - 4BHK PENTHOUSE',
    area: '5,400 SQ.FT.',
    facing: 'NORTH-EAST FACING',
    image: getAssetUrl('layouts/layout_3.jpg'),
    features: [
      'Duplex Sky Deck & Garden',
      'Private Temperature-Controlled Pool',
      'Soaring 14ft Ceiling Heights',
      'Custom Walk-In Wardrobe',
      'Dedicated Service Lift Lobby'
    ]
  },
  {
    id: 'residence-type-d',
    code: 'TYPE D - 4BHK DUPLEX VILLA',
    area: '6,100 SQ.FT.',
    facing: 'PANORAMIC FACING',
    image: getAssetUrl('layouts/layout_4.jpg'),
    features: [
      'Double-Height Sunset Lounge',
      'Triple Master Bedroom Suites',
      'Private Hydrotherapy Spa',
      'Smart Climate & Lighting Control',
      'Direct Elevator Access'
    ]
  },
  {
    id: 'clubhouse-level-1',
    code: 'CLUBHOUSE - WELLNESS & SPA',
    area: '18,500 SQ.FT.',
    facing: 'PODIUM LEVEL',
    image: getAssetUrl('layouts/layout_5.jpg'),
    features: [
      'Hydrotherapy Pool & Sauna',
      'Technogym Fitness Studio',
      'Pilates & Meditation Decks',
      'Private Treatment Rooms',
      'Juice Bar & Restorative Lounge'
    ]
  },
  {
    id: 'clubhouse-level-2',
    code: 'CLUBHOUSE - LEISURE & SPORTS',
    area: '22,000 SQ.FT.',
    facing: 'LEVEL 02',
    image: getAssetUrl('layouts/layout_6.jpg'),
    features: [
      'Indoor Badminton Courts',
      'Squash Court & Billiards Salon',
      'Executive Business Hub',
      '24-Seater Dolby Atmos Cinema',
      'Grand Banquet & Party Hall'
    ]
  },
  {
    id: 'podium-landscape',
    code: 'PODIUM & BOTANICAL GARDENS',
    area: '3.65 ACRES',
    facing: 'LANDSCAPE PLAN',
    image: getAssetUrl('layouts/layout_7.jpg'),
    features: [
      'Cascading Water Features',
      'Vehicle-Free Pedestrian Zone',
      'Children\'s Play Sanctuary',
      'Reflecting Pools & Pavilions',
      'Contoured Jogging Track'
    ]
  },
  {
    id: 'basement-parking',
    code: 'PARKING & SERVICES PLAN',
    area: '840 CAR SPACES',
    facing: '4 BASEMENT FLOORS',
    image: getAssetUrl('layouts/layout_8.jpg'),
    features: [
      'EV Charging Stations per Slot',
      'Driver Lounge & Rest Facilities',
      'High-Speed Access Ramps',
      'Automated Number Plate Reader',
      '24/7 Monitored Surveillance'
    ]
  },
  {
    id: 'tower-a-typical',
    code: 'TOWER A - TYPICAL FLOOR PLAN',
    area: 'G+50 FLOORS',
    facing: 'TOWER A',
    image: getAssetUrl('layouts/layout_9.jpg'),
    features: [
      'Only 2 Units Per Floor',
      '3 High-Speed Passenger Lifts',
      '1 Dedicated Stretcher/Service Lift',
      'Pressurized Fire Escape Stairs',
      'Acoustically Isolated Core'
    ]
  },
  {
    id: 'tower-b-typical',
    code: 'TOWER B - TYPICAL FLOOR PLAN',
    area: 'G+50 FLOORS',
    facing: 'TOWER B',
    image: getAssetUrl('layouts/layout_10.jpg'),
    features: [
      'Corner Balconies on Every Unit',
      'Zero Direct Visibility Between Units',
      'Maximum Cross-Ventilation',
      'Refuge Floors at Interval Levels',
      'Seismic Zone Zone-III Compliant'
    ]
  },
  {
    id: 'sky-deck-lounge',
    code: 'SKY DECK & POOL LAYOUT',
    area: 'ROOFTOP LEVEL',
    facing: 'LEVEL 50',
    image: getAssetUrl('layouts/layout_11.jpg'),
    features: [
      'Infinity Pool Overlooking Skyline',
      'Stargazing Observatory Deck',
      'Open-Air Firepit Lounge',
      'Sky BBQ & Cocktail Bar',
      'Wind-Buffered Perimeter Glass'
    ]
  },
  {
    id: 'master-site-plan',
    code: 'AMARIS MASTER SITE PLAN',
    area: '3.65 ACRES',
    facing: 'FINANCIAL DISTRICT',
    image: getAssetUrl('layouts/layout_12.jpg'),
    features: [
      '80% Open Green Space',
      'IGBC Platinum Certification',
      'Twin G+50 Iconic Silhouette',
      'Perimeter Security Buffer',
      'Central Contoured Courtyard'
    ]
  }
];
