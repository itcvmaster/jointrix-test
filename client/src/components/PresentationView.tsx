import React, { useEffect } from 'react';
import { useSlideStore } from '@/hooks/useSlideStore';
import SlideRenderer from './SlideRenderer';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';
import SlideEditor from './SlideEditor';
import { Button, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { cn } from '@/lib/utils';

interface PresentationViewProps {
  className?: string;
}

const PresentationView: React.FC<PresentationViewProps> = ({ className }) => {
  const { slides, currentSlideIndex, isEditing, addSlide, nextSlide, previousSlide, toggleEdit, isLoading } = useSlideStore();
  const currentSlide = slides[currentSlideIndex];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <CircularProgress />
    </div>
  }

  return (
    <div className={cn('h-screen flex flex-col bg-gray-100', className)}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Markdown Presentation
            </h1>
            <div className="flex gap-2">
              <Button
                variant={isEditing ? "contained" : "outlined"}
                size={isMobile ? "small" : "medium"}
                onClick={toggleEdit}
              >
                {isEditing ? 'View Mode' : 'Edit Mode'}
              </Button>
              <Button 
                variant="outlined" 
                size={isMobile ? "small" : "medium"} 
                onClick={addSlide}
              >
                Add Slide
              </Button>
            </div>
          </div>

          <Navigation />
        </div>

        <ProgressBar className="mt-3 sm:mt-4" />
      </header>

      {/* Main Content */}
      {currentSlide ? (
        <main className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* Slide Area */}
          <div className={cn(
            'flex-1 flex items-center justify-center p-4',
            isEditing ? (isTablet ? 'w-full' : 'w-1/2') : 'w-full'
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
            <div className={cn(
              'w-full sm:w-1/2 min-w-0',
              isTablet ? 'border-t border-gray-200' : 'border-l border-gray-200'
            )}>
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
      <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-2 sm:gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline">Use ← → arrows to navigate</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Ctrl/Cmd + E to toggle edit mode</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ESC to exit edit mode</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Space to advance</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PresentationView;