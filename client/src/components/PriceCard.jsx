import { fishImage } from '../data/fishImages.js';
import { expiryLabel } from '../utils/expiry.js';

export default function PriceCard({ price, onEdit, onDelete, actionsDisabled, disabledReason }) {
  const expiry = expiryLabel(price.expiresAt);
  const showActions = Boolean(onEdit || onDelete);

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
          {expiry && <span className="chip chip-expiry">{expiry}</span>}
        </div>
        <p className="fish-meta">
          <span>Reported by {price.seller}</span>
        </p>

        {showActions && (
          <div className="card-actions">
            <button
              className="btn btn-ghost btn-small"
              type="button"
              onClick={() => onEdit(price)}
              disabled={actionsDisabled}
              title={actionsDisabled ? disabledReason : undefined}
            >
              Edit
            </button>
            <button
              className="btn btn-ghost btn-small btn-danger-ghost"
              type="button"
              onClick={() => onDelete(price)}
              disabled={actionsDisabled}
              title={actionsDisabled ? disabledReason : undefined}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
