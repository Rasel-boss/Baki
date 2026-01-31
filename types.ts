export type Language = 'bn' | 'en';

export interface Shop {
  id: string;
  name: string;
  type: string;
  createdAt: number;
}

export interface Entry {
  id: string;
  shopId: string;
  date: string; // ISO Date string YYYY-MM-DD
  morning: number;
  noon: number;
  night: number;
  total: number;
  createdAt: number;
}

export interface AppState {
  shops: Shop[];
  entries: Entry[];
  language: Language;
}

export interface Translation {
  appTitle: string;
  shops: string;
  addShop: string;
  shopName: string;
  shopType: string;
  shopTypePlaceholder: string; // e.g., Grocery, Tea Stall
  create: string;
  update: string; // New
  cancel: string;
  dashboard: string;
  settings: string;
  about: string;
  entries: string;
  addEntry: string;
  date: string;
  morning: string;
  noon: string;
  night: string;
  total: string;
  save: string;
  delete: string;
  edit: string;
  noShops: string;
  noEntries: string;
  language: string;
  bangla: string;
  english: string;
  exportData: string;
  importData: string;
  resetData: string;
  confirmDelete: string;
  totalDue: string;
  monthlyTotal: string;
  version: string;
  build: string;
  createdBy: string;
  aboutDesc: string;
  backupRestore: string;
  backupNote: string;
}