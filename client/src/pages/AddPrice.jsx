import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FISH = ['Balaya (Skipjack)', 'Kelawalla (Yellowfin)', 'Hurulla', 'Thalapath (Seer)',
  'Isso (Prawns)', 'Paraw (Trevally)', 'Koduwa (Barramundi)'];
const MARKETS = ['Negombo Main', 'Duwa Landing', 'Pitipana'];

export default function AddPrice({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fish: '', market: '', price: '', seller: '' });
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
      await onAdd({ ...form, price: Number(form.price), seller: form.seller.trim() });
      navigate('/prices');
    } catch (error) {
      setApiError(error.message || 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <h1>Report Today&apos;s Price</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="fish">Fish type</label>
        <select id="fish" value={form.fish} onChange={event => handleChange('fish', event.target.value)}>
          <option value="">-- Select --</option>
          {FISH.map(fish => <option key={fish} value={fish}>{fish}</option>)}
        </select>
        {errors.fish && <p className="error">{errors.fish}</p>}
        <label htmlFor="market">Landing site</label>
        <select id="market" value={form.market} onChange={event => handleChange('market', event.target.value)}>
          <option value="">-- Select --</option>
          {MARKETS.map(market => <option key={market} value={market}>{market}</option>)}
        </select>
        {errors.market && <p className="error">{errors.market}</p>}
        <label htmlFor="price">Price per kg (Rs.)</label>
        <input id="price" inputMode="decimal" value={form.price}
          onChange={event => handleChange('price', event.target.value)} placeholder="e.g. 950" />
        {errors.price && <p className="error">{errors.price}</p>}
        <label htmlFor="seller">Reporter name</label>
        <input id="seller" value={form.seller}
          onChange={event => handleChange('seller', event.target.value)} placeholder="e.g. Nimal" />
        {errors.seller && <p className="error">{errors.seller}</p>}
        {apiError && <p className="error">{apiError}</p>}
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Submit Price'}</button>
      </form>
    </main>
  );
}
