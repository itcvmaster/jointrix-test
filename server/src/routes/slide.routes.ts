import { Router } from 'express';
import { SlideController } from '../controllers/slide.controller';

const router = Router();
const slideController = new SlideController();

// Get all slides
router.get('/', slideController.getAllSlides);

// Get a single slide
router.get('/:id', slideController.getSlideById);

// Create a new slide
router.post('/', slideController.createSlide);

// Update a slide
router.put('/:id', slideController.updateSlide);

// Delete a slide
router.delete('/:id', slideController.deleteSlide);

export default router; 