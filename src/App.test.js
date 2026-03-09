import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders hero callout text', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/open to new opportunities/i);
  expect(linkElement).toBeInTheDocument();
});
