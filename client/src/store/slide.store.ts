import { create } from 'zustand';
import { Slide } from '@/types/slide.type';

interface SlideStore {
  slides: Slide[];
  currentSlideIndex: number;
  isEditing: boolean;
  setSlides: (slides: Slide[]) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  toggleEdit: () => void;
  updateSlide: (slideId: string, content: string) => void;
  addSlide: () => void;
  deleteSlide: (slideId: string) => void;
}

const defaultSlides: Slide[] = [];

export const useSlideStore = create<SlideStore>((set) => ({
  slides: defaultSlides,
  currentSlideIndex: 0,
  isEditing: false,
  setSlides: (slides) => set({ slides }),
  
  nextSlide: () => set((state) => ({
    currentSlideIndex: Math.min(state.currentSlideIndex + 1, state.slides.length - 1)
  })),
  
  previousSlide: () => set((state) => ({
    currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0)
  })),
  
  goToSlide: (index) => set((state) => ({
    currentSlideIndex: Math.max(0, Math.min(index, state.slides.length - 1))
  })),
  
  toggleEdit: () => set((state) => ({
    isEditing: !state.isEditing
  })),
  
  updateSlide: (slideId, content) => set((state) => ({
    slides: state.slides.map(slide =>
      slide.id === slideId ? { ...slide, content } : slide
    )
  })),
  
  addSlide: () => set((state) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: '# New Slide\n\nYour content here...',
      layout: 'default',
      order: state.slides.length
    };
    return {
      slides: [...state.slides, newSlide],
      currentSlideIndex: state.slides.length
    };
  }),
  
  deleteSlide: (slideId) => set((state) => {
    const filteredSlides = state.slides.filter(slide => slide.id !== slideId);
    const currentIndex = state.currentSlideIndex;
    const newIndex = currentIndex >= filteredSlides.length ? 
      Math.max(0, filteredSlides.length - 1) : currentIndex;
    return {
      slides: filteredSlides,
      currentSlideIndex: newIndex
    };
  })
}));