import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import CheckIcon from '@material-ui/icons/Check';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Props from './props';
import './product_item.scss';
import {FunctionComponent} from 'react';
import React from 'react';

const ProductItem: FunctionComponent<Props> = ({product: {imageUrl, name, sku, price, stock_status}}) => {
    return (
        <div className="product-item">
            <div className="product-media">
                <img src={process.env.PUBLIC_URL + '/' + imageUrl} alt=""/>
            </div>
            <div className="product-info">
                <div className="product-details">
                    <span className="name">{name}</span>
                    <span className="sku">{sku}</span>
                </div>
                <div className="product-pricing">
          <span className="price">
            <EuroSymbolIcon className="icon" fontSize="small"/>
              {price.toString()}
          </span>
                </div>
                <div className="product-stock">
                    {stock_status ? (
                        <span className="available">
              <CheckIcon className="icon"/>
              In stock
            </span>
                    ) : (
                        <span className="unavailable">Out of stock</span>
                    )}
                </div>
                <div className="product-actions">
                    <button className="action to-cart">In winkelwagen</button>
                    <button className="action icon-link to-wishlist">
                        <FavoriteBorderIcon className="icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
