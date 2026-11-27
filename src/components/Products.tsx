import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { products } from '@/data/catalog';
import { money } from '@/lib/format';
import { duration, gsap } from '@/lib/gsap';
import type { Product } from '@/types/catalog';
import { Icon } from './Icon';
import { W } from '@/lib/text';

interface ProductsProps {
  search: string;
  onAdd: (product: Product, variant: string, image: HTMLImageElement | null) => void;
  onMore: () => void;
}

export function Products({ search, onAdd, onMore }: ProductsProps) {
  const carousel = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const prev = useRef<HTMLButtonElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const index = useRef(0);
  const suppressClick = useRef(false);
  const [selected, setSelected] = useState(() => products.map((product) => product.swatches[0].label));

  const step = () => {
    const cards = track.current?.querySelectorAll<HTMLElement>('.pcard');
    if (!cards || cards.length < 2) return 1;
    return cards[1].offsetLeft - cards[0].offsetLeft || 1;
  };

  const maxIndex = () => Math.max(0, products.length - Math.max(1, Math.round((viewport.current?.clientWidth ?? 0) / step())));

  const maxDistance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - (viewport.current?.clientWidth ?? 0));

  const go = (value: number, immediate = false) => {
    const target = Math.min(Math.max(value, 0), maxIndex());
    index.current = target;
    const x = -Math.min(target * step(), maxDistance());
    gsap.to(track.current, { x, duration: immediate ? 0 : duration(0.9), ease: 'expo.out', overwrite: true });
    gsap.to(progress.current, {
      scaleX: Math.min(1, (target + Math.round((viewport.current?.clientWidth ?? 0) / step())) / products.length),
      duration: duration(0.8),
      ease: 'expo.out',
    });
    if (prev.current) prev.current.disabled = target === 0;
    if (next.current) next.current.disabled = target >= maxIndex();
  };

  useEffect(() => {
    go(0, true);
    const resize = () => go(index.current, true);
    window.addEventListener('resize', resize);
    const jump = (event: Event) => go((event as CustomEvent<number>).detail, false);
    window.addEventListener('sorrel:product-go', jump);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('sorrel:product-go', jump);
    };
  });

  const drag = useRef({ active: false, startX: 0, startY: 0, startOffset: 0, velocity: 0, lastX: 0, lastTime: 0, axis: '' as '' | 'x' | 'y' });

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: Number(gsap.getProperty(track.current, 'x')) || 0,
      velocity: 0,
      lastX: event.clientX,
      lastTime: performance.now(),
      axis: '',
    };
    viewport.current?.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state.active) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (!state.axis && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) state.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (state.axis !== 'x') return;
    const now = performance.now();
    state.velocity = (event.clientX - state.lastX) / Math.max(1, now - state.lastTime);
    state.lastX = event.clientX;
    state.lastTime = now;
    viewport.current?.classList.add('is-drag');
    let target = state.startOffset + dx;
    const min = -maxDistance();
    if (target > 0) target *= 0.35;
    if (target < min) target = min + (target - min) * 0.35;
    gsap.set(track.current, { x: target });
  };

  const pointerUp = () => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    if (state.axis === 'x') {
      if (Math.abs(state.lastX - state.startX) > 6) {
        suppressClick.current = true;
        window.setTimeout(() => { suppressClick.current = false; }, 0);
      }
      const current = Number(gsap.getProperty(track.current, 'x')) || 0;
      const projected = current - state.velocity * 220;
      go(Math.round(-projected / step()));
    }
    viewport.current?.classList.remove('is-drag');
    state.axis = '';
  };

  const choose = (productIndex: number, swatchIndex: number) => {
    const label = products[productIndex].swatches[swatchIndex].label;
    setSelected((current) => current.map((item, i) => i === productIndex ? label : item));
    const card = track.current?.querySelectorAll<HTMLElement>('.pcard')[productIndex];
    const variant = card?.querySelector<HTMLElement>('[data-variant]');
    const media = card?.querySelector<HTMLElement>('.pcard__media');
    if (variant) gsap.fromTo(variant, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: duration(0.5), ease: 'power3.out' });
    if (media) gsap.fromTo(media, { scale: 0.95 }, { scale: 1, duration: duration(0.9), ease: 'elastic.out(1, 0.45)' });
  };

  const add = (product: Product, productIndex: number, button: HTMLButtonElement) => {
    const image = button.closest('.pcard')?.querySelector<HTMLImageElement>('img') ?? null;
    gsap.fromTo(button, { scale: 0.88 }, { scale: 1, duration: duration(0.6), ease: 'elastic.out(1, 0.4)' });
    onAdd(product, selected[productIndex], image);
  };

  const query = search.trim().toLowerCase();

  return (
    <section className="products wrap" id="shop" aria-labelledby="shop-h">
      <div className="head">
        <h2 id="shop-h" data-split>
          <W>Plant-first</W> <W>essentials,</W><br />
          <W>bestselling</W> <W><span className="spark">✧</span></W> <em><W>Products</W></em>
        </h2>
        <a
          className="link"
          href="#shop"
          onClick={(event) => { event.preventDefault(); onMore(); }}
        >
          More products <Icon name="arrowR" />
        </a>
      </div>

      <div className="carousel" data-carousel ref={carousel}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') go(index.current + 1);
          if (event.key === 'ArrowLeft') go(index.current - 1);
        }}
      >
        <button type="button" className="arrow arrow--prev" data-prev ref={prev} aria-label="Previous products" disabled onClick={() => go(index.current - 1)}>
          <Icon name="arrowL" />
        </button>

        <div
          className="carousel__viewport"
          ref={viewport}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          <ul className="carousel__track" data-track ref={track}>
            {products.map((product, productIndex) => {
              const dim = Boolean(query && !`${product.name} ${product.description}`.toLowerCase().includes(query));
              return (
                <li
                  className={`pcard${dim ? ' is-dim' : ''}`}
                  key={product.name}
                  data-product
                  data-name={product.name}
                  data-price={product.price.toFixed(2)}
                >
                  <div className="pcard__media">
                    <span className="tag">{product.tag}</span>
                    <img src={product.image} width="620" height="734" alt={product.alt} loading="lazy" />
                  </div>
                  <div className="pcard__swatches" role="radiogroup" aria-label={product.swatchLabel}>
                    {product.swatches.map((swatch, swatchIndex) => (
                      <button
                        type="button"
                        key={swatch.label}
                        role="radio"
                        aria-checked={selected[productIndex] === swatch.label}
                        aria-label={swatch.label}
                        style={{ '--sw': swatch.color } as CSSProperties}
                        data-sw={swatch.label}
                        onClick={() => choose(productIndex, swatchIndex)}
                      />
                    ))}
                    <span className="pcard__variant" data-variant>{selected[productIndex]}</span>
                  </div>
                  <h3 className="pcard__name">{product.description}</h3>
                  <div className="pcard__row">
                    <p className="pcard__price">{money(product.price)}</p>
                    <button type="button" className="cart-btn" data-add onClick={(event) => add(product, productIndex, event.currentTarget)}>+ Cart</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button type="button" className="arrow arrow--next" data-next ref={next} aria-label="Next products" onClick={() => go(index.current + 1)}>
          <Icon name="arrowR" />
        </button>
      </div>
      <div className="progress" aria-hidden="true"><span data-progress ref={progress} /></div>
    </section>
  );
}
