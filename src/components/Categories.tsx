import { rituals } from '@/data/catalog';
import { W } from '@/lib/text';
import { Icon } from './Icon';

export function Categories({ onShop }: { onShop: (href: string) => void }) {
  return (
    <section className="cats wrap" aria-labelledby="cats-h">
      <div className="head">
        <h2 id="cats-h" data-split>
          <W>Explore</W> <W>our</W> <W>gentle</W> <W>and</W><br />
          <W>plant-first</W> <W><span className="spark">✧</span></W> <em><W>Rituals</W></em>
        </h2>
      </div>

      <ul className="cats__grid">
        {rituals.map((ritual) => (
          <li className="cat" key={ritual.label} data-cat>
            <div className="cat__media">
              <img src={ritual.image} width="800" height="1202" alt={`${ritual.label} ritual`} loading="lazy" />
            </div>
            <div className="cat__copy">
              <p>Explore<br /><em>{ritual.label}</em>{ritual.title}</p>
              <a className="pill" href={ritual.href} onClick={(event) => {
                event.preventDefault();
                onShop(ritual.href);
              }}>Shop <Icon name="arrowR" /></a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
