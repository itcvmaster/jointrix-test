import { Slide, SlideAttributes } from '../models/Slide';
import logger from '../middleware/logger.middleware';

export class SlideService {
  async getAllSlides() {
    try {
      logger.info('Fetching all slides from database');
      const slides = await Slide.findAll({
        order: [['order', 'ASC']]
      });
      logger.info(`Successfully retrieved ${slides.length} slides from database`);
      return slides;
    } catch (error) {
      logger.error('Database error while fetching slides:', error);
      throw error;
    }
  }

  async getSlideById(id: string) {
    try {
      logger.info(`Fetching slide with ID ${id} from database`);
      const slide = await Slide.findByPk(id);
      if (!slide) {
        logger.warn(`Slide with ID ${id} not found in database`);
        return null;
      }
      logger.info(`Successfully retrieved slide with ID ${id} from database`);
      return slide;
    } catch (error) {
      logger.error(`Database error while fetching slide with ID ${id}:`, error);
      throw error;
    }
  }

  async createSlide(slideData: Partial<Slide>) {
    try {
      logger.info('Creating new slide in database', { slideData });
      const slide = await Slide.create(slideData);
      logger.info(`Successfully created slide with ID ${slide.id} in database`);
      return slide;
    } catch (error) {
      logger.error('Database error while creating slide:', error);
      throw error;
    }
  }

  async updateSlide(id: string, slideData: Partial<Slide>) {
    try {
      logger.info(`Updating slide with ID ${id} in database`, { slideData });
      const [updatedCount, [updatedSlide]] = await Slide.update(slideData, {
        where: { id },
        returning: true
      });

      if (updatedCount === 0) {
        logger.warn(`No slide found with ID ${id} for update`);
        return null;
      }

      logger.info(`Successfully updated slide with ID ${id} in database`);
      return updatedSlide;
    } catch (error) {
      logger.error(`Database error while updating slide with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteSlide(id: string) {
    try {
      logger.info(`Deleting slide with ID ${id} from database`);
      const deletedCount = await Slide.destroy({
        where: { id }
      });

      if (deletedCount === 0) {
        logger.warn(`No slide found with ID ${id} for deletion`);
        return false;
      }

      logger.info(`Successfully deleted slide with ID ${id} from database`);
      return true;
    } catch (error) {
      logger.error(`Database error while deleting slide with ID ${id}:`, error);
      throw error;
    }
  }
} 