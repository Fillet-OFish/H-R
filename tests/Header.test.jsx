/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom/extend-expect';
 import { render, screen, cleanup, fireEvent } from '@testing-library/react';
 import React from 'react';
 import axios from 'axios';
 import dummydata from './axios/dummydata.js'
 import Cart from '../client/src/components/header/components/Cart.jsx'

 afterEach(cleanup);

 jest.mock('axios');

 describe('Header component', () => {
   axios.get.mockResolvedValue({ data: dummydata.cart });

   const { container } = render(<Cart />)

   it('renders cart buttons: (1) view bag, (2) checkout', () => {
     expect(container).toHaveTextContent('VIEW BAG')
     expect(container).toHaveTextContent('CHECKOUT')
   });

 });


