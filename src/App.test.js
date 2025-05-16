import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('@vercel/analytics', () => ({
  inject: jest.fn(),
}));

test('renders portfolio app', () => {
  render(<App />);
  // Check for the presence of main content
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
});
