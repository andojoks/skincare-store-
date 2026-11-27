import { useRef, useState, type FormEvent } from 'react';
import { duration, gsap } from '@/lib/gsap';

const columns = [
  { title: 'Shop', links: ['Face', 'Body', 'Bath', 'Refills'] },
  { title: 'About', links: ['Our apothecary', 'Ingredients', 'Journal'] },
  { title: 'Help', links: ['Shipping', 'Returns', 'Contact'] },
] as const;

export function Footer({ onNavigate, onBackTop }: {
  onNavigate: (href: string) => void;
  onBackTop: () => void;
}) {
  const form = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLParagraphElement>(null);
  const [copy, setCopy] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = Boolean(input.current?.value.trim()) && Boolean(input.current?.checkValidity());
    form.current?.setAttribute('data-state', valid ? 'done' : 'error');
    setCopy(valid ? 'Welcome in. Your first slow note is on its way.' : "That email doesn't look right yet.");
    gsap.fromTo(message.current, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: duration(0.5), ease: 'power3.out' });
    if (!valid) gsap.fromTo(input.current, { x: -8 }, { x: 0, duration: duration(0.6), ease: 'elastic.out(1, 0.3)' });
    if (valid && input.current) input.current.value = '';
  };

  return (
    <footer className="footer">
      <div className="footer__top wrap">
        <div className="footer__news">
          <h2 id="foot-h">Slow notes, <em>once a month</em></h2>
          <form className="news" data-news ref={form} noValidate onSubmit={submit}>
            <label className="sr" htmlFor="news-email">Email address</label>
            <input id="news-email" type="email" required placeholder="you@example.com" ref={input} />
            <button type="submit" className="btn btn--light">Subscribe</button>
            <p className="news__msg" ref={message}>{copy}</p>
          </form>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          {columns.map((column) => (
            <div key={column.title}>
              <p>{column.title}</p>
              {column.links.map((link) => (
                <a key={link} href="#shop" onClick={(event) => {
                  event.preventDefault();
                  onNavigate('#shop');
                }}>{link}</a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <p className="footer__word" data-footword aria-hidden="true">
        {'Sorrel'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
      </p>

      <div className="footer__base wrap">
        <p>© 2026 Sorrel Botanicals. Photos via Unsplash.</p>
        <a className="link" href="#top" onClick={(event) => {
          event.preventDefault();
          onBackTop();
        }}>Back to top ↑</a>
      </div>
    </footer>
  );
}
