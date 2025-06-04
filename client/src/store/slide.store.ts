import { create } from 'zustand';
import { Slide } from '@/types/slide.type';

interface SlideSlice {
  slides: Slide[];
  currentSlideIndex: number;
  isEditing: boolean;
  isInitialized: boolean
  setInitialized: (isInitialized: boolean) => void;
  setSlides: (slides: Slide[]) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
  toggleEdit: () => void;
  updateSlide: (slideId: string, content: string) => void;
  addSlide: (newSlide: Slide) => void;
  deleteSlide: (slideId: string) => void;
}

const defaultSlides: Slide[] = [];

export const slideSlice = create<SlideSlice>((set) => ({
  slides: defaultSlides,
  currentSlideIndex: 0,
  isEditing: false,
  isInitialized: false,

  setInitialized: (isInitialized: boolean) => set({ isInitialized }),

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
  
  addSlide: (newSlide: Slide) => set((state) => {
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
