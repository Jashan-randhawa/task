export type HiringCategory = 'planner' | 'performer' | 'crew';

export type RequirementPayload = {
  eventName: string;
  eventType: string;
  dateType: 'single' | 'range';
  startDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  hiringFor: HiringCategory;
  details: Record<string, string | number | boolean>;
};
