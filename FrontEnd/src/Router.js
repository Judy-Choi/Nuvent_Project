import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Baemin from "./pages/Baemin";
import Coupangeats from "./pages/Coupangeats";
import Nplace from "./pages/Npalce";
import Yogiyo from "./pages/Yogiyo";

const Router = () => {
  return (
    <BrowserRouter>
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
