import type { Meta, StoryObj } from '@storybook/react';
import PresentationView from '../components/PresentationView';
import { SlideProvider } from '../store/SlideContext';

const meta: Meta<typeof PresentationView> = {
  title: 'Components/PresentationView',
  component: PresentationView,
  decorators: [
    (Story) => (
      <SlideProvider>
        <div style={{ height: '100vh', width: '100vw' }}>
          <Story />
        </div>
      </SlideProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PresentationView>;

// Default state
export const Default: Story = {
  args: {},
};

// With multiple slides
export const MultipleSlides: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/slides',
        method: 'GET',
        status: 200,
        response: [
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
          {
            id: '3',
            title: 'Code Example',
            content: '```javascript\nconsole.log("Hello World");\n```',
            layout: 'code',
            order: 2,
          },
        ],
      },
    ],
  },
};

// In edit mode
export const EditMode: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/slides',
        method: 'GET',
        status: 200,
        response: [
          {
            id: '1',
            title: 'Editable Slide',
            content: '# Editable Content\n\nTry editing this slide!',
            layout: 'default',
            order: 0,
          },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    // Simulate clicking the edit button
    const editButton = canvasElement.querySelector('button[aria-label="Toggle Edit Mode"]');
    if (editButton) {
      editButton.click();
    }
  },
};

// With split layout
export const SplitLayout: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/slides',
        method: 'GET',
        status: 200,
        response: [
          {
            id: '1',
            title: 'Split Layout',
            content: '# Left Side\n\nContent for the left side\n\n---\n\n# Right Side\n\nContent for the right side',
            layout: 'split',
            order: 0,
          },
        ],
      },
    ],
  },
};

// Loading state
export const Loading: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/slides',
        method: 'GET',
        status: 200,
        delay: 2000, // Simulate loading delay
        response: [
          {
            id: '1',
            title: 'Loading Slide',
            content: '# Loading...\n\nThis slide was loaded after a delay',
            layout: 'default',
            order: 0,
          },
        ],
      },
    ],
  },
};

// Error state
export const Error: Story = {
  args: {},
  parameters: {
    mockData: [
      {
        url: '/api/slides',
        method: 'GET',
        status: 500,
        response: {
          error: 'Failed to load slides',
        },
      },
    ],
  },
}; 