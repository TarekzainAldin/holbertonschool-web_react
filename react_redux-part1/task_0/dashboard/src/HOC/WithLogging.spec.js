/* eslint-disable no-undef */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(cleanup);

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe('WithLogging HOC', () => {
  test('renders wrapped component content', () => {
    const WrappedComponent = WithLogging(MockApp);
    render(<WrappedComponent />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello from Mock App Component'
    );
  });

  test('logs when mounted and unmounted', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const WrappedComponent = WithLogging(MockApp);
    const { unmount } = render(<WrappedComponent />);

    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();

    expect(logSpy).toHaveBeenCalledWith(
      'Component MockApp is going to unmount'
    );

    logSpy.mockRestore();
  });
});
