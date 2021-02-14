import React from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";

function NavItem({ item, level }) {
  return (
    <li className={`nav-item level${level}`}>
      <NavLink to={`/${item.slug}`} activeClassName="active">
        <span>{item.title}</span>
      </NavLink>
      {item.children?.length > 0 && (
        <ul className={`submenu level${level + 1}`}>
          {item.children.map((item) => (
            <NavItem item={item} level={level + 1} key={item.slug} />
          ))}
        </ul>
      )}
    </li>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  level: PropTypes.number.isRequired,
};

export default NavItem;
