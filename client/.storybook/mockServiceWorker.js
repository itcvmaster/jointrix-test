// This file is used to mock API requests in Storybook
import { setupWorker } from 'msw/browser';
import { handlers } from '../src/mocks/handlers';

export const worker = setupWorker(...handlers); 