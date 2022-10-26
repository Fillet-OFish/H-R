/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import dummydata from './axios/dummydata.js'
import Overview from '../client/src/components/overview/index.jsx';
import Cart from '../client/src/components/header/components/Cart.jsx'

afterEach(cleanup);

jest.mock('axios');

describe('Overview component', () => {
  axios.get.mockResolvedValue({ data: dummydata.styles });

  const { getByTestId } = render(<Overview />)

  it("renders without crashing", () => {
    const component = shallow(<Overview product={dummydata.product} rating={3.8} numReviews={1094} />)

    render(component);
  });
});


