import { useEffect, useState, useCallback } from 'react';
import { slideSlice } from '@/store/slide.store';
import { slideApi } from '@/services/slideApi';
import { Slide } from '@/types/slide.type';

export const useSlideStore = () => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        slides,
        currentSlideIndex,
        isEditing,
        nextSlide,
        previousSlide,
        toggleEdit,
        setSlides,
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
                setIsLoading(false);
            }
        };

        fetchSlides();
    }, []);

    const addSlide = useCallback(async () => {
        try {
            const _newSlide: Partial<Slide> = {
                title: 'New Slide',
                content: '# New Slide\n\nYour content here...',
                layout: 'default',
                order: slides.length
            };

            console.log(_newSlide);

            const newSlide = await slideApi.addSlide(_newSlide);
            await addSlideAction(newSlide);
        } catch (error) {
            console.error('Failed to add slide:', error);
        }
    }, [addSlideAction]);

    const deleteSlide = useCallback(async (slideId: string) => {
        try {
            await slideApi.deleteSlide(slideId);
            await deleteSlideAction(slideId);
        } catch (error) {
            console.error('Failed to delete slide:', error);
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
        } catch (error) {
            console.error('Failed to update slide:', error);
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
