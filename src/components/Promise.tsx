import { Word } from '@/lib/text';

function InlinePhoto({ src, alt }: { src: string; alt: string }) {
  return <span className="inline-img"><img src={src} alt={alt} loading="lazy" /></span>;
}

export function Promise() {
  return (
    <section className="promise wrap" aria-label="Our promise">
      <figure className="promise__stack" data-stack>
        <img src="/photos/sorrel/bloom.jpg" width="800" height="1198" alt="Woman among pink flowers" loading="lazy" />
        <img src="/photos/sorrel/g-hand.jpg" width="800" height="533" alt="Oil dropped onto a palm" loading="lazy" />
        <img src="/photos/sorrel/cat-face.jpg" width="800" height="1202" alt="Serum dropper in late sunlight" loading="lazy" />
      </figure>

      <p className="promise__text" data-scrub-words>
        <Word>Discover</Word> <Word>our</Word> <Word>commitment</Word> <Word>to</Word>{' '}
        <InlinePhoto src="/photos/sorrel/g-dried.jpg" alt="Pressed botanicals" />{' '}
        <em><Word>plant-born</Word></em> <Word>ingredients,</Word> <Word>low-waste</Word> <Word>refills</Word> <Word>and</Word> <Word>fair</Word> <Word>sourcing</Word> <Word>partnerships,</Word> <Word>all</Word> <Word>poured</Word> <Word>to</Word> <Word>support</Word> <Word>healthier</Word> <Word>skin</Word> <Word>and</Word> <Word>a</Word>{' '}
        <InlinePhoto src="/photos/sorrel/g-petals.jpg" alt="Dried rose petals" />{' '}
        <em><Word>gentler</Word></em> <Word>planet.</Word>
      </p>
    </section>
  );
}
