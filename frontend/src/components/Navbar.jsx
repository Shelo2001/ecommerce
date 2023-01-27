import { Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="container-between">
            <div>
                <Link to="/">
                    <Text fontSize="5xl">Store.</Text>
                </Link>
            </div>
            <div className="container-between">
                <Link to="/login">
                    <i className="fa-solid fa-user"></i>
                </Link>
                <Link to="/cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
