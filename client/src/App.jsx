import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPrice from './pages/AddPrice';
import PriceList from './pages/PriceList';
import NotFound from './pages/NotFound';
import { getPrices, createPrice } from './api/priceApi';
import { sampleData } from './data/sampleData';

export default function App() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    getPrices()
      .then(setPrices)
      .catch(() => {
        setPrices(sampleData);
        setOffline(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const addPrice = async (entry) => {
    if (offline) {
      setPrices((prev) => [{ ...entry, _id: String(Date.now()), date: new Date().toISOString().slice(0, 10) }, ...prev]);
      return;
    }
    const saved = await createPrice(entry);
    setPrices((prev) => [saved, ...prev]);
  };

  return (
    <BrowserRouter>
      <Navbar offline={offline} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prices" element={<PriceList prices={prices} loading={loading} />} />
        <Route path="/add" element={<AddPrice onAdd={addPrice} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
