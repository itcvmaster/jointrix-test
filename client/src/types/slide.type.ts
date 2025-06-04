export interface Slide {
  id: string;
  title: string;
  content: string;
  layout: 'default' | 'title' | 'split' | 'code';
  order: number;
}
