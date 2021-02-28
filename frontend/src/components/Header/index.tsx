import React, {FunctionComponent, useState} from 'react';
import UspBar from './UspBar/UspBar';
import NavBar from './Navbar/NavBar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import './header.scss';
import {RootState} from '../../config/store';
import {useSelector} from 'react-redux';

const Header: FunctionComponent = () => {
    const [navbarOpened, setNavbarOpened] = useState(false);
    const cartCount = useSelector((state: RootState) => state.cart.count);

    return (
        <header>
            <UspBar/>
            <div className="layout-wrapper header">
                <div className="layout-container">
                    <div className="header-content">
                        <button
                            onClick={() => setNavbarOpened(true)}
                            className="action icon-link open-mobile-nav"
                        >
                            <MenuIcon className="icon"/>
                        </button>
                        <Link to="/">
                            <img
                                className="logo"
                                src={process.env.PUBLIC_URL + '/snipshop.png'}
                                alt=""
                            />
                        </Link>
                        {/*<SearchBar/>*/}
                        <div className="header-links">
                            <Link
                                className="action icon-link to-account"
                                to={{
                                    pathname: '/account'
                                }}
                            >
                                <PersonIcon className="icon account"/>
                            </Link>
                            <Link
                                className="action icon-link to-cart"
                                to={{
                                    pathname: '/cart'
                                }}
                            >
                                <ShoppingCartIcon className="icon cart"/>
                                {cartCount > 0 && <span>{cartCount}</span>}
                            </Link>
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
};

export default Header;
