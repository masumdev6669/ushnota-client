export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  createdAt: string;
  joinedCount?: number;
}

export const EVENT_TYPES = [
  "Winter Clothes Distribution",
  "Blanket Distribution",
  "Food Distribution",
  "Community Meal",
  "Winter Relief Camp",
];
