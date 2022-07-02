import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders', () => {
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
