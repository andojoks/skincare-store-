import { useEffect, useLayoutEffect, useRef, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { money } from '@/lib/format';
import { duration, gsap } from '@/lib/gsap';
import type { CartLine } from '@/types/catalog';
import { Icon } from './Icon';

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onInc: (key: string) => void;
  onDec: (key: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, lines, onClose, onInc, onDec, onCheckout }: CartDrawerProps) {
  const root = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);

  useLayoutEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      root.current?.classList.add('is-open');
      root.current?.setAttribute('aria-hidden', 'false');
      gsap.to(scrim.current, { opacity: 1, duration: duration(0.4) });
      gsap.fromTo(panel.current,
        { xPercent: 110 },
        { xPercent: 0, duration: duration(0.7), ease: 'expo.out', onComplete: () => panel.current?.focus({ preventScroll: true }) });
      gsap.fromTo(panel.current?.querySelectorAll<HTMLElement>('.cart__item') ?? [],
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: duration(0.6), ease: 'power3.out', delay: 0.15 });
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      gsap.to(scrim.current, { opacity: 0, duration: duration(0.3) });
      gsap.to(panel.current, {
        xPercent: 110,
        duration: duration(0.5),
        ease: 'power3.in',
        onComplete: () => {
          root.current?.classList.remove('is-open');
          root.current?.setAttribute('aria-hidden', 'true');
          restoreFocus.current?.focus({ preventScroll: true });
        },
      });
    }
  }, [open]);

  useEffect(() => {
    const key = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose]);

  const trap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panel.current) return;
    const focusable = [...panel.current.querySelectorAll<HTMLElement>('button, a[href], input')].filter((element) => !element.hasAttribute('disabled'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div className={`cart${open ? ' is-open' : ''}`} data-cart ref={root} aria-hidden={!open}>
      <div className="cart__scrim" ref={scrim} onClick={onClose} />
      <aside
        className="cart__panel"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        tabIndex={-1}
        onKeyDown={trap}
      >
        <header className="cart__head">
          <h2>Your <em>bag</em></h2>
          <button type="button" className="icon-btn" data-cart-close aria-label="Close bag" onClick={onClose}>
            <Icon name="close" />
          </button>
        </header>

        <ul className="cart__list" data-cart-list>
          {lines.map((line) => (
            <li className="cart__item" key={line.key}>
              <img src={line.image} width="64" height="72" alt={line.name} />
              <div>
                <p>{line.name}</p>
                <small>{line.variant} × {money(line.price)}</small>
                <div className="qty">
                  <button type="button" aria-label={`One fewer ${line.name}`} onClick={() => onDec(line.key)}>−</button>
                  <span>{line.qty}</span>
                  <button type="button" aria-label={`One more ${line.name}`} onClick={() => onInc(line.key)}>+</button>
                </div>
              </div>
              <p className="amt">{money(line.price * line.qty)}</p>
            </li>
          ))}
        </ul>

        <p className="cart__empty" data-cart-empty hidden={lines.length > 0}>
          Your bag is empty. Something botanical, perhaps?
        </p>

        <footer className="cart__foot">
          <div className="subtotal"><span>Subtotal</span><strong data-cart-total>{money(total)}</strong></div>
          <button type="button" className="btn btn--dark btn--block" onClick={onCheckout}>Checkout</button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
