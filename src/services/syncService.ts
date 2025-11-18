import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { ProgramData } from '../data/models';
import { trackerDb } from '../db/trackerDb';

const PROGRAM_DOC_ID = 'sasha-tracker-program';

class SyncService {
  private unsubscribe: (() => void) | null = null;
  private isInitialized = false;
  private syncEnabled = false;
  private onDataChange: ((data: ProgramData) => void) | null = null;

  setOnDataChange(callback: (data: ProgramData) => void) {
    this.onDataChange = callback;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    if (!auth || !db) {
      const error = new Error('Firebase not configured. Cloud sync is required for multi-device usage. Please configure Firebase.');
      console.error(error);
      throw error;
    }

    try {
      // Sign in anonymously (no user account needed)
      await signInAnonymously(auth);
      
      // Wait for auth state
      return new Promise((resolve) => {
        if (!auth) {
          resolve(false);
          return;
        }
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe(); // Only listen once
          if (user) {
            this.syncEnabled = true;
            this.isInitialized = true;
            await this.setupRealtimeSync();
            resolve(true);
          } else {
            console.warn('Firebase auth failed, using local storage only');
            resolve(false);
          }
        });
      });
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      this.syncEnabled = false;
      return false;
    }
  }

  private async setupRealtimeSync() {
    if (!this.syncEnabled || !db) return;

    // Set up real-time listener
    const programRef = doc(db, 'programs', PROGRAM_DOC_ID);
    
    this.unsubscribe = onSnapshot(
      programRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data() as { data: ProgramData; updatedAt: any };
          
          // Get local data
          const localRecord = await trackerDb.program.get(1);
          const localUpdatedAt = localRecord?.data.updatedAt;
          const cloudUpdatedAt = cloudData.updatedAt?.toDate?.()?.toISOString() || cloudData.updatedAt;

          // Only update if cloud data is newer
          if (!localUpdatedAt || cloudUpdatedAt > localUpdatedAt) {
            await trackerDb.program.put({ id: 1, data: cloudData.data });
            console.log('Synced from cloud');
            // Notify store of the update
            if (this.onDataChange) {
              this.onDataChange(cloudData.data);
            }
          }
        }
      },
      (error) => {
        console.error('Sync error:', error);
      }
    );
  }

  async syncToCloud(programData: ProgramData): Promise<void> {
    if (!this.syncEnabled || !db) {
      return;
    }

    try {
      const programRef = doc(db, 'programs', PROGRAM_DOC_ID);
      await setDoc(programRef, {
        data: programData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      console.log('Synced to cloud');
    } catch (error) {
      console.error('Failed to sync to cloud:', error);
      throw error;
    }
  }

  async loadFromCloud(): Promise<ProgramData | null> {
    if (!this.syncEnabled || !db) return null;

    try {
      const programRef = doc(db, 'programs', PROGRAM_DOC_ID);
      const snapshot = await getDoc(programRef);
      
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as { data: ProgramData; updatedAt: any };
        return cloudData.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to load from cloud:', error);
      return null;
    }
  }

  cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  isSyncEnabled(): boolean {
    return this.syncEnabled;
  }
}

export const syncService = new SyncService();

