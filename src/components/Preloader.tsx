export function Preloader() {
  return (
    <div className="loader" aria-hidden="true">
      <p className="loader__word">
        {'Sorrel'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
      </p>
      <p className="loader__count"><span data-count>0</span>%</p>
    </div>
  );
}
