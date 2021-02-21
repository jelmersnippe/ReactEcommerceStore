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
                        id: item.id
                    }
                }}
                activeClassName="active"
            >
                <span>{item.title}</span>
            </NavLink>
            {item.categories && (
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
