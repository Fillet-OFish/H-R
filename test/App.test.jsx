/**
 * @jest-environment jsdom
 */

import ReactTestUtils from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import Overview from '../client/src/components/overview/index.jsx';
import dummydata from './axios/dummydata.js'

let container = null;

// beforeEach(() => {
//   container = document.createElement('div');

//   document.body.appendChild(container)
// })

jest.mock('axios');

axios.get
.mockImplementationOnce(() => Promise.resolve({
    status: 200,
    data: dummydata.styles
}))

test('renders app', () => {
  render(<Overview />);
  // expect(screen.getByRole("img")).toBeInTheDocument();
});