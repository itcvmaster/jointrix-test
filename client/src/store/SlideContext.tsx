import React, { createContext, useContext } from 'react';
import { useSlideStore } from '@/hooks/useSlideStore';

const SlideContext = createContext<ReturnType<typeof useSlideStore> | null>(null);

export const SlideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useSlideStore();
  return <SlideContext.Provider value={store}>{children}</SlideContext.Provider>;
};

export const useSlideContext = () => {
  const context = useContext(SlideContext);
  if (!context) throw new Error('useSlideContext must be used within SlideProvider');
  return context;
}; 