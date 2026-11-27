import { useCallback, useEffect, useRef, useState } from 'react';
import { CartDrawer } from '@/components/CartDrawer';
import { Categories } from '@/components/Categories';
import { Craft } from '@/components/Craft';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Preloader } from '@/components/Preloader';
import { Products } from '@/components/Products';
import { Promise } from '@/components/Promise';
import { Reviews } from '@/components/Reviews';
import { Toast, type ToastMessage } from '@/components/Toast';
import { Values } from '@/components/Values';
import { products } from '@/data/catalog';
import { useIntro } from '@/hooks/useIntro';
import { useMarquee, useNav, usePointerEffects } from '@/hooks/useInteractions';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import { gsap, reduced } from '@/lib/gsap';
import { initSmoothScroll, scrollTo, startScroll, stopScroll } from '@/lib/scroll';
import type { CartLine, Product } from '@/types/catalog';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(() => reduced());
  const [menuOpen, setMenuOpen] = useState(false);
  const [solidNav, setSolidNav] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [lines, setLines] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const cartButton = useRef<HTMLButtonElement>(null);

  const onIntroDone = useCallback(() => setLoaderDone(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const showToast = useCallback((text: string) => setToast({ id: Date.now(), text }), []);

  useIntro(onIntroDone);
  useScrollAnimations(loaderDone);
  useMarquee();
  usePointerEffects();
  useNav(menuOpen, cartOpen, closeMenu, setSolidNav);

  useEffect(() => {
    initSmoothScroll();
    if (location.hash && document.querySelector(location.hash)) {
      requestAnimationFrame(() => scrollTo(location.hash, true));
    }
  }, []);

  useEffect(() => {
    const badge = cartButton.current?.querySelector<HTMLElement>('[data-badge]');
    if (badge) gsap.to(badge, { opacity: lines.length ? 1 : 0, duration: reduced() ? 0 : 0.25 });
  }, [lines]);

  useEffect(() => {
    if (cartOpen) stopScroll();
    else startScroll();
  }, [cartOpen]);

  const navigate = (hash: string) => {
    setMenuOpen(false);
    scrollTo(hash);
    history.replaceState(null, '', hash === '#top' ? location.pathname : hash);
  };

  const searchEnter = () => {
    const query = search.trim().toLowerCase();
    scrollTo('#shop');
    if (!query) return;
    const index = products.findIndex((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(query));
    if (index >= 0) window.dispatchEvent(new CustomEvent<number>('sorrel:product-go', { detail: index }));
  };

  const addToCart = (product: Product, variant: string, image: HTMLImageElement | null) => {
    setLines((current) => {
      const key = `${product.name}:${variant}`;
      const existing = current.find((line) => line.key === key);
      if (existing) return current.map((line) => line.key === key ? { ...line, qty: line.qty + 1 } : line);
      return [...current, { key, name: product.name, variant, price: product.price, qty: 1, image: product.image }];
    });

    const button = cartButton.current;
    const badge = button?.querySelector<HTMLElement>('[data-badge]');
    if (!reduced() && button && image) {
      const from = image.getBoundingClientRect();
      const to = button.getBoundingClientRect();
      const fly = document.createElement('img');
      fly.className = 'fly';
      fly.src = product.image;
      fly.alt = '';
      fly.style.width = '70px';
      fly.style.height = '80px';
      document.body.appendChild(fly);
      gsap.set(fly, {
        left: from.left + from.width / 2 - 35,
        top: from.top + from.height / 2 - 40,
        scale: 1.5,
        rotation: -6,
        opacity: 1,
      });
      const x = to.left + to.width / 2 - (from.left + from.width / 2);
      const y = to.top + to.height / 2 - (from.top + from.height / 2);
      gsap.timeline({
        onComplete: () => {
          fly.remove();
          if (badge) gsap.fromTo(badge, { scale: 1.8 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
          gsap.fromTo(button, { rotation: -14 }, { rotation: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.35)' });
          showToast(`${product.name} added to your bag`);
        },
      })
        .to(fly, { x, duration: 0.8, ease: 'power1.inOut' }, 0)
        .to(fly, { y: y - 120, duration: 0.32, ease: 'power2.out' }, 0)
        .to(fly, { y, duration: 0.48, ease: 'power2.in' }, 0.32)
        .to(fly, { scale: 0.2, rotation: 18, duration: 0.8, ease: 'power2.in' }, 0)
        .to(fly, { opacity: 0, duration: 0.12 }, 0.7);
    } else {
      showToast(`${product.name} added to your bag`);
    }
  };

  const changeQty = (key: string, delta: number) => {
    setLines((current) => current
      .map((line) => line.key === key ? { ...line, qty: line.qty + delta } : line)
      .filter((line) => line.qty > 0));
  };

  return (
    <>
      {!loaderDone ? <Preloader /> : null}

      <Header
        solid={solidNav}
        menuOpen={menuOpen}
        search={search}
        cartCount={lines.reduce((sum, line) => sum + line.qty, 0)}
        cartButtonRef={cartButton}
        onSearch={setSearch}
        onSearchEnter={searchEnter}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={closeMenu}
        onOpenCart={() => setCartOpen(true)}
        onNavigate={navigate}
      />

      <main id="main">
        <Hero onShop={() => navigate('#shop')} />
        <Products
          search={search}
          onAdd={addToCart}
          onMore={() => {
            scrollTo('#shop');
            window.dispatchEvent(new CustomEvent<number>('sorrel:product-go', { detail: 1 }));
          }}
        />
        <Craft />
        <Values />
        <Categories onShop={navigate} />
        <Features onShop={() => navigate('#shop')} />
        <Gallery />
        <Reviews />
        <Promise />
      </main>

      <Footer onNavigate={navigate} onBackTop={() => navigate('#top')} />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        onClose={() => setCartOpen(false)}
        onInc={(key) => changeQty(key, 1)}
        onDec={(key) => changeQty(key, -1)}
        onCheckout={() => undefined}
      />
      <Toast message={toast} />
    </>
  );
}
