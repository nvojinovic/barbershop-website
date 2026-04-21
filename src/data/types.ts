export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'haircut' | 'beard' | 'combo' | 'treatment';
  popular?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  experience: number;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  initials: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  category: 'cut' | 'beard' | 'interior' | 'combo';
  colSpan?: 2;
  rowSpan?: 2;
}

export interface ContactInfo {
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: { day: string; time: string }[];
}

export interface BookingData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
}

export type BookingStep = 'service' | 'barber' | 'date' | 'time' | 'contact' | 'success';

export interface TimeSlot {
  time: string;
  available: boolean;
}
