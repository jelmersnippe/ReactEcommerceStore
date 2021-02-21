import React, {FunctionComponent, useEffect, useState} from 'react';
import NavItem from './NavItem/NavItem';
import CloseIcon from '@material-ui/icons/Close';

import './navbar.scss';
import Props from './props';
import {CategoryDTO} from '../../../generated';
import api from '../../../config/api';

const NavBar: FunctionComponent<Props> = ({active, onMenuClose}) => {
    const [navbarOpened, SetNavbarOpened] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<CategoryDTO>>([]);

    useEffect(() => {
        SetNavbarOpened(active);
    }, [active]);

    useEffect(() => {
        (async () => {
            const response = await api.category.find();
            setCategories(response.data);
        })();
    }, [])

    return (
        <div className={`layout-wrapper navbar ${navbarOpened ? 'active' : ''}`}>
            <div className="layout-container">
                <ul className="nav-sections">
                    {categories.map((category) => (
                        <NavItem item={category} level={0} key={category.slug}/>
                    ))}
                </ul>
                <button
                    className="action icon-link close-menu"
                    onClick={() => {
                        SetNavbarOpened(false);
                        onMenuClose();
                    }}
                >
                    <CloseIcon className="icon"/>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
