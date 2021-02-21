import React, {FunctionComponent, useEffect, useState} from 'react';
import NavItem from './NavItem/NavItem';
import CloseIcon from '@material-ui/icons/Close';

import './navbar.scss';
import Props from './props';

const navItems = [
    {
        title: 'Boeken',
        url: '#',
        slug: 'books',
        children: [
            {
                title: 'Categorieën',
                url: '#',
                slug: 'categories',
                children: [
                    {
                        title: 'Literatuur & Romans',
                        url: '#',
                        slug: 'literature-novels',
                        children: []
                    },
                    {
                        title: 'Thrillers & Spanning',
                        url: '#',
                        slug: 'thrillers-suspense',
                        children: []
                    }
                ]
            },
            {
                title: 'Taal',
                url: '#',
                slug: 'language',
                children: [
                    {
                        title: 'Nederslandtalige boeken',
                        url: '#',
                        slug: 'dutch',
                        children: []
                    },
                    {
                        title: 'Engelstalige boeken',
                        url: '#',
                        slug: 'english',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        title: 'Muziek, Film & Games',
        url: '#',
        slug: 'music-film-games',
        children: [
            {
                title: 'Muziek',
                url: '#',
                slug: 'music',
                children: [
                    {
                        title: 'Cd\'s',
                        url: '#',
                        slug: 'cds',
                        children: []
                    },
                    {
                        title: 'Lp\'s',
                        url: '#',
                        slug: 'lps',
                        children: []
                    }
                ]
            },
            {
                title: 'Films & Series',
                url: '#',
                slug: 'film-series',
                children: [
                    {
                        title: 'DVD',
                        url: '#',
                        slug: 'dvd',
                        children: []
                    },
                    {
                        title: 'Blu-ray',
                        url: '#',
                        slug: 'blu-ray',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        title: 'Computer & Elektronica',
        url: '#',
        slug: 'computer-electronics',
        children: [
            {
                title: 'Computer',
                url: '#',
                slug: 'computer',
                children: [
                    {
                        title: 'Laptops',
                        url: '#',
                        slug: 'laptops',
                        children: []
                    },
                    {
                        title: 'Desktops',
                        url: '#',
                        slug: 'desktops',
                        children: []
                    }
                ]
            },
            {
                title: 'Telefonie',
                url: '#',
                slug: 'telephone',
                children: [
                    {
                        title: 'Smartphones',
                        url: '#',
                        slug: 'smartphones',
                        children: []
                    },
                    {
                        title: 'Mobiele abonnementen',
                        url: '#',
                        slug: 'mobile-subscriptions',
                        children: []
                    }
                ]
            }
        ]
    }
];

const NavBar: FunctionComponent<Props> = ({active, onMenuClose}) => {
    const [navbarOpened, SetNavbarOpened] = useState<boolean>(false);

    useEffect(() => {
        SetNavbarOpened(active);
    }, [active]);

    return (
        <div className={`layout-wrapper navbar ${navbarOpened ? 'active' : ''}`}>
            <div className="layout-container">
                <ul className="nav-sections">
                    {navItems.map((item) => (
                        <NavItem item={item} level={0} key={item.slug}/>
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
