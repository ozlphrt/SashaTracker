import { create } from 'zustand';
import { ProgramData, DailyEntry } from '../data/models';
import { initialProgram } from '../data/initialProtocol';
import { trackerDb } from '../db/trackerDb';
import { syncService } from '../services/syncService';

interface TrackerStore {
  program: ProgramData;
  isLoading: boolean;
  isSyncing: boolean;
  syncEnabled: boolean;
  loadProgram: () => Promise<void>;
  saveProgram: () => Promise<void>;
  updateDay: (weekIndex: number, dayIndex: number, changes: Partial<DailyEntry>) => void;
  resetProgram: () => Promise<void>;
  importProgram: (data: ProgramData) => Promise<void>;
}

export const useTrackerStore = create<TrackerStore>((set, get) => ({
  program: initialProgram,
  isLoading: false,
  isSyncing: false,
  syncEnabled: false,

  loadProgram: async () => {
    set({ isLoading: true });
    try {
      // Set up callback for cloud data changes
      syncService.setOnDataChange((data: ProgramData) => {
        set({ program: data });
      });
      
      // Initialize sync service (required - will throw if Firebase not configured)
      try {
        const syncInitialized = await syncService.initialize();
        set({ syncEnabled: syncInitialized });
        
        if (!syncInitialized) {
          throw new Error('Sync initialization failed');
        }
      } catch (error) {
        // Re-throw sync errors so App can show setup page
        throw error;
      }

      // Ensure database is open
      try {
        await trackerDb.open();
      } catch (openError: any) {
        // Database might already be open, ignore that error
        if (openError?.name !== 'DatabaseClosedError' && !openError?.message?.includes('already open')) {
          throw openError;
        }
      }

      // Load from cloud first (sync is required)
      set({ isSyncing: true });
      try {
        const cloudData = await syncService.loadFromCloud();
        if (cloudData) {
          // Save cloud data to local DB
          await trackerDb.program.put({ id: 1, data: cloudData });
          set({ program: cloudData });
          set({ isSyncing: false });
          return;
        }
      } catch (error) {
        console.error('Failed to load from cloud:', error);
        // Continue to local fallback
      }
      set({ isSyncing: false });
      
      // Load from local database (fallback)
      const record = await trackerDb.program.get(1);
      if (record) {
        set({ program: record.data });
        // Sync local data to cloud
        syncService.syncToCloud(record.data).catch(console.error);
      } else {
        // Initialize with default program
        await trackerDb.program.add({ id: 1, data: initialProgram });
        set({ program: initialProgram });
        // Sync initial program to cloud
        syncService.syncToCloud(initialProgram).catch(console.error);
      }
    } catch (error) {
      console.error('Failed to load program:', error);
      // If it's a sync error, re-throw it so App can show setup page
      if (error instanceof Error && error.message.includes('Firebase')) {
        throw error;
      }
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
      
      // Sync to cloud (required)
      syncService.syncToCloud(updatedProgram).catch(console.error);
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
          
          // Sync to cloud (required)
          syncService.syncToCloud(newProgram).catch(console.error);
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
      
      // Sync to cloud (required)
      syncService.syncToCloud(freshProgram).catch(console.error);
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
      
      // Sync to cloud (required)
      syncService.syncToCloud(importedProgram).catch(console.error);
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

