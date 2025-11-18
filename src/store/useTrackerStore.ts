import { create } from 'zustand';
import { ProgramData, DailyEntry } from '../data/models';
import { initialProgram } from '../data/initialProtocol';
import { trackerDb } from '../db/trackerDb';

interface TrackerStore {
  program: ProgramData;
  isLoading: boolean;
  loadProgram: () => Promise<void>;
  saveProgram: () => Promise<void>;
  updateDay: (weekIndex: number, dayIndex: number, changes: Partial<DailyEntry>) => void;
  resetProgram: () => Promise<void>;
  importProgram: (data: ProgramData) => Promise<void>;
}

export const useTrackerStore = create<TrackerStore>((set, get) => ({
  program: initialProgram,
  isLoading: false,

  loadProgram: async () => {
    set({ isLoading: true });
    try {
      // Ensure database is open
      try {
        await trackerDb.open();
      } catch (openError: any) {
        // Database might already be open, ignore that error
        if (openError?.name !== 'DatabaseClosedError' && !openError?.message?.includes('already open')) {
          throw openError;
        }
      }
      
      const record = await trackerDb.program.get(1);
      if (record) {
        set({ program: record.data });
      } else {
        // Initialize with default program
        await trackerDb.program.add({ id: 1, data: initialProgram });
        set({ program: initialProgram });
      }
    } catch (error) {
      console.error('Failed to load program:', error);
      // Fallback to in-memory state if database fails
      set({ program: initialProgram });
    } finally {
      set({ isLoading: false });
    }
  },

  saveProgram: async () => {
    const { program } = get();
    try {
      try {
        await trackerDb.open();
      } catch (openError: any) {
        if (openError?.name !== 'DatabaseClosedError' && !openError?.message?.includes('already open')) {
          throw openError;
        }
      }
      
      const updatedProgram = {
        ...program,
        updatedAt: new Date().toISOString()
      };
      await trackerDb.program.put({ id: 1, data: updatedProgram });
      set({ program: updatedProgram });
    } catch (error) {
      console.error('Failed to save program:', error);
    }
  },

  updateDay: (weekIndex: number, dayIndex: number, changes: Partial<DailyEntry>) => {
    set((state) => {
      const newProgram = { ...state.program };
      const newWeeks = [...newProgram.weeks];
      const newWeek = { ...newWeeks[weekIndex] };
      const newDays = [...newWeek.days];
      newDays[dayIndex] = { ...newDays[dayIndex], ...changes };
      newWeek.days = newDays;
      newWeeks[weekIndex] = newWeek;
      newProgram.weeks = newWeeks;
      newProgram.updatedAt = new Date().toISOString();

      // Auto-save
      setTimeout(async () => {
        try {
          try {
            await trackerDb.open();
          } catch (openError) {
            if (!(openError as Error).message.includes('already open')) {
              throw openError;
            }
          }
          await trackerDb.program.put({ id: 1, data: newProgram });
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }, 100);

      return { program: newProgram };
    });
  },

  resetProgram: async () => {
    try {
      try {
        await trackerDb.open();
      } catch (openError: any) {
        if (openError?.name !== 'DatabaseClosedError' && !openError?.message?.includes('already open')) {
          throw openError;
        }
      }
      
      const freshProgram = {
        ...initialProgram,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await trackerDb.program.put({ id: 1, data: freshProgram });
      set({ program: freshProgram });
    } catch (error) {
      console.error('Failed to reset program:', error);
      // Fallback to in-memory reset
      const freshProgram = {
        ...initialProgram,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      set({ program: freshProgram });
    }
  },

  importProgram: async (data: ProgramData) => {
    try {
      try {
        await trackerDb.open();
      } catch (openError: any) {
        if (openError?.name !== 'DatabaseClosedError' && !openError?.message?.includes('already open')) {
          throw openError;
        }
      }
      
      const importedProgram = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      await trackerDb.program.put({ id: 1, data: importedProgram });
      set({ program: importedProgram });
    } catch (error) {
      console.error('Failed to import program:', error);
      // Fallback to in-memory import
      const importedProgram = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      set({ program: importedProgram });
    }
  }
}));

