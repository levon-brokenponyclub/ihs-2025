import { createContext, useContext, useState, ReactNode } from 'react';

type LayoutType = 'layout1' | 'layout2';
type ProgrammeDisplayType = 'multi' | 'core';

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  programmeDisplay: ProgrammeDisplayType;
  setProgrammeDisplay: (display: ProgrammeDisplayType) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>('layout2');
  const [programmeDisplay, setProgrammeDisplay] = useState<ProgrammeDisplayType>('multi');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  return (
    <LayoutContext.Provider
      value={{
        layout,
        setLayout,
        programmeDisplay,
        setProgrammeDisplay,
        isSettingsOpen,
        openSettings,
        closeSettings,
        toggleSettings,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
