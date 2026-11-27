import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import './styles/overrides.css';

Object.assign(window, { gsap, ScrollTrigger });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
