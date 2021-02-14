import React, { useState } from "react";
import UspBar from "./UspBar";
import NavBar from "./NavBar";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

import "./header.scss";
import SearchBar from '../SearchBar';

function Header() {
    const [navbarOpened, setNavbarOpened] = useState(false);

    return (
        <header>
            <UspBar />

            <div className="layout-wrapper header">
                <div className="layout-container">
                    <div className="header-content">
                        <button
                            onClick={() => setNavbarOpened(true)}
                            className="action icon-link open-mobile-nav"
                        >
                            <MenuIcon className="icon" />
                        </button>
                        <Link to="/">
                            <img
                                className="logo"
                                src={process.env.PUBLIC_URL + "/snipshop.png"}
                                alt=""
                            />
                        </Link>
                        <SearchBar />
                        <div className="header-links">
                            <button className="action icon-link to-account">
                                <PersonIcon className="icon account" />
                            </button>
                            <button className="action icon-link to-cart">
                                <ShoppingCartIcon className="icon cart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <NavBar
                active={navbarOpened}
                onMenuClose={() => {
                    setNavbarOpened(false);
                }}
            />
        </header>
    );
}

export default Header;