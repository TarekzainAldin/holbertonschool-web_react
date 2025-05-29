import "@testing-library/jest-dom";

jest.mock('aphrodite', () => {
  return {
    StyleSheet: {
      create: (styles) => styles,
    },
    css: (...classNames) => classNames.join(' '),
  };
});
