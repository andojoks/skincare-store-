import { gallery } from '@/data/catalog';
import { W } from '@/lib/text';
import { Icon } from './Icon';

const tall = new Set([1, 3, 5]);

export function Gallery() {
  const scroll = (direction: -1 | 1) => {
    const viewport = document.querySelector<HTMLElement>('[data-gal-viewport]');
    viewport?.scrollBy({ left: direction * 0.6 * viewport.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="gallery" id="gallery">
      <div className="head wrap">
        <h2 data-split>
          <W>Thoughtful,</W> <W>skin-first</W> <W>ideas</W><br />
          <W>and</W> <W>inspiration</W> <W><span className="spark">✧</span></W> <em><W>Gallery</W></em>
        </h2>
        <div className="head__arrows">
          <button type="button" className="arrow arrow--sm" data-gal-prev aria-label="Scroll gallery back" onClick={() => scroll(-1)}>
            <Icon name="arrowL" />
          </button>
          <button type="button" className="arrow arrow--sm" data-gal-next aria-label="Scroll gallery forward" onClick={() => scroll(1)}>
            <Icon name="arrowR" />
          </button>
        </div>
      </div>

      <div className="gallery__viewport" data-gal-viewport>
        <ul className="gallery__track" data-gal-track>
          {gallery.map((item, index) => {
            const [first, ...rest] = item.title.split(' ');
            return (
              <li className={`gtile${tall.has(index) ? ' gtile--tall' : ''}`} key={item.title}>
                <img src={item.image} width="800" height="533" alt={item.title} loading="lazy" />
                <p><em>{first}</em> {rest.join(' ')}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
