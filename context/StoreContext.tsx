import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Shop, Entry, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface StoreContextType {
  shops: Shop[];
  entries: Entry[];
  language: Language;
  t: typeof TRANSLATIONS.en;
  addShop: (name: string, type: string) => void;
  updateShop: (id: string, name: string, type: string) => void;
  deleteShop: (id: string) => void;
  addEntry: (entry: Omit<Entry, 'id' | 'createdAt'>) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (id: string) => void;
  setLanguage: (lang: Language) => void;
  exportData: () => void;
  importData: (jsonData: string) => boolean;
  resetApp: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage
  const [shops, setShops] = useState<Shop[]>(() => {
    const saved = localStorage.getItem('bhm_shops');
    return saved ? JSON.parse(saved) : [];
  });

  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem('bhm_entries');
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('bhm_lang') as Language) || 'bn';
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('bhm_shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('bhm_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('bhm_lang', language);
  }, [language]);

  const addShop = (name: string, type: string) => {
    const newShop: Shop = {
      id: crypto.randomUUID(),
      name,
      type,
      createdAt: Date.now(),
    };
    setShops([newShop, ...shops]);
  };

  const updateShop = (id: string, name: string, type: string) => {
    setShops(shops.map(shop => shop.id === id ? { ...shop, name, type } : shop));
  };

  const deleteShop = (id: string) => {
    setShops(shops.filter((s) => s.id !== id));
    setEntries(entries.filter((e) => e.shopId !== id)); // Cascade delete entries
  };

  const addEntry = (entryData: Omit<Entry, 'id' | 'createdAt'>) => {
    const newEntry: Entry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setEntries([newEntry, ...entries]);
  };

  const updateEntry = (updatedEntry: Entry) => {
    setEntries(entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e)));
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const exportData = () => {
    const data = { shops, entries, version: 1 };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baki_hisab_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.shops) && Array.isArray(data.entries)) {
        setShops(data.shops);
        setEntries(data.entries);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Import failed", e);
      return false;
    }
  };

  const resetApp = () => {
    if (window.confirm('All data will be lost. Are you sure?')) {
      setShops([]);
      setEntries([]);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <StoreContext.Provider
      value={{
        shops,
        entries,
        language,
        t: TRANSLATIONS[language],
        addShop,
        updateShop,
        deleteShop,
        addEntry,
        updateEntry,
        deleteEntry,
        setLanguage,
        exportData,
        importData,
        resetApp,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};