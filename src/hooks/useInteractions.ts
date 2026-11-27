import { useEffect } from 'react';
import { finePointer, gsap, reduced, ScrollTrigger } from '@/lib/gsap';
import { scrollVelocity } from '@/lib/scroll';

/** Infinite review marquee with hover slowdown and scroll-velocity boost. */
export function useMarquee() {
  useEffect(() => {
    const row = document.querySelector<HTMLElement>('[data-marquee-row]');
    const marquee = document.querySelector<HTMLElement>('[data-marquee]');
    if (!row || !marquee) return;

    const state = { p: 0, g: 1, sc: 1, h: 0, m: 1, previousY: window.scrollY };
    const enter = () => gsap.to(state, { g: 0.15, duration: 0.6 });
    const leave = () => gsap.to(state, { g: 1, duration: 0.6 });
    marquee.addEventListener('pointerenter', enter);
    marquee.addEventListener('pointerleave', leave);

    const tick = (_time: number, delta: number) => {
      const velocity = scrollVelocity() || (window.scrollY - state.previousY) * 0.5;
      state.previousY = window.scrollY;
      if (Math.abs(velocity) > 0.1) {
        state.m = velocity > 0 ? -1 : 1;
        state.h = Math.min(Math.abs(velocity) * 0.6, 14);
      }
      state.h *= 0.92;
      state.p += state.m * (0.6 + state.h) * state.g * state.sc * (delta / 16.7);
      const half = row.scrollWidth / 2;
      if (half && state.p <= -half) state.p += half;
      if (state.p > 0) state.p = 0;
      gsap.set(row, { x: state.p });
    };
    gsap.ticker.add(tick);

    return () => {
      marquee.removeEventListener('pointerenter', enter);
      marquee.removeEventListener('pointerleave', leave);
      gsap.ticker.remove(tick);
    };
  }, []);
}

/** Hero pointer parallax and magnetic buttons from the source bundle. */
export function usePointerEffects() {
  useEffect(() => {
    if (reduced() || !finePointer()) return;
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((button) => {
      const moveX = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'power3' });
      const moveY = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'power3' });
      const move = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        moveX((event.clientX - rect.left - rect.width / 2) * 0.3);
        moveY((event.clientY - rect.top - rect.height / 2) * 0.4);
      };
      const leave = () => { moveX(0); moveY(0); };
      button.addEventListener('pointermove', move);
      button.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        button.removeEventListener('pointermove', move);
        button.removeEventListener('pointerleave', leave);
      });
    });

    const frame = document.querySelector<HTMLElement>('[data-hero-frame]');
    const image = document.querySelector<HTMLElement>('[data-hero-media] img');
    if (frame && image) {
      const moveX = gsap.quickTo(image, 'x', { duration: 2, ease: 'power2' });
      const moveY = gsap.quickTo(image, 'y', { duration: 2, ease: 'power2' });
      const move = (event: PointerEvent) => {
        const rect = frame.getBoundingClientRect();
        gsap.set(image, { willChange: 'transform' });
        moveX(((event.clientX - rect.left) / rect.width - 0.5) * -12);
        moveY(((event.clientY - rect.top) / rect.height - 0.5) * -8);
      };
      const leave = () => {
        moveX(0);
        moveY(0);
        gsap.delayedCall(2.1, () => gsap.set(image, { willChange: 'auto' }));
      };
      frame.addEventListener('pointermove', move);
      frame.addEventListener('pointerenter', move);
      frame.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        frame.removeEventListener('pointermove', move);
        frame.removeEventListener('pointerenter', move);
        frame.removeEventListener('pointerleave', leave);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

/** Solid nav state, scroll auto-hide and Escape/menu handling. */
export function useNav(
  menuOpen: boolean,
  cartOpen: boolean,
  onCloseMenu: () => void,
  onSolidChange: (solid: boolean) => void,
) {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('[data-nav]');
    const hero = document.querySelector<HTMLElement>('[data-hero-frame]');
    if (!nav || !hero) return;

    const updateSolid = () => {
      onSolidChange(menuOpen || window.scrollY > hero.offsetHeight - 90);
    };
    window.addEventListener('scroll', updateSolid, { passive: true });
    updateSolid();

    const autoHide = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (reduced()) return;
        const hide = self.direction === 1 && self.scroll() > 500 && !menuOpen && !cartOpen;
        gsap.to(nav, {
          yPercent: hide ? -150 : 0,
          duration: 0.6,
          ease: hide ? 'power2.in' : 'power3.out',
          overwrite: 'auto',
        });
      },
    });

    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onCloseMenu(); };
    window.addEventListener('keydown', escape);

    return () => {
      window.removeEventListener('scroll', updateSolid);
      window.removeEventListener('keydown', escape);
      autoHide.kill();
    };
  }, [menuOpen, cartOpen, onCloseMenu, onSolidChange]);
}
