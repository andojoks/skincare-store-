import type { ReactNode } from 'react';

/** Source `[data-split]` target: an overflow mask with an animated inner word. */
export function W({ children }: { children: ReactNode }) {
  return <span className="wm"><span>{children}</span></span>;
}

/** Source `[data-scrub-words]` target. */
export function Word({ children }: { children: ReactNode }) {
  return <span className="w">{children}</span>;
}

/** Splits display copy into source-style animated word spans. */
export function Words({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\s+)/).map((part, index) => (
        /\s/.test(part) ? <span key={index}>{part}</span> : <Word key={index}>{part}</Word>
      ))}
    </>
  );
}
