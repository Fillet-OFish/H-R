/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import dummydata from './axios/dummydata.js'

afterEach(cleanup);

jest.mock('axios');

// describe('(INSERT IMPORT) component', () => {
//   axios.get.mockResolvedValue({ data: dummydata.(INSERT MODULE EXPORT) });

//   const { container } = render(< (INSERT IMPORT) />)

//   it('(insert your test)', () => {
//     expect(container).toHaveTextContent('(your test value)')
//   });
// });
