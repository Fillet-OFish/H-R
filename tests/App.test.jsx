/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import App from '../client/src/components/App.jsx'

describe('App', () => {
   it("renders without crashing", () => {
     render(<App />);
   });
});