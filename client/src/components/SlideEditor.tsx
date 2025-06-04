import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useSlideStore } from '@/store/slide.store';
import { cn } from '@/lib/utils';

interface SlideEditorProps {
  className?: string;
}

const SlideEditor: React.FC<SlideEditorProps> = ({ className }) => {
  const { slides, currentSlideIndex, updateSlide, deleteSlide } = useSlideStore();
  const currentSlide = slides[currentSlideIndex];
  
  const [content, setContent] = useState(currentSlide?.content || '');

  useEffect(() => {
    setContent(currentSlide?.content || '');
  }, [currentSlide]);

  const handleSave = () => {
    if (currentSlide) {
      updateSlide(currentSlide.id, content);
    }
  };

  const handleDelete = () => {
    if (currentSlide && slides.length > 1) {
      deleteSlide(currentSlide.id);
    }
  };

  if (!currentSlide) return null;

  return (
    <div className={cn('flex flex-col h-full bg-white border-l border-gray-200', className)}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Edit Slide</h3>
        <div className="flex gap-2">
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleDelete}
            disabled={slides.length <= 1}
          >
            Delete
          </Button>
          <Button variant="contained" size="small" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <TextField
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
          placeholder="Enter your markdown content here..."
          multiline
          fullWidth
          minRows={10}
          maxRows={20}
          sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
        />
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h4 className="font-medium text-gray-700 mb-2">Markdown Tips:</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p><code># Title</code> - Main heading</p>
          <p><code>## Subtitle</code> - Subheading</p>
          <p><code>**bold**</code> - Bold text</p>
          <p><code>`code`</code> - Inline code</p>
          <p><code>```lang</code> - Code block</p>
          <p><code>---</code> - Split layout divider</p>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;