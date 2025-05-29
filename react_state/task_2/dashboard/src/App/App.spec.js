// src/App/App.spec.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    window.alert.mockRestore();
  });

  test('renders App component without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Log in to continue/i)).toBeInTheDocument();
  });

  test('calls alert and logOut on Ctrl+H keyDown', () => {
    render(<App />);

    fireEvent.keyDown(document, { key: 'h', ctrlKey: true });

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
  });

  test('does not call alert for other keys', () => {
    render(<App />);

    fireEvent.keyDown(document, { key: 'a', ctrlKey: false });

    expect(window.alert).not.toHaveBeenCalled();
  });
});
