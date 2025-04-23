import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders h1 with text School dashboard', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /School Dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders correct text in body and footer', () => {
    render(<App />);

    // Paragraph in App-body
    const bodyText = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();

    // Paragraph in App-footer
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      `Copyright ${currentYear} - holberton School`
    );

    expect(footerText).toBeInTheDocument();
  });

  test('renders the logo image', () => {
    render(<App />);
    const image = screen.getByAltText(/holberton logo/i);
    expect(image).toBeInTheDocument();
  });
});
