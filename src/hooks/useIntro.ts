import { useEffect } from 'react';
import { gsap, ScrollTrigger, recordMode, reduced } from '@/lib/gsap';

/** Source preloader/intro timeline, including the `?record` test bridge. */
export function useIntro(onDone: () => void) {
  useEffect(() => {
    const stat = document.querySelector<HTMLElement>('[data-stat]');
    if (reduced()) {
      if (stat) stat.textContent = '98';
      onDone();
      return;
    }

    if (recordMode()) {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    let intro: gsap.core.Timeline | undefined;
    const loops: gsap.core.Tween[] = [];

    const context = gsap.context(() => {
      const heroImg = document.querySelector<HTMLElement>('[data-hero-media] img');
      const counter = document.querySelector<HTMLElement>('[data-count]');
      const count = { value: 0 };
      const statCount = { value: 0 };

      gsap.set('.loader__word span', { yPercent: 115 });
      gsap.set(heroImg, { scale: 1.35, willChange: 'transform' });
      gsap.set('.hero__title .line > span', { yPercent: 115 });
      gsap.set('[data-nav]', { yPercent: -150, opacity: 1 });
      gsap.set('.hero__scroll span', { y: 0, opacity: 1 });

      intro = gsap.timeline({
        paused: true,
        onComplete: () => {
          onDone();
          ScrollTrigger.refresh();
          if (heroImg) gsap.set(heroImg, { willChange: 'auto' });
        },
      });

      intro
        .to('.loader__word span', { yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out' }, 0)
        .to(count, {
          value: 100,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => { if (counter) counter.textContent = String(Math.round(count.value)); },
        }, 0)
        .addPause()
        .to('.loader__word span', { yPercent: -110, duration: 0.6, stagger: 0.04, ease: 'power3.in' })
        .to('.loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.25')
        .to(heroImg, { scale: 1.06, duration: 2, ease: 'expo.out' }, '<0.25')
        .to('.hero__title .line > span', { yPercent: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' }, '<0.35')
        .to('.hero__sub', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<0.3')
        .to('.hero__copy .btn', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<0.1')
        .to('[data-nav]', { yPercent: 0, duration: 1, ease: 'expo.out' }, '<')
        .to('.stat', { x: 0, opacity: 1, duration: 1.1, ease: 'expo.out' }, '<0.1')
        .to(statCount, {
          value: 98,
          duration: 1.6,
          ease: 'power2.out',
          snap: { value: 1 },
          onUpdate: () => { if (stat) stat.textContent = String(Math.round(statCount.value)); },
        }, '<');

      loops.push(gsap.to('.stat__leaf', {
        rotation: 10,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }));
      loops.push(gsap.to('.hero__scroll span', {
        y: 12,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.in',
        repeat: -1,
      }));
    });

    const heroImg = document.querySelector<HTMLImageElement>('[data-hero-media] img');
    const timers: number[] = [];
    const play = () => { if (intro?.paused()) intro.play(); };
    window.SORREL = {
      start: play,
      get speed() { return gsap.globalTimeline.timeScale(); },
      set speed(value: number) { gsap.globalTimeline.timeScale(value); },
    };

    // The source waits for decode(), but a stalled image must not trap the loader
    // at 100%. Wait briefly, then release; a final guard completes the intro.
    const decoded = heroImg?.complete
      ? Promise.resolve()
      : heroImg?.decode?.().catch(() => undefined) ?? Promise.resolve();
    if (!recordMode()) {
      timers.push(window.setTimeout(play, 900));
      void decoded.then(play);
      timers.push(window.setTimeout(() => {
        if (document.querySelector('.loader')) intro?.progress(1);
      }, 3200));
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      loops.forEach((loop) => loop.kill());
      intro?.kill();
      context.revert();
      delete window.SORREL;
    };
  }, [onDone]);
}
