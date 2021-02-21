import React, {FunctionComponent} from 'react';
import {NavLink} from 'react-router-dom';
import Props from './props';

const NavItem: FunctionComponent<Props> = ({item, level}) => {
    return (
        <li className={`nav-item level${level}`}>
            <NavLink to={`/${item.slug}`} activeClassName="active">
                <span>{item.title}</span>
            </NavLink>
            {item.children && (
                <ul className={`submenu level${level + 1}`}>
                    {item.children.map((item) => (
                        <NavItem item={item} level={level + 1} key={item.slug}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default NavItem;
