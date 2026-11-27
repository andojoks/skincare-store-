import { reviews } from '@/data/catalog';

function ReviewList({ hidden = false }: { hidden?: boolean }) {
  return (
    <>
      {reviews.map((review) => (
        <li className="review" key={`${review.name}-${hidden ? 'clone' : 'main'}`} aria-hidden={hidden || undefined}>
          <span className="q">“</span>
          <p>{review.quote}</p>
          <footer><em>{review.name}</em><span>{review.role}</span></footer>
        </li>
      ))}
    </>
  );
}

export function Reviews() {
  return (
    <section className="reviews wrap" aria-label="Customer reviews">
      <div className="reviews__panel">
        <div className="reviews__score">
          <p className="reviews__num"><em data-rating>0.0</em><span>/5</span></p>
          <p>More than <strong data-reviews>0</strong><br />five-star reviews for our refillable range</p>
        </div>

        <div className="marquee" data-marquee>
          <ul className="marquee__row" data-marquee-row>
            <ReviewList />
            <ReviewList hidden />
          </ul>
        </div>
      </div>
    </section>
  );
}
