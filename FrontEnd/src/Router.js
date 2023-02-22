import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Baemin from './pages/Baemin/Baemin';
import Coupangeats from './pages/Coupangeats/Coupangeats';
import Nplace from './pages/Nplace/Npalce';
import Yogiyo from './pages/Yogiyo/Yogiyo';
import Nav from './components/Nav';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/baemin" element={<Baemin />} />
        <Route path="/coupangeats" element={<Coupangeats />} />
        <Route path="/nplace" element={<Nplace />} />
        <Route path="/yogiyo" element={<Yogiyo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
