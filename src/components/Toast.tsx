import { useEffect, useRef } from 'react';
import { duration, gsap } from '@/lib/gsap';

export interface ToastMessage {
  id: number;
  text: string;
}

export function Toast({ message }: { message: ToastMessage | null }) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message || !element.current) return;
    if (duration(1) === 0) {
      gsap.set(element.current, { opacity: 1, y: 0 });
      const timer = window.setTimeout(() => gsap.set(element.current, { opacity: 0, y: 12 }), 2200);
      return () => window.clearTimeout(timer);
    }
    const timeline = gsap.timeline({ overwrite: true });
    timeline
      .fromTo(element.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(2)' })
      .to(element.current, { opacity: 0, y: 12, duration: 0.35, ease: 'power2.in' }, '+=1.8');
    return () => timeline.kill();
  }, [message]);

  return <div className="toast" data-toast ref={element} role="status">{message?.text}</div>;
}
