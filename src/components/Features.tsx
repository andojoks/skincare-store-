import { W } from '@/lib/text';
import { Icon } from './Icon';

function Feature({
  id,
  heading,
  copy,
  image,
  alt,
  flip = false,
  onShop,
}: {
  id?: string;
  heading: [string, string];
  copy: string;
  image: string;
  alt: string;
  flip?: boolean;
  onShop: () => void;
}) {
  return (
    <section className={`feature wrap${flip ? ' feature--flip' : ''}`} id={id}>
      <div className="feature__copy">
        <h2 data-split><W>{heading[0]}</W> <em><W>{heading[1]}</W></em></h2>
        <p data-rise>{copy}</p>
        <a className="btn btn--dark" href="#shop" data-magnetic data-rise onClick={(event) => {
          event.preventDefault();
          onShop();
        }}>
          Shop now <Icon name="arrowR" />
        </a>
      </div>
      <div className="feature__media" data-curtain>
        <img src={image} width="1400" height="934" alt={alt} loading="lazy" />
      </div>
    </section>
  );
}

export function Features({ onShop }: { onShop: () => void }) {
  return (
    <>
      <Feature
        id="best"
        heading={['Best', 'sellers']}
        copy="Our three most-refilled bottles: a cleansing gel, a toner and a body milk, poured into olive glass that protects every botanical from the light."
        image="/photos/sorrel/best.jpg"
        alt="Three olive glass bottles with gold labels"
        onShop={onShop}
      />
      <Feature
        heading={['New', 'Arrival']}
        copy="Saffron Glow Drops: a featherweight facial oil with bakuchiol and saffron, for a soft, even glow that lasts all day."
        image="/photos/sorrel/new.jpg"
        alt="Floating amber serum bottle with its dropper lifting off"
        flip
        onShop={onShop}
      />
    </>
  );
}
