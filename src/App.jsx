// import { useState } from "react";

import Home from './pages/Home';

import Preloader from './components/preloader/Preloader';
import OurStory from './pages/OurStory';
import { useRef } from 'react';
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import useNavbarAnimation from './hooks/useNavbarAnimation';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

const App = () => {
  // const [loading, setLoading] = useState(true);
  const navRef = useRef();
  useNavbarAnimation(navRef);
  return (
    <>
      <Navbar navbarRef={navRef} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<OurStory />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>

    // <>
    //   {loading && <Preloader onComplete={() => setLoading(false)} />}

    //   {!loading && <Home />}
    // </>
  );
};

export default App;
