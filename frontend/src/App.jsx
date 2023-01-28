import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/profile/:id/:name" element={<Navigation />} />
            </Routes>
        </Router>
    );
}

export default App;
