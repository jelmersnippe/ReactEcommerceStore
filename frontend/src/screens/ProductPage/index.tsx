import React, {FunctionComponent, useState} from 'react';
import './styles.scss';
import {useLocation, useParams} from 'react-router-dom';
import {ProductDTO} from '../../generated';
import QtyInput from '../../components/QtyInput';
import CheckIcon from '@material-ui/icons/Check';

type RouteParams = { sku: string };
type LocationState = { product: ProductDTO };

const ProductPage: FunctionComponent = () => {
    const {sku} = useParams<RouteParams>();
    console.log(sku);
    const {state} = useLocation<LocationState>();
    const [qty, setQty] = useState<number>(0);

    return (
        <div className="wrapper">
            <div className="image-section">
                <img src={process.env.PUBLIC_URL + '/' + state.product.image} alt={state.product.name}/>
            </div>
            <div className="info-section">
                <div className="product-info">
                    <h2>{state.product.name}</h2>
                    <p>{state.product.sku}</p>
                    <p><strong>{state.product.price}</strong></p>
                </div>
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
                                <button className="action to-cart">In winkelwagen</button>
                            </div>
                        </div>
                        : <span className="stock unavailable">Out of stock</span>
                }

            </div>
        </div>
    );
};

export default ProductPage;
