import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import CheckIcon from '@material-ui/icons/Check';

import Props from './props';
import './product_item.scss';
import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

const ProductItem: FunctionComponent<Props> = ({product}) => {
    return (
        <Link
            to={{
                pathname: `/product/${product.sku}`,
                state: {
                    product: product
                }
            }}
            className='product-item'
        >
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
                {
                    product.stock > 0 &&
                    <div className="product-actions">
                        <button className="action to-cart">In winkelwagen</button>
                    </div>
                }
            </div>
        </Link>
    );
};

export default ProductItem;
