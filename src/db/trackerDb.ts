import Dexie, { Table } from 'dexie';
import { ProgramData } from '../data/models';

export interface ProgramRecord {
  id: number;
  data: ProgramData;
}

export class TrackerDatabase extends Dexie {
  program!: Table<ProgramRecord>;

  constructor() {
    super('anallergenicTrackerDb');
    this.version(1).stores({
      program: 'id'
    });
  }
}

export const trackerDb = new TrackerDatabase();

