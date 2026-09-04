import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import AddPrice from './pages/AddPrice.jsx';
import PriceList from './pages/PriceList.jsx';
import NotFound from './pages/NotFound.jsx';
import { createPrice, getPrices } from './api/priceApi.js';
import { sampleData } from './data/sampleData.js';

export default function App() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    getPrices()
      .then(data => {
        setPrices(data);
        setOffline(false);
      })
      .catch(() => {
        setPrices(sampleData);
        setOffline(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const addPrice = async entry => {
    if (offline) {
      setPrices(previous => [
        { ...entry, _id: `demo-${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
        ...previous
      ]);
      return;
    }
    const saved = await createPrice(entry);
    setPrices(previous => [saved, ...previous]);
  };

  return (
    <BrowserRouter>
      <Navbar
        landingSites={new Set(prices.map(price => price.market)).size}
        entryCount={prices.length}
      />
      {offline && (
        <div className="offline-banner" role="status">
          API unavailable — showing demonstration sample data. New entries in this mode are not persisted to MongoDB.
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home prices={prices} />} />
        <Route path="/prices" element={<PriceList prices={prices} loading={loading} />} />
        <Route path="/add" element={<AddPrice onAdd={addPrice} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
