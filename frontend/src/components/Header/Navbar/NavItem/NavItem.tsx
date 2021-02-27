import React, {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';
import Props from './props';

const NavItem: FunctionComponent<Props> = ({item, level}) => {
    return (
        <li className={`nav-item level${level}`}>
            <NavLink
                to={{
                    pathname: `/category/${item.slug}`,
                    state: {
                        category: item
                    }
                }}
                activeClassName="active"
            >
                <span>{item.title}</span>
            </NavLink>
            {(item.categories && item.categories.length > 0) && (
                <ul className={`submenu level${level + 1}`}>
                    {item.categories.map((item) => (
                        <NavItem item={item} level={level + 1} key={item.slug}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default NavItem;
