import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useSlideStore } from '@/hooks/useSlideStore';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const { slides, currentSlideIndex, nextSlide, previousSlide, goToSlide } = useSlideStore();
  const [pageInput, setPageInput] = useState('');

  const totalSlides = slides.length;
  const currentSlide = currentSlideIndex + 1;

  // Update input when current slide changes
  useEffect(() => {
    setPageInput("" + (currentSlideIndex + 1));
  }, [currentSlideIndex]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const pageNum = parseInt(pageInput);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalSlides) {
        goToSlide(pageNum - 1);
      }
    }
  };

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Button
        variant="outlined"
        size="small"
        onClick={previousSlide}
        disabled={currentSlideIndex === 0}
      >
        Previous
      </Button>

      <TextField
        size="small"
        value={pageInput}
        onChange={handlePageInputChange}
        onKeyDown={handleKeyDown}
        placeholder={`${currentSlide}/${totalSlides}`}
        sx={{ width: '80px' }}
        inputProps={{
          style: { padding: '4px 8px' },
          min: 1,
          max: totalSlides
        }}
      />

      <Button
        variant="outlined"
        size="small"
        onClick={nextSlide}
        disabled={currentSlideIndex === totalSlides - 1}
      >
        Next
      </Button>
    </div>
  );
};

export default Navigation;