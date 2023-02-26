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
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    const { colorMode, toggleColorMode } = useColorMode();
    const logoutHandler = () => {
        dispatch(logout());
    };

    const handleClick = (lang) => {
        i18n.changeLanguage(lang);
    };

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
                                    <MenuGroup title={t(`My Account.1`)}>
                                        <Link
                                            to={`/profile/${userFromStorage.id}/${userFromStorage.name}`}
                                        >
                                            {" "}
                                            <MenuItem>
                                                {t("Profile.1")}
                                            </MenuItem>
                                        </Link>
                                        <MenuItem onClick={logoutHandler}>
                                            {t("Logout.1")}
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
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    colorScheme="teal"
                                    variant="outline"
                                >
                                    {t("Languages.1")}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleClick("ge")}>
                                        {t("GE.1")}
                                    </MenuItem>
                                    <MenuItem onClick={() => handleClick("en")}>
                                        {t("EN.1")}
                                    </MenuItem>
                                </MenuList>
                            </Menu>
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
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    colorScheme="teal"
                                    variant="outline"
                                >
                                    {t("Languages.1")}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleClick("ge")}>
                                        {t("GE.1")}
                                    </MenuItem>
                                    <MenuItem onClick={() => handleClick("en")}>
                                        {t("EN.1")}
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
