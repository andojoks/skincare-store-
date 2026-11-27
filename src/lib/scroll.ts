import Lenis from 'lenis';
import { gsap, ScrollTrigger, recordMode, reduced } from './gsap';

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (reduced() || recordMode() || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollTo(target: string | HTMLElement, immediate = false) {
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return;
  const offset = element.id === 'top' ? 0 : -90;
  if (lenis) lenis.scrollTo(element, { immediate, duration: 1.4, offset });
  else element.scrollIntoView({ block: 'start', behavior: immediate ? 'auto' : 'smooth' });
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
export const scrollVelocity = () => lenis?.velocity ?? 0;
