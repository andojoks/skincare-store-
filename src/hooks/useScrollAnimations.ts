import { useEffect } from 'react';
import { gsap, ScrollTrigger, duration } from '@/lib/gsap';

/** Source ScrollTrigger choreography, rebuilt from the bundle's animation spec. */
export function useScrollAnimations(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    const context = gsap.context(() => {
      gsap.to('[data-hero-media]', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true, refreshPriority: 9 },
      });
      gsap.to('.hero__copy', {
        y: -80,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      document.querySelectorAll<HTMLElement>('[data-split]').forEach((heading) => {
        gsap.fromTo(heading.querySelectorAll('.wm > span'),
          { yPercent: 110, rotation: 4 },
          {
            yPercent: 0,
            rotation: 0,
            duration: duration(1.1),
            stagger: 0.05,
            ease: 'expo.out',
            scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
          });
      });

      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((element) => {
        gsap.fromTo(element, { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: duration(1),
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      gsap.fromTo('[data-product]',
        { y: 80, opacity: 0, rotation: 2 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: duration(1.1),
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.carousel', start: 'top 85%', once: true },
        });

      const media = gsap.matchMedia();

      media.add('(min-width: 821px)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.craft',
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 0.6,
            refreshPriority: 8,
          },
        });
        timeline
          .fromTo('[data-craft-frame]', { scale: 0.72 }, { scale: 1, duration: 1, ease: 'power2.out' }, 0)
          .fromTo('.craft__media img', { scale: 1.35 }, { scale: 1, duration: 1, ease: 'power2.out' }, 0)
          .fromTo('.craft__text .w', { opacity: 0.16 }, { opacity: 1, stagger: 0.03, duration: 0.1, ease: 'none' }, 0.35);
      });

      media.add('(max-width: 820px)', () => {
        gsap.fromTo('.craft__media img', { scale: 1.25 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.craft', start: 'top bottom', end: 'bottom top', scrub: true },
        });
        gsap.fromTo('.craft__text .w', { opacity: 0.16 }, {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.craft__text', start: 'top 85%', end: 'bottom 55%', scrub: true },
        });
      });

      gsap.fromTo('[data-value]',
        { x: (index: number) => (index - 1) * 120, y: (index: number) => index === 1 ? 50 : 0, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: duration(1.2),
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.values', start: 'top 85%', once: true },
        });

      gsap.fromTo('[data-cat]', { y: 120, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: duration(1.2),
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.cats__grid', start: 'top 85%', once: true },
      });

      document.querySelectorAll<HTMLElement>('.cat').forEach((cat) => {
        gsap.fromTo(cat.querySelector('.cat__media'), { yPercent: -6 }, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: cat, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-curtain]').forEach((curtain) => {
        gsap.fromTo(curtain, { '--cover': 1 }, {
          '--cover': 0,
          duration: duration(1.3),
          ease: 'expo.inOut',
          scrollTrigger: { trigger: curtain, start: 'top 80%', once: true },
        });
        gsap.fromTo(curtain.querySelector('img'), { yPercent: -12, scale: 1.15 }, {
          yPercent: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: curtain, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      gsap.fromTo('.gtile', { y: 70, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: duration(1),
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.gallery__track', start: 'top 88%', once: true },
      });
      gsap.fromTo('[data-gal-track]', { x: 80 }, {
        x: -80,
        ease: 'none',
        scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      const counters = { rating: 0, reviews: 0 };
      const rating = document.querySelector<HTMLElement>('[data-rating]');
      const reviewCount = document.querySelector<HTMLElement>('[data-reviews]');
      gsap.to(counters, {
        rating: 4.9,
        reviews: 24000,
        duration: duration(2),
        ease: 'power3.out',
        onUpdate: () => {
          if (rating) rating.textContent = counters.rating.toFixed(1);
          if (reviewCount) reviewCount.textContent = Math.round(counters.reviews).toLocaleString('en-US');
        },
        scrollTrigger: { trigger: '.reviews', start: 'top 80%', once: true },
      });

      const stack = document.querySelectorAll<HTMLElement>('[data-stack] img');
      gsap.fromTo(stack,
        { x: (index: number) => [0, 110, -110][index], rotation: 0, scale: 0.85, opacity: 0 },
        {
          x: 0,
          rotation: (index: number) => [0, -8, 7][index],
          scale: 1,
          opacity: 1,
          duration: duration(1.4),
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-stack]', start: 'top 85%', once: true },
        });

      gsap.fromTo('.promise__text .w:not(:has(.inline-img))', { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: '.promise__text', start: 'top 85%', end: 'bottom 50%', scrub: 0.5 },
      });
      gsap.fromTo('.promise__text .inline-img', { scale: 0, rotation: -12 }, {
        scale: 1,
        rotation: 0,
        duration: duration(0.4),
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.promise__text', start: 'top 85%', once: true },
      });

      gsap.fromTo('[data-footword] span', { yPercent: 105 }, {
        yPercent: 0,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.footer', start: 'top 80%', end: 'bottom bottom', scrub: 0.6, refreshPriority: 1 },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, document.body);

    return () => context.revert();
  }, [ready]);
}
