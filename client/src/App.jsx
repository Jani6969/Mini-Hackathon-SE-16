import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import AddPrice from './pages/AddPrice.jsx';
import PriceList from './pages/PriceList.jsx';
import NotFound from './pages/NotFound.jsx';
import { createPrice, deletePrice, getPrices, updatePrice } from './api/priceApi.js';
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
      // Drop the PIN on the floor: demo entries are not persisted and nothing in
      // the app should ever hold a raw PIN in state.
      const { editPin, ...demoEntry } = entry;
      setPrices(previous => [
        { ...demoEntry, _id: `demo-${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
        ...previous
      ]);
      return;
    }
    const saved = await createPrice(entry);
    setPrices(previous => [saved, ...previous]);
  };

  // Edit and delete are only offered against the live API. In fallback mode the
  // cards are disabled, so these never run without a real database behind them.
  const editPrice = async (id, entry) => {
    const saved = await updatePrice(id, entry);
    setPrices(previous => previous.map(price => (price._id === id ? saved : price)));
  };

  const removePrice = async (id, editPin) => {
    await deletePrice(id, editPin);
    setPrices(previous => previous.filter(price => price._id !== id));
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
        <Route
          path="/prices"
          element={
            <PriceList
              prices={prices}
              loading={loading}
              offline={offline}
              onEdit={editPrice}
              onDelete={removePrice}
            />
          }
        />
        <Route path="/add" element={<AddPrice onAdd={addPrice} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
