import { fishImage } from '../data/fishImages.js';

export default function PriceCard({ price }) {
  return (
    <article className="fish-card">
      <div className="fish-photo">
        <img src={fishImage(price.fish)} alt={price.fish} loading="lazy" width="800" height="600" />
        <p className="fish-price">
          Rs. {price.price} <span>/kg</span>
        </p>
      </div>
      <div className="fish-body">
        <h2>{price.fish}</h2>
        <div className="chips">
          <span className="chip">{price.market}</span>
          <span className="chip">{price.date}</span>
        </div>
        <p className="fish-meta">
          <span>Reported by {price.seller}</span>
        </p>
      </div>
    </article>
  );
}
