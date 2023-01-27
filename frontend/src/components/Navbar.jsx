import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/users/usersSlice";
import Cart from "./Cart";

const Navbar = () => {
    const dispatch = useDispatch();
    const userFromStorage = JSON.parse(localStorage.getItem("user"));

    const logoutHandler = () => {
        dispatch(logout());
    };
    const [cart, setCart] = useState(false);
    return (
        <div className="container-between">
            <div>
                <Link to="/">
                    <Text fontSize="4xl">Store.</Text>
                </Link>
            </div>
            <div className="container-between">
                {userFromStorage ? (
                    <>
                        <Cart />
                        <Menu>
                            <MenuButton as={Button} colorScheme="blue">
                                {userFromStorage.name}
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title="My Account">
                                    <Link
                                        to={`/profile/${userFromStorage.id}/${userFromStorage.name}`}
                                    >
                                        {" "}
                                        <MenuItem>Profile</MenuItem>
                                    </Link>
                                    <MenuItem onClick={logoutHandler}>
                                        Logout
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                        <Cart />
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
