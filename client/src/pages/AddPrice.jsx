import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH = [
  'Balaya (Skipjack)',
  'Kelawalla (Yellowfin)',
  'Hurulla',
  'Thalapath (Seer)',
  'Isso (Prawns)',
  'Paraw (Trevally)',
  'Koduwa (Barramundi)'
];
const MARKETS = ['Negombo Main', 'Duwa Landing', 'Pitipana'];

export default function AddPrice({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fish: '', market: '', price: '', seller: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.fish) e.fish = 'Please select a fish type.';
    if (!form.market) e.market = 'Please select a landing site.';
    if (!form.price) e.price = "Please enter today's price per kilo.";
    else if (isNaN(form.price) || Number(form.price) <= 0) {
      e.price = 'Price must be a number greater than 0.';
    } else if (Number(form.price) > 10000) {
      e.price = 'That looks too high — please check the price per kilo.';
    }
    if (!form.seller.trim()) e.seller = 'Please enter your name.';
    else if (form.seller.trim().length < 3) e.seller = 'Name must be at least 3 characters.';
    return e;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: undefined });
    setApiError('');
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    try {
      setSaving(true);
      await onAdd({ ...form, price: Number(form.price) });
      navigate('/prices');
    } catch (err) {
      setApiError(err.message || 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page add-page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Field report</p>
          <h1>Report Today's Price</h1>
          <p className="muted">Share what a fish is selling for at your landing site this morning.</p>
        </div>
      </div>

      <div className="form-layout">
        <div className="card form-card">
          <div className="form-grid">
            <div>
              <label htmlFor="fish">Fish type</label>
              <select id="fish" value={form.fish} onChange={(e) => handleChange('fish', e.target.value)}>
                <option value="">-- Select --</option>
                {FISH.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              {errors.fish && <p className="error">{errors.fish}</p>}
            </div>

            <div>
              <label htmlFor="market">Landing site</label>
              <select
                id="market"
                value={form.market}
                onChange={(e) => handleChange('market', e.target.value)}
              >
                <option value="">-- Select --</option>
                {MARKETS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.market && <p className="error">{errors.market}</p>}
            </div>

            <div>
              <label htmlFor="price">Price per kg (Rs.)</label>
              <input
                id="price"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="e.g. 950"
                inputMode="decimal"
              />
              {errors.price && <p className="error">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="seller">Your name</label>
              <input
                id="seller"
                value={form.seller}
                onChange={(e) => handleChange('seller', e.target.value)}
                placeholder="e.g. Nimal"
              />
              {errors.seller && <p className="error">{errors.seller}</p>}
            </div>
          </div>

          {apiError && <p className="error">{apiError}</p>}

          <button type="button" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Submit Price'}
          </button>
        </div>

        <aside className="card form-aside">
          <p className="eyebrow">Before you post</p>
          <h3>Use the price you just agreed.</h3>
          <p className="muted">
            Report per kilo, not per pile. A honest number at Duwa helps someone at Pitipana ten
            minutes later.
          </p>
          <ul>
            <li>Empty fields show a clear message</li>
            <li>Price must be a number from 1 to 10,000</li>
            <li>Your name needs at least 3 characters</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
