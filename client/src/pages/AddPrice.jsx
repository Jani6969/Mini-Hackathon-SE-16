import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FISH_CATEGORIES, fishImage } from '../data/fishImages.js';
import { PIN_PATTERN, readPin } from '../utils/pin.js';

const MARKETS = ['Negombo Main', 'Duwa Landing', 'Pitipana'];

export default function AddPrice({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fish: '', market: '', price: '', seller: '' });
  // The PIN is kept apart from the rest of the form and cleared after submit, so
  // it never lingers in shared state, storage or the preview panel.
  const [editPin, setEditPin] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const nextErrors = {};
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
    if (!editPin) nextErrors.editPin = 'Please create a 4-digit Edit PIN.';
    else if (!PIN_PATTERN.test(editPin)) nextErrors.editPin = 'Edit PIN must contain exactly 4 digits.';
    return nextErrors;
  };

  const handleChange = (field, value) => {
    setForm(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setApiError('');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    try {
      setSaving(true);
      await onAdd({ ...form, price: Number(form.price), seller: form.seller.trim(), editPin });
      setEditPin('');
      navigate('/prices');
    } catch (error) {
      setApiError(error.message || 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <p className="eyebrow">Add to the board</p>
      <h1>
        Report today&apos;s <span className="accent">dock price</span>
      </h1>
      <p className="lede">
        Four fields, no account. Your report appears on the public board straight away and helps the
        next fisherman or buyer judge a fair price.
      </p>

      <div className="form-layout section">
        <form className="panel" onSubmit={handleSubmit} noValidate>
          <label htmlFor="fish">Fish type</label>
          <select
            id="fish"
            value={form.fish}
            aria-invalid={Boolean(errors.fish)}
            aria-describedby={errors.fish ? 'fish-error' : undefined}
            onChange={event => handleChange('fish', event.target.value)}
          >
            <option value="">-- Select --</option>
            {FISH_CATEGORIES.map(fish => <option key={fish} value={fish}>{fish}</option>)}
          </select>
          {errors.fish && <p className="error" id="fish-error">{errors.fish}</p>}

          <label htmlFor="market">Landing site</label>
          <select
            id="market"
            value={form.market}
            aria-invalid={Boolean(errors.market)}
            aria-describedby={errors.market ? 'market-error' : undefined}
            onChange={event => handleChange('market', event.target.value)}
          >
            <option value="">-- Select --</option>
            {MARKETS.map(market => <option key={market} value={market}>{market}</option>)}
          </select>
          {errors.market && <p className="error" id="market-error">{errors.market}</p>}

          <label htmlFor="price">Price per kg (Rs.)</label>
          <input
            id="price"
            inputMode="decimal"
            value={form.price}
            placeholder="e.g. 950"
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'price-error' : 'price-note'}
            onChange={event => handleChange('price', event.target.value)}
          />
          {errors.price
            ? <p className="error" id="price-error">{errors.price}</p>
            : <p className="field-note" id="price-note">Price for one kilo, in rupees.</p>}

          <label htmlFor="seller">Reporter name</label>
          <input
            id="seller"
            value={form.seller}
            placeholder="e.g. Nimal"
            aria-invalid={Boolean(errors.seller)}
            aria-describedby={errors.seller ? 'seller-error' : undefined}
            onChange={event => handleChange('seller', event.target.value)}
          />
          {errors.seller && <p className="error" id="seller-error">{errors.seller}</p>}

          <label htmlFor="edit-pin">Edit PIN</label>
          <input
            id="edit-pin"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={editPin}
            placeholder="e.g. 4826"
            aria-invalid={Boolean(errors.editPin)}
            aria-describedby={errors.editPin ? 'pin-error' : 'pin-note'}
            onChange={event => {
              setEditPin(readPin(event));
              setErrors(previous => ({ ...previous, editPin: undefined }));
              setApiError('');
            }}
          />
          {errors.editPin
            ? <p className="error" id="pin-error">{errors.editPin}</p>
            : (
              <p className="field-note" id="pin-note">
                Create a 4-digit PIN. You will need it to edit or delete this report. Reports
                automatically expire after 24 hours.
              </p>
            )}

          {apiError && <p className="error">{apiError}</p>}

          <div className="hero-actions">
            <button className="btn btn-primary btn-block" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Publish price to board'}
            </button>
          </div>
        </form>

        <aside className="panel" aria-label="Preview of your report">
          <div className="panel-head">
            <h3>Your report</h3>
          </div>
          <div className="fish-photo" style={{ borderRadius: '8px', overflow: 'hidden' }}>
          {form.fish ? (
            <img
              src={fishImage(form.fish)}
              alt={form.fish}
              width="800"
              height="600"
            />
          ) : (
            <p className="muted">Select a fish type to attach its photo automatically.</p>
          )}
            {form.price && (
              <p className="fish-price">
                Rs. {form.price} <span>/kg</span>
              </p>
            )}
          </div>
          <div style={{ marginTop: '16px' }}>
            <div className="preview-row">
              <span className="stat-label">Fish</span>
              <span className="preview-value">{form.fish || '—'}</span>
            </div>
            <div className="preview-row">
              <span className="stat-label">Landing site</span>
              <span className="preview-value">{form.market || '—'}</span>
            </div>
            <div className="preview-row">
              <span className="stat-label">Price</span>
              <span className="preview-value">{form.price ? `Rs. ${form.price} /kg` : '—'}</span>
            </div>
            <div className="preview-row">
              <span className="stat-label">Reported by</span>
              <span className="preview-value">{form.seller || '—'}</span>
            </div>
          </div>
        </aside>
      </div>

      <section className="notice">
        <strong>Prototype notice:</strong> Reports are community submitted and are not verified
        market quotations.
      </section>
    </main>
  );
}
