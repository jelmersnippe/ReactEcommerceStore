import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import CheckIcon from '@material-ui/icons/Check';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Props from './props';
import './product_item.scss';
import React, {FunctionComponent} from 'react';

const ProductItem: FunctionComponent<Props> = ({product}) => {
    return (
        <div className="product-item">
            <div className="product-media">
                <img src={process.env.PUBLIC_URL + '/' + product.image} alt=""/>
            </div>
            <div className="product-info">
                <div className="product-details">
                    <span className="name">{product.name}</span>
                    <span className="sku">{product.sku}</span>
                </div>
                <div className="product-pricing">
          <span className="price">
            <EuroSymbolIcon className="icon" fontSize="small"/>
              {product.price.toString()}
          </span>
                </div>
                <div className="product-stock">
                    {product.stock > 0 ?
                        (
                            <span className="available">
                            <CheckIcon className="icon"/>
                            In stock
                        </span>
                        ) : (
                            <span className="unavailable">Out of stock</span>
                        )
                    }
                </div>
                <div className="product-actions">
                    {
                        product.stock > 0 &&
                        <button className="action to-cart">In winkelwagen</button>
                    }
                    <button className="action icon-link to-wishlist">
                        <FavoriteBorderIcon className="icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
