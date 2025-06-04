import React from 'react';
import { useSlideStore } from '@/hooks/useSlideStore';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ className }) => {
  const { slides, currentSlideIndex } = useSlideStore();
  
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <div className={cn('w-full bg-gray-200 h-2 rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;