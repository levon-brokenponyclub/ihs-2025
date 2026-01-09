import { createContext, useContext, useState, ReactNode } from 'react';

type LayoutType = 'layout1' | 'layout2';
type ProgrammeDisplayType = 'multi' | 'core';
type StoryLayoutType = 'single' | 'two-column';

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  programmeDisplay: ProgrammeDisplayType;
  setProgrammeDisplay: (display: ProgrammeDisplayType) => void;
  storyLayout: StoryLayoutType;
  setStoryLayout: (l: StoryLayoutType) => void;
  storyABTest: boolean;
  setStoryABTest: (v: boolean) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>('layout2');
  const [programmeDisplay, setProgrammeDisplay] = useState<ProgrammeDisplayType>('multi');
  const [storyLayout, setStoryLayout] = useState<StoryLayoutType>('single');
  const [storyABTest, setStoryABTest] = useState<boolean>(false);
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
        storyLayout,
        setStoryLayout,
        storyABTest,
        setStoryABTest,
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
