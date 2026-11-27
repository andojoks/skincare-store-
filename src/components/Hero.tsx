import { Icon } from './Icon';

export function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section className="hero" id="top" aria-label="Sorrel botanical skincare">
      <div className="hero__frame" data-hero-frame>
        <div className="hero__media" data-hero-media>
          <img
            src="/photos/sorrel/hero-1600.jpg"
            srcSet="/photos/sorrel/hero-900.jpg 900w, /photos/sorrel/hero-1600.jpg 1600w, /photos/sorrel/hero.jpg 2600w"
            sizes="100vw"
            width="2600"
            height="1500"
            alt="A calm stone-and-walnut bathroom with a living plant wall"
            fetchPriority="high"
          />
        </div>
        <div className="hero__shade" />

        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="line"><span>Botanical</span></span>
            <span className="line"><span><em>Skincare</em> for</span></span>
            <span className="line"><span>slower rituals</span></span>
          </h1>
          <p className="hero__sub">
            Cold-pressed oils, refillable glass and plant-first formulas, made in small batches so your shelf stays simple and your skin stays calm.
          </p>
          <a
            className="btn btn--light"
            href="#shop"
            data-magnetic
            onClick={(event) => {
              event.preventDefault();
              onShop();
            }}
          >
            Shop now
            <Icon name="arrowR" />
          </a>
        </div>

        <aside className="stat" aria-label="98 percent plant-derived ingredients">
          <p className="stat__label">Plant-derived.<br />Refillable.<br />Skin-kind.</p>
          <Icon name="leaf" className="stat__leaf" />
          <p className="stat__num"><em data-stat>0</em><em>%</em></p>
        </aside>

        <a className="hero__scroll" href="#shop" aria-label="Scroll to products" onClick={(event) => {
          event.preventDefault();
          onShop();
        }}><span /></a>
      </div>
    </section>
  );
}
