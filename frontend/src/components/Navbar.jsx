import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/users/usersSlice";
import Cart from "./Cart";

const Navbar = () => {
    const dispatch = useDispatch();
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    const { colorMode, toggleColorMode } = useColorMode();
    const logoutHandler = () => {
        dispatch(logout());
    };
    const [cart, setCart] = useState(false);
    return (
        <div className="cart">
            <div className="container-between">
                <div>
                    <Link to="/">
                        <Text fontSize="4xl">STORE.</Text>
                    </Link>
                </div>
                <div className="container-between">
                    {userFromStorage ? (
                        <>
                            <Cart />
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    colorScheme="teal"
                                    variant="outline"
                                >
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
                            <Button
                                backgroundColor={"transparent"}
                                _hover={{ backgroundColor: "transparent" }}
                                onClick={toggleColorMode}
                            >
                                {colorMode === "light" ? (
                                    <i class="fa-solid fa-moon"></i>
                                ) : (
                                    <i
                                        style={{ color: "yellow" }}
                                        class="fa-solid fa-sun"
                                    ></i>
                                )}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Cart />

                            <Link to="/login">
                                <i className="fa-solid fa-user"></i>
                            </Link>
                            <Button
                                backgroundColor={"transparent"}
                                _hover={{ backgroundColor: "transparent" }}
                                onClick={toggleColorMode}
                            >
                                {colorMode === "light" ? (
                                    <i class="fa-solid fa-moon"></i>
                                ) : (
                                    <i
                                        style={{ color: "yellow" }}
                                        class="fa-solid fa-sun"
                                    ></i>
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
