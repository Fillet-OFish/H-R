// TEST START HERE ---

// const render = require('@testing-library/react');
// const React = require('react');
// const App = require('./index.jsx');
// const App = require('./components/App.jsx');

import {render} from '@testing-library/react';
import React from 'react';
import App from './index.jsx';

// describe('App component', () => {
//  test('it renders', () => {
//    render(<App />);
//  });
// })

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});