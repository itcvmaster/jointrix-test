import { http, HttpResponse } from 'msw';

export const handlers = [
  // Get all slides
  http.get('/api/slides', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Welcome',
        content: '# Welcome\n\nThis is the first slide',
        layout: 'title',
        order: 0,
      },
      {
        id: '2',
        title: 'Features',
        content: '# Features\n\n- Feature 1\n- Feature 2\n- Feature 3',
        layout: 'default',
        order: 1,
      },
    ]);
  }),

  // Get slide by ID
  http.get('/api/slides/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: 'Sample Slide',
      content: '# Sample Content\n\nThis is a sample slide',
      layout: 'default',
      order: 0,
    });
  }),

  // Create new slide
  http.post('/api/slides', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: 'new-id',
      ...body,
    });
  }),

  // Update slide
  http.put('/api/slides/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    return HttpResponse.json({
      id,
      ...body,
    });
  }),

  // Delete slide
  http.delete('/api/slides/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
]; 