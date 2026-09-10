import { EventDetail, BlessingItem, StoryMilestone } from '../types';

export const weddingEvents: EventDetail[] = [
  {
    id: 'wedding',
    badgeKey: 'event-wedding-badge',
    titleKey: 'event-wedding-title',
    dateKey: 'wedding-date',
    timeKey: 'wedding-time',
    dateStr: '2026-11-21',
    venueNameKey: 'wedding-venue-name',
    venueAddressKey: 'wedding-venue-address',
    mapsUrl: 'https://maps.app.goo.gl/z6CoHpzGBdqKQCBa9',
    addressText: 'Navnir Farms and Banquets, Diamond Harbour Road, Kolkata, West Bengal 700104',
    attireKey: 'wedding-attire',
    highlightsKey: 'wedding-highlights',
    accentColor: 'from-amber-400 to-amber-600'
  },
  {
    id: 'reception',
    badgeKey: 'event-reception-badge',
    titleKey: 'event-reception-title',
    dateKey: 'reception-date',
    timeKey: 'reception-time',
    dateStr: '2026-11-23',
    venueNameKey: 'reception-venue-name',
    venueAddressKey: 'reception-venue-address',
    mapsUrl: 'https://maps.app.goo.gl/Ju5hbstbMLpXwMgU7',
    addressText: 'DTC Southern Heights, Joka, Diamond Harbour Road, Kolkata, West Bengal 700104',
    attireKey: 'reception-attire',
    highlightsKey: 'reception-highlights',
    accentColor: 'from-red-600 to-rose-800'
  }
];

export const storyMilestones: StoryMilestone[] = [
  {
    period: '2023',
    titleKey: 'story-1-title',
    descriptionKey: 'story-1-desc',
    icon: 'Sparkles'
  },
  {
    period: '2024',
    titleKey: 'story-2-title',
    descriptionKey: 'story-2-desc',
    icon: 'Coffee'
  },
  {
    period: '2025',
    titleKey: 'story-3-title',
    descriptionKey: 'story-3-desc',
    icon: 'HeartHandshake'
  },
  {
    period: 'Nov 2026',
    titleKey: 'story-4-title',
    descriptionKey: 'story-4-desc',
    icon: 'Crown'
  }
];

export const initialBlessings: BlessingItem[] = [];
