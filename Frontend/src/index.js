import React from "react";
import ReactDOM from "react-dom";

import { AnimatePresence } from "framer-motion/dist/es/index";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Home from "./components/Home";
import ShopList from "./components/ShopList";
import ShopDrugAmount from "./components/ShopDrugAmount";
import ShopOffers from "./components/ShopOffers";
import ShopReview from "./components/ShopReview";
import Drugs from "./components/Drugs";
import IndividualShop from "./components/IndividualShop";
import IndividualDrug from "./components/IndividualDrug";
import ContuctUs from "./components/ContuctUs";
import UserProfile from "./components/UserProfile";
import DrugEdit from "./components/DrugEdit";
import ShopEdit from "./components/ShopEdit";
import Cart from "./components/Cart";

function Routers() {
  return (
    <CookiesProvider>
      <AnimatePresence initial exitBeforeEnter={true}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />

            <Route path="/drugs" element={<Drugs />} />
            <Route path="/drugs/:name" element={<IndividualDrug />} />
            <Route path="/drugs-edit" element={<DrugEdit />} />

            <Route path="/shops" element={<ShopList />} />
            <Route path="/shops/:shopName" element={<IndividualShop />} />
            <Route path="/offer" element={<ShopOffers />} />
            <Route path="/shop-review" element={<ShopReview />} />
            <Route path="/shops-edit" element={<ShopEdit />} />

            <Route path="/sd" element={<ShopDrugAmount />} />
            <Route path="/storedDrugs" element={<ShopDrugAmount />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/cu" element={<ContuctUs />} />
            <Route path="/contuct-us" element={<ContuctUs />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </CookiesProvider>
  );
}

ReactDOM.render(<Routers />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
