import React, { useEffect } from 'react';
import { useSlideStore } from '@/store/slide.store';
import SlideRenderer from './SlideRenderer';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';
import SlideEditor from './SlideEditor';
import { Button } from '@mui/material';
import { cn } from '@/lib/utils';

interface PresentationViewProps {
  className?: string;
}

const PresentationView: React.FC<PresentationViewProps> = ({ className }) => {
  const { slides, currentSlideIndex, isEditing, addSlide, nextSlide, previousSlide, toggleEdit } = useSlideStore();
  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere when editing
      if (isEditing && (event.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousSlide();
          break;
        case 'Escape':
          if (isEditing) {
            event.preventDefault();
            toggleEdit();
          }
          break;
        case 'e':
        case 'E':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleEdit();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, previousSlide, toggleEdit, isEditing]);

  return (
    <div className={cn('h-screen flex flex-col bg-gray-100', className)}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Markdown Presentation
            </h1>
            <Button
              variant={isEditing ? "contained" : "outlined"}
              size="small"
              onClick={toggleEdit}
            >
              {isEditing ? 'View Mode' : 'Edit Mode'}
            </Button>
            <Button variant="outlined" size="small" onClick={addSlide}>
              Add Slide
            </Button>
          </div>

          <Navigation />
        </div>

        <ProgressBar className="mt-4" />
      </header>

      {/* Main Content */}
      {currentSlide ? (
        <main className="flex-1 flex overflow-hidden">
          {/* Slide Area */}
          <div className={cn(
            'flex-1 flex items-center justify-center',
            isEditing ? 'w-1/2' : 'w-full'
          )}>
            <div className="w-full h-full max-w-6xl mx-auto">
              <SlideRenderer
                slide={currentSlide}
                className="h-full shadow-lg rounded-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Editor Panel */}
          {isEditing && (
            <div className="w-1/2 min-w-96">
              <SlideEditor />
            </div>
          )}
        </main>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="text-xl text-gray-600">No slides available</p>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>Use ← → arrows to navigate</span>
            <span>•</span>
            <span>Ctrl/Cmd + E to toggle edit mode</span>
            <span>•</span>
            <span>ESC to exit edit mode</span>
            <span>•</span>
            <span>Space to advance</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PresentationView;