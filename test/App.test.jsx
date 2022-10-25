/**
 * @jest-environment jsdom
 */

import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import Overview from '../client/src/components/overview/index.jsx';
import Cart from '../client/src/components/header/components/Cart.jsx'
import dummydata from './axios/dummydata.js'

jest.mock('axios');

axios.get
.mockImplementationOnce(() => Promise.resolve({
    status: 200,
    data: dummydata.cart
}))

test('renders cart', async () => {
  await act( async () => render(<Cart/>));
});
