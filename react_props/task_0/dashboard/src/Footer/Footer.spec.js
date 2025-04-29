import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders copyright with current year when isIndex=true', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const expectedText = `Copyright ${currentYear} - Holberton School`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
