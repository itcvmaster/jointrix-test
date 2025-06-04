import BaseApi from './baseApi';
import type { Slide } from '../types/slide.type';

class SlideApi extends BaseApi {

  // Presentation endpoints
  async getAll(): Promise<Slide[]> {
    return this.apiGet<Slide[]>(`/slides`);
  }

  // Slide endpoints
  async updateSlide(slideId: string, data: Partial<Slide>): Promise<Slide> {
    return this.apiPut<Slide>(`/${slideId}`, data);
  }

  async addSlide(data: Omit<Slide, 'id'>): Promise<Slide> {
    return this.apiPost<Slide>(`/slides`, data);
  }

  async deleteSlide(slideId: string): Promise<void> {
    await this.apiDelete(`/slides/${slideId}`);
  }
}

export const slideApi = new SlideApi(); 