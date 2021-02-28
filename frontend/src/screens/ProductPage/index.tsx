import React, {FunctionComponent, useState} from 'react';
import './styles.scss';
import {useLocation} from 'react-router-dom';
import {ProductDTO} from '../../generated';
import QtyInput from '../../components/QtyInput';
import CheckIcon from '@material-ui/icons/Check';
import PriceDisplay from '../../components/PriceDisplay';
import {useDispatch} from 'react-redux';
import {setCart} from '../../reducers/cart/actions';
import api from '../../config/api';

type LocationState = { product: ProductDTO };

const ProductPage: FunctionComponent = () => {
    const {state} = useLocation<LocationState>();
    const [qty, setQty] = useState<number>(0);
    const dispatch = useDispatch();

    const addItemToCart = () => {
        api.cart.updateCartItem({id: state.product.id, qty: qty})
            .then((response) => {
                dispatch(setCart(response.data));
            });
    };

    return (
        <div className="wrapper">
            <div className="image-section">
                <img src={process.env.PUBLIC_URL + '/' + state.product.image} alt={state.product.name}/>
            </div>
            <div className="info-section">
                <div className="product-details">
                    <h2 className="name">{state.product.name}</h2>
                    <span className="sku">{state.product.sku}</span>
                </div>
                <PriceDisplay price={state.product.price}/>
                <div className="product-options">

                </div>
                {
                    state.product.stock > 0 ?
                        <div className="product-actions">
                            <span className="stock available">
                                <CheckIcon className="icon"/>
                                In stock
                            </span>
                            <div className="to-cart-container">
                                <QtyInput value={qty} max={state.product.stock} setValue={setQty}/>
                                <button
                                    className="action to-cart"
                                    onClick={() => {
                                        if (qty > 0) {
                                            addItemToCart();
                                            setQty(0);
                                        }
                                    }}
                                >
                                    In winkelwagen
                                </button>
                            </div>
                        </div>
                        : <span className="stock unavailable">Out of stock</span>
                }

            </div>
        </div>
    );
};

export default ProductPage;
