import type { Service, TeamMember, Testimonial, GalleryItem, ContactInfo, TimeSlot } from './types';

export const services: Service[] = [
  { id: 'classic-cut',     name: 'Classic Cut',      description: 'Präziser Haarschnitt mit Waschen, Schneiden und professionellem Finish.',              price: 35, duration: 45, category: 'haircut' },
  { id: 'fade-cut',        name: 'Fade & Taper',     description: 'Moderner Fade-Schnitt mit sauberem Übergang – von skin bis high fade.',                 price: 42, duration: 55, category: 'haircut', popular: true },
  { id: 'beard-trim',      name: 'Beard Trim',       description: 'Konturierung, Shaping und Pflege deines Bartes mit Öl-Finish.',                         price: 25, duration: 30, category: 'beard' },
  { id: 'hot-shave',       name: 'Hot Towel Shave',  description: 'Traditionelle Nassrasur mit heißem Tuch, Dampf und Rasiermesser.',                       price: 38, duration: 45, category: 'beard' },
  { id: 'cut-beard',       name: 'Cut & Beard',      description: 'Das komplette Paket: Haarschnitt und Bartpflege in einer Session.',                      price: 58, duration: 75, category: 'combo', popular: true },
  { id: 'grooming-ritual', name: 'Grooming Ritual',  description: 'Premium-Behandlung mit Haarschnitt, Hot Towel Shave und Kopfmassage.',                   price: 78, duration: 90, category: 'treatment' },
  { id: 'kids-cut',        name: 'Kids Cut',         description: 'Entspannter Haarschnitt für Jungs bis 14 Jahre.',                                        price: 22, duration: 30, category: 'haircut' },
  { id: 'grey-blending',   name: 'Grey Blending',    description: 'Natürliche Auffrischung grauer Haare mit sanfter Tönung.',                               price: 55, duration: 60, category: 'treatment' },
];

export const team: TeamMember[] = [
  {
    id: 'marco',
    name: 'Marco Ferretti',
    role: 'Head Barber & Gründer',
    bio: 'Mit über 12 Jahren Erfahrung in Wien und Mailand steht Marco für Präzision, Leidenschaft und den unverwechselbaren NOIR-Style.',
    specialties: ['Skin Fades', 'Klassische Rasur', 'Bartdesign'],
    experience: 12,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 'stefan',
    name: 'Stefan Weber',
    role: 'Senior Barber',
    bio: 'Stefan kombiniert traditionelle Barbier-Techniken mit modernen Trends. Sein Spezialgebiet: Texturen und strukturierte Schnitte.',
    specialties: ['Textured Cuts', 'Modern Fades', 'Scissor Work'],
    experience: 8,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    id: 'alex',
    name: 'Alex Müller',
    role: 'Beard Specialist',
    bio: 'Alex ist unser Experte für Bartformung und Hot Towel Shaves. Jeder Besuch bei ihm ist eine echte Auszeit vom Alltag.',
    specialties: ['Beard Sculpting', 'Hot Towel Shave', 'Facial Grooming'],
    experience: 6,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    id: 'leon',
    name: 'Leon Schreiber',
    role: 'Junior Barber',
    bio: 'Leon bringt frischen Wind ins Team. Mit Präzision und Kreativität entwickelt er seinen eigenen Stil – modern, sauber, zeitlos.',
    specialties: ['Drop Fades', 'Line-ups', 'Design Cuts'],
    experience: 3,
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Lukas Berger',    rating: 5, text: 'Bester Barbershop in Wien, ohne Zweifel. Marco hat mir genau den Fade gemacht, den ich wollte. Einfach Klasse.',                          date: 'März 2024',    service: 'Fade & Taper',    initials: 'LB' },
  { id: 't2', name: 'Thomas Huber',    rating: 5, text: 'Das Hot Towel Shave Erlebnis ist unglaublich. Man fühlt sich danach wie neu geboren. Das NOIR ist mehr als ein Barbershop – es ist ein Ritual.', date: 'Februar 2024', service: 'Hot Towel Shave', initials: 'TH' },
  { id: 't3', name: 'David Schneider', rating: 5, text: 'Seit 2 Jahren komme ich regelmäßig hier. Das Team kennt mich, weiß was ich will, und der Kaffee ist auch top. Das Grooming Ritual ist einfach Pflicht.', date: 'April 2024', service: 'Grooming Ritual', initials: 'DS' },
  { id: 't4', name: 'Jonas Klein',     rating: 5, text: 'Stefan hat meinem Haar neues Leben eingehaucht. Textur und Struktur, genau wie ich es wollte. Das Ambiente ist stilvoll und entspannt zugleich.', date: 'Januar 2024', service: 'Classic Cut',     initials: 'JK' },
  { id: 't5', name: 'Michael Braun',   rating: 5, text: 'Alex ist ein Meister seines Fachs. Mein Bart sieht aus wie bei einem Magazin-Shooting. Komme nie wieder woanders hin.',                       date: 'März 2024',    service: 'Cut & Beard',     initials: 'MB' },
  { id: 't6', name: 'Felix Wagner',    rating: 5, text: 'Hatte noch nie einen so präzisen Line-up. Leon hat es perfekt hinbekommen. Sehr empfehlenswert für alle, die es sauber mögen.',                  date: 'April 2024',   service: 'Fade & Taper',    initials: 'FW' },
];

export const gallery: GalleryItem[] = [
  { id: 'g1', imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=700&q=80', alt: 'Präziser Fade Haarschnitt',     category: 'cut',      rowSpan: 2 },
  { id: 'g2', imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80', alt: 'Klassischer Barberstuhl',       category: 'interior' },
  { id: 'g3', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80', alt: 'Barber bei der Arbeit',          category: 'cut' },
  { id: 'g4', imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=700&q=80', alt: 'Professionelle Barbierschere',   category: 'interior', colSpan: 2 },
  { id: 'g5', imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80', alt: 'Barber Portrait',                category: 'cut',      rowSpan: 2 },
  { id: 'g6', imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80', alt: 'Barbershop Atmosphäre',          category: 'interior' },
  { id: 'g7', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', alt: 'Bart Trimmen Detail',            category: 'beard' },
  { id: 'g8', imageUrl: 'https://images.unsplash.com/photo-1560707854-fb9c25e0b1e6?w=700&q=80',   alt: 'Bart Design Closeup',            category: 'beard',    colSpan: 2 },
];

export const contactInfo: ContactInfo = {
  address: 'Mariahilfer Straße 42',
  city: '1060 Wien',
  phone: '+43 1 234 5678',
  email: 'hallo@noir-barbershop.at',
  hours: [
    { day: 'Montag – Freitag', time: '09:00 – 20:00' },
    { day: 'Samstag',          time: '09:00 – 18:00' },
    { day: 'Sonntag',          time: 'Geschlossen' },
  ],
};

export const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true  },
  { time: '09:30', available: true  },
  { time: '10:00', available: false },
  { time: '10:30', available: true  },
  { time: '11:00', available: true  },
  { time: '11:30', available: false },
  { time: '12:00', available: true  },
  { time: '12:30', available: false },
  { time: '13:00', available: true  },
  { time: '13:30', available: true  },
  { time: '14:00', available: false },
  { time: '14:30', available: true  },
  { time: '15:00', available: true  },
  { time: '15:30', available: true  },
  { time: '16:00', available: false },
  { time: '16:30', available: true  },
  { time: '17:00', available: true  },
  { time: '17:30', available: false },
  { time: '18:00', available: true  },
  { time: '18:30', available: true  },
  { time: '19:00', available: true  },
  { time: '19:30', available: false },
];
