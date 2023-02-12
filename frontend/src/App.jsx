import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import PlacedOrder from "./pages/PlacedOrder";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:id" element={<PlacedOrder />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/profile/:id/:name" element={<Navigation />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
