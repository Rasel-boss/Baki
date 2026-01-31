import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ShopDetails from './pages/ShopDetails';
import AddEntry from './pages/AddEntry';
import Settings from './pages/Settings';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop/:id" element={<ShopDetails />} />
            <Route path="add-entry/:shopId" element={<AddEntry />} />
            <Route path="add-entry/:shopId/:entryId" element={<AddEntry />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;