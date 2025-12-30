
import React, { createContext, useContext, useState } from 'react';
import { Offering } from '../types';

interface CompareContextType {
  compareItems: Offering[];
  addToCompare: (item: Offering) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (isOpen: boolean) => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Offering[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = (item: Offering) => {
    if (compareItems.length < 3 && !compareItems.find(i => i.id === item.id)) {
      setCompareItems([...compareItems, item]);
    } else if (compareItems.length >= 3) {
        // Optional: Add toast notification here saying max 3 items
        alert("You can compare up to 3 programmes at a time.");
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareItems(compareItems.filter(i => i.id !== id));
  };

  const clearCompare = () => setCompareItems([]);

  const isInCompare = (id: string) => compareItems.some(i => i.id === id);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) throw new Error('useCompare must be used within CompareProvider');
  return context;
};
