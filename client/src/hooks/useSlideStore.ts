import { useEffect, useState, useCallback } from 'react';
import { slideSlice } from '@/store/slide.store';
import { slideApi } from '@/services/slideApi';
import { Slide } from '@/types/slide.type';
import { toast } from 'react-toastify';

export const useSlideStore = () => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        slides,
        currentSlideIndex,
        isEditing,
        isInitialized,
        nextSlide,
        previousSlide,
        toggleEdit,
        setSlides,
        setInitialized,
        addSlide: addSlideAction,
        deleteSlide: deleteSlideAction,
        updateSlide: updateSlideAction,
        goToSlide
    } = slideSlice();

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                setIsLoading(true);
                const fetchedSlides = await slideApi.getAll();
                setSlides(fetchedSlides);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch slides:', error);
                toast.error('Failed to load slides. Please try again.');
                setIsLoading(false);
            }
        };

        if (!isInitialized) {
            fetchSlides();
            setInitialized(true);
        }
    }, [isInitialized, setInitialized, setSlides]);

    const addSlide = useCallback(async () => {
        try {
            const _newSlide: Partial<Slide> = {
                title: 'New Slide',
                content: '# New Slide\n\nYour content here...',
                layout: 'default',
                order: slides.length
            };

            const newSlide = await slideApi.addSlide(_newSlide);
            await addSlideAction(newSlide);
            toast.success('New slide added successfully');
        } catch (error) {
            console.error('Failed to add slide:', error);
            toast.error('Failed to add slide. Please try again.');
        }
    }, [addSlideAction, slides.length]);

    const deleteSlide = useCallback(async (slideId: string) => {
        try {
            await slideApi.deleteSlide(slideId);
            await deleteSlideAction(slideId);
            toast.success('Slide deleted successfully');
        } catch (error) {
            console.error('Failed to delete slide:', error);
            toast.error('Failed to delete slide. Please try again.');
        }
    }, [deleteSlideAction]);

    const updateSlide = useCallback(async (slideId: string, content: string) => {
        try {
            const _updatedSlide: Partial<Slide> = {
                id: slideId,
                content: content
            };

            const updatedSlide = await slideApi.updateSlide(slideId, _updatedSlide);
            await updateSlideAction(slideId, updatedSlide.content);
            toast.success('Slide updated successfully');
        } catch (error) {
            console.error('Failed to update slide:', error);
            toast.error('Failed to update slide. Please try again.');
        }
    }, [updateSlideAction]);

    return {
        slides,
        currentSlideIndex,
        isLoading,
        isEditing,
        nextSlide,
        previousSlide,
        toggleEdit,
        setSlides,
        goToSlide,
        addSlide,
        deleteSlide,
        updateSlide
    };
}
