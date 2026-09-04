import { useEffect, useRef, useState } from 'react';
import { PIN_PATTERN, readPin } from '../utils/pin.js';

const FISH = ['Balaya (Skipjack)', 'Kelawalla (Yellowfin)', 'Hurulla', 'Thalapath (Seer)',
  'Isso (Prawns)', 'Paraw (Trevally)', 'Koduwa (Barramundi)'];
const MARKETS = ['Negombo Main', 'Duwa Landing', 'Pitipana'];

/**
 * One dialog for both owner actions on a report.
 *
 * mode="edit"   — prefilled fields plus the PIN, saves through onConfirm.
 * mode="delete" — confirmation plus the PIN only.
 *
 * The PIN lives in local state for the lifetime of the dialog and is dropped the
 * moment it closes. It is never lifted into app state or persisted anywhere.
 */
export default function PriceActionModal({ mode, price, onConfirm, onClose }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState({
    fish: price.fish,
    market: price.market,
    price: String(price.price),
    seller: price.seller
  });
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [busy, setBusy] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = event => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleChange = (field, value) => {
    setForm(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setApiError('');
  };

  const validate = () => {
    const nextErrors = {};
    if (isEdit) {
      if (!form.fish) nextErrors.fish = 'Please select a fish type.';
      if (!form.market) nextErrors.market = 'Please select a landing site.';
      if (!form.price) nextErrors.price = "Please enter today's price per kilo.";
      else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
        nextErrors.price = 'Price must be a number greater than 0.';
      } else if (Number(form.price) > 10000) {
        nextErrors.price = 'That looks too high — please check the price per kilo.';
      }
      if (!form.seller.trim()) nextErrors.seller = 'Please enter your name.';
      else if (form.seller.trim().length < 3) nextErrors.seller = 'Name must be at least 3 characters.';
    }
    if (!pin) nextErrors.pin = 'Please enter your 4-digit Edit PIN.';
    else if (!PIN_PATTERN.test(pin)) nextErrors.pin = 'Edit PIN must contain exactly 4 digits.';
    return nextErrors;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setBusy(true);
      setApiError('');
      if (isEdit) {
        await onConfirm({
          fish: form.fish,
          market: form.market,
          price: Number(form.price),
          seller: form.seller.trim(),
          editPin: pin
        });
      } else {
        await onConfirm(pin);
      }
      // Parent closes the dialog on success, which unmounts this state entirely.
    } catch (error) {
      // A wrong PIN keeps the dialog open so the reporter can try again.
      setApiError(error.message || 'Something went wrong. Please try again.');
      setPin('');
      setBusy(false);
    }
  };

  const title = isEdit ? 'Edit this price report' : 'Delete this price report?';

  return (
    <div className="modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="panel-head">
          <h3 id="modal-title">{title}</h3>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {isEdit ? (
            <>
              <label htmlFor="edit-fish">Fish type</label>
              <select
                id="edit-fish"
                ref={firstFieldRef}
                value={form.fish}
                aria-invalid={Boolean(errors.fish)}
                onChange={event => handleChange('fish', event.target.value)}
              >
                <option value="">-- Select --</option>
                {FISH.map(fish => <option key={fish} value={fish}>{fish}</option>)}
              </select>
              {errors.fish && <p className="error">{errors.fish}</p>}

              <label htmlFor="edit-market">Landing site</label>
              <select
                id="edit-market"
                value={form.market}
                aria-invalid={Boolean(errors.market)}
                onChange={event => handleChange('market', event.target.value)}
              >
                <option value="">-- Select --</option>
                {MARKETS.map(market => <option key={market} value={market}>{market}</option>)}
              </select>
              {errors.market && <p className="error">{errors.market}</p>}

              <label htmlFor="edit-price">Price per kg (Rs.)</label>
              <input
                id="edit-price"
                inputMode="decimal"
                value={form.price}
                aria-invalid={Boolean(errors.price)}
                onChange={event => handleChange('price', event.target.value)}
              />
              {errors.price && <p className="error">{errors.price}</p>}

              <label htmlFor="edit-seller">Reporter name</label>
              <input
                id="edit-seller"
                value={form.seller}
                aria-invalid={Boolean(errors.seller)}
                onChange={event => handleChange('seller', event.target.value)}
              />
              {errors.seller && <p className="error">{errors.seller}</p>}
            </>
          ) : (
            <p className="modal-lede">
              <strong>{price.fish}</strong> at Rs. {price.price} /kg, {price.market}, reported by{' '}
              {price.seller}. This cannot be undone. To protect this report, enter the 4-digit Edit
              PIN.
            </p>
          )}

          <label htmlFor="edit-pin">Edit PIN</label>
          <input
            id="edit-pin"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            placeholder="••••"
            value={pin}
            ref={isEdit ? undefined : firstFieldRef}
            aria-invalid={Boolean(errors.pin)}
            onChange={event => {
              setPin(readPin(event));
              setErrors(previous => ({ ...previous, pin: undefined }));
              setApiError('');
            }}
          />
          {errors.pin && <p className="error">{errors.pin}</p>}

          {apiError && <p className="error">{apiError}</p>}

          <p className="field-note">
            Forgot your PIN? For privacy, Edit PINs cannot be recovered. This report will
            automatically expire within 24 hours.
          </p>

          <div className="modal-actions">
            <button className="btn btn-ghost" type="button" onClick={onClose} disabled={busy}>
              Cancel
            </button>
            <button
              className={`btn ${isEdit ? 'btn-primary' : 'btn-danger'}`}
              type="submit"
              disabled={busy}
            >
              {busy
                ? (isEdit ? 'Saving...' : 'Deleting...')
                : (isEdit ? 'Save changes' : 'Delete report')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
