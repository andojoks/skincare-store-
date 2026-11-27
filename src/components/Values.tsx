import { Icon } from './Icon';

const items = [
  { first: 'Cold', rest: 'Pressed', icon: 'leaf', pill: false },
  { first: 'Endless', rest: 'Refills', icon: 'refill', pill: true },
  { first: 'Cruelty', rest: 'Free, always', icon: 'heart', pill: false },
] as const;

export function Values() {
  return (
    <section className="values wrap" aria-label="Our values">
      <ul className="values__list">
        {items.map((item) => (
          <li className={`value${item.pill ? ' value--pill' : ''}`} key={item.first} data-value>
            <span className="value__icon"><Icon name={item.icon} /></span>
            <p><em>{item.first}</em><br />{item.rest}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
