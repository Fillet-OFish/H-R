import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom'
import App from './components/App.jsx';

const container = document.getElementById('app') || document.createElement('div')
const root = createRoot(container)

root.render(<App />);