import { Words } from '@/lib/text';

export function Craft() {
  return (
    <section className="craft" id="about">
      <div className="craft__frame" data-craft-frame>
        <div className="craft__media">
          <img src="/photos/sorrel/atelier.jpg" width="1800" height="1200" alt="Warm apothecary shelves of botanical bottles" loading="lazy" />
        </div>
        <div className="craft__shade" />
        <p className="craft__text" data-scrub-words>
          <Words>
            We blend skincare you can trust for years to come, through busy mornings and slow evenings. Every bottle is poured by hand in our apothecary, from cold-pressed botanicals and nothing you can’t pronounce.
          </Words>
        </p>
      </div>
    </section>
  );
}
