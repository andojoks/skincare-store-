const paths: Record<string, string[]> = {
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'm21 21-4.3-4.3'],
  bag: ['M6 8h12l-1 12H7L6 8Z', 'M9 8V6a3 3 0 0 1 6 0v2'],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0'],
  arrowR: ['M5 12h14', 'm14 7 5 5-5 5'],
  arrowL: ['M19 12H5', 'm10 7-5 5 5 5'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  leaf: ['M20 4C10 4 4 9 4 16a4 4 0 0 0 4 4c7 0 12-6 12-16Z', 'M4 20c4-5 8-8 13-10'],
  refill: ['M20 7v5h-5', 'M19 12a7 7 0 1 1-2-5', 'M4 17v-5h5', 'M5 12a7 7 0 1 0 2 5'],
  heart: ['M12 20s-7-4.5-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.5-7 9-7 9Z'],
};

export function Icon({ name, className }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {(paths[name] ?? paths.arrowR).map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
