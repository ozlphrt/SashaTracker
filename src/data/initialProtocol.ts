import { ProgramData } from './models';

export const initialProgram: ProgramData = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  weeks: Array.from({ length: 12 }, (_, i) => ({
    week: i + 1,
    days: Array.from({ length: 7 }, (_, j) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + (i * 7) + j);
      return {
        date: dayDate.toISOString().split('T')[0],
        dietCompliance: false,
        antibioticsTaken: false,
        bathApplied: false,
        earTreatment: false,
        itchingLevel: 0,
        woundStatus: "stable" as const,
        notes: "",
        photos: []
      };
    })
  }))
};

