import BaseApi from './baseApi';
import type { Slide } from '../types/slide.type';

class SlideApi extends BaseApi {

  // Presentation endpoints
  async getAll(): Promise<Slide[]> {
    return this.apiGet<Slide[]>(`/slides`);
  }

  // Slide endpoints
  async updateSlide(slideId: string, data: Partial<Slide>): Promise<Slide> {
    return this.apiPut<Slide>(`/slides/${slideId}`, data);
  }

  async addSlide(newSlide: Partial<Slide>): Promise<Slide> {
    return this.apiPost<Slide>(`/slides`, newSlide);
  }

  async deleteSlide(slideId: string): Promise<void> {
    await this.apiDelete(`/slides/${slideId}`);
  }
}

export const slideApi = new SlideApi(); 