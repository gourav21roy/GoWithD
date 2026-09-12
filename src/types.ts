export type Language = 'en' | 'bn' | 'hi';
export type GuestSide = 'all' | 'bride' | 'groom';

export interface EventDetail {
  id: 'wedding' | 'reception';
  badgeKey: string;
  titleKey: string;
  dateKey: string;
  timeKey: string;
  dateStr: string; // ISO or human format
  venueNameKey: string;
  venueAddressKey: string;
  mapsUrl: string;
  addressText: string;
  attireKey: string;
  highlightsKey: string;
  accentColor: string;
}

export interface RSVPRecord {
  id: string;
  name: string;
  phoneOrEmail: string;
  attendance: 'both' | 'wedding' | 'reception' | 'declined';
  guestCount: number;
  dietary: 'bengali_feast' | 'vegetarian' | 'jain' | 'no_preference';
  message: string;
  submittedAt: string;
}

export interface BlessingItem {
  id: string;
  name: string;
  relationship: string;
  message: string;
  tag: string;
  timestamp: string;
  likes: number;
  isCustom?: boolean;
}

export interface StoryMilestone {
  period: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
}
