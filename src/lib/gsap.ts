import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reduced = () => document.documentElement.classList.contains('reduced');
export const finePointer = () => !document.documentElement.classList.contains('coarse');
export const recordMode = () => new URLSearchParams(window.location.search).has('record');
export const duration = (value: number) => reduced() ? 0 : value;

export { gsap, ScrollTrigger };
