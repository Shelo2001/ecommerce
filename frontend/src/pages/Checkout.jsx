import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart } = useSelector((state) => state.cart);

    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("token")) == null) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            {cart.map((c) => (
                <div>{c.title}</div>
            ))}
        </div>
    );
};

export default Checkout;
