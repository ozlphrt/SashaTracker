export interface DailyEntry {
  date: string; // ISO date
  dietCompliance: boolean;
  antibioticsTaken: boolean;
  bathApplied: boolean;
  earTreatment: boolean;
  itchingLevel: 0 | 1 | 2 | 3 | 4 | 5;
  woundStatus: "stable" | "improving" | "worse";
  notes?: string;
  photos: string[]; // base64 or blob references
}

export interface WeekData {
  week: number;
  days: DailyEntry[];
}

export interface ProgramData {
  weeks: WeekData[];
  createdAt: string;
  updatedAt: string;
}

export interface DogProfile {
  name: string;
  breed: string;
  age: number;
  weight: number;
  photo?: string; // base64 or blob reference
  vetName?: string;
  vetClinic?: string;
  protocolStartDate: string; // ISO date
}

