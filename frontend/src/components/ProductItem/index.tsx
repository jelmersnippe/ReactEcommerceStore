import CheckIcon from '@material-ui/icons/Check';

import Props from './props';
import './product_item.scss';
import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import PriceDisplay from '../PriceDisplay';
import {setCart} from '../../reducers/cart/actions';
import {useDispatch} from 'react-redux';
import api from '../../config/api';

const ProductItem: FunctionComponent<Props> = ({product}) => {
    const dispatch = useDispatch();

    const addItemToCart = () => {
        api.cart.updateCartItem({id: product.id, qty: 1})
            .then((response) => {
                dispatch(setCart(response.data));
            });
    }

    return (
        <div className='product-item'>
            <Link
                to={{
                    pathname: `/product/${product.sku}`,
                    state: {
                        product: product
                    }
                }}
            >
                <div className="product-media">
                    <img src={process.env.PUBLIC_URL + '/' + product.image} alt=""/>
                </div>
                <div className="product-info">
                    <div className="product-details">
                        <span className="name">{product.name}</span>
                        <span className="sku">{product.sku}</span>
                    </div>
                    <PriceDisplay price={product.price}/>
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
                </div>
            </Link>
            {
                product.stock > 0 &&
                <div className="product-actions">
                    <button className="action to-cart" onClick={() => addItemToCart()}>In winkelwagen</button>
                </div>
            }
        </div>
    );
};

export default ProductItem;
