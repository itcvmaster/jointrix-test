import { Request, Response } from 'express';
import { SlideService } from '../services/slide.service';
import logger from '../middleware/logger.middleware';

export class SlideController {
  private slideService: SlideService;

  constructor() {
    this.slideService = new SlideService();
  }

  getAllSlides = async (req: Request, res: Response) => {
    try {
      logger.info('Fetching all slides');
      const slides = await this.slideService.getAllSlides();
      logger.info(`Successfully fetched ${slides.length} slides`);
      res.json(slides);
    } catch (error) {
      logger.error('Error fetching slides:', error);
      res.status(500).json({ error: 'Failed to fetch slides' });
    }
  };

  getSlideById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`Fetching slide with ID: ${id}`);
      
      const slide = await this.slideService.getSlideById(id);
      if (!slide) {
        logger.warn(`Slide not found with ID: ${id}`);
        return res.status(404).json({ error: 'Slide not found' });
      }

      logger.info(`Successfully fetched slide with ID: ${id}`);
      res.json(slide);
    } catch (error) {
      logger.error(`Error fetching slide with ID ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to fetch slide' });
    }
  };

  createSlide = async (req: Request, res: Response) => {
    try {
      const slideData = req.body;
      logger.info('Creating new slide', { slideData });
      
      const newSlide = await this.slideService.createSlide(slideData);
      logger.info(`Successfully created slide with ID: ${newSlide.id}`);
      
      res.status(201).json(newSlide);
    } catch (error) {
      logger.error('Error creating slide:', error);
      res.status(500).json({ error: 'Failed to create slide' });
    }
  };

  updateSlide = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const slideData = req.body;
      logger.info(`Updating slide with ID: ${id}`, { slideData });
      
      const updatedSlide = await this.slideService.updateSlide(id, slideData);
      if (!updatedSlide) {
        logger.warn(`Slide not found for update with ID: ${id}`);
        return res.status(404).json({ error: 'Slide not found' });
      }

      logger.info(`Successfully updated slide with ID: ${id}`);
      res.json(updatedSlide);
    } catch (error) {
      logger.error(`Error updating slide with ID ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to update slide' });
    }
  };

  deleteSlide = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`Deleting slide with ID: ${id}`);
      
      const deleted = await this.slideService.deleteSlide(id);
      if (!deleted) {
        logger.warn(`Slide not found for deletion with ID: ${id}`);
        return res.status(404).json({ error: 'Slide not found' });
      }

      logger.info(`Successfully deleted slide with ID: ${id}`);
      res.status(204).send();
    } catch (error) {
      logger.error(`Error deleting slide with ID ${req.params.id}:`, error);
      res.status(500).json({ error: 'Failed to delete slide' });
    }
  };
} 