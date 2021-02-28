import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../config/store';
import React, {FunctionComponent} from 'react';
import CartItem from '../../components/CartItem';
import './styles.scss';
import api from '../../config/api';
import {resetCart} from '../../reducers/cart/actions';

const Cart: FunctionComponent = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const clearCart = () => {
        api.cart.emptyCart()
            .then(() => dispatch(resetCart()))
    }

    return (
        <div className={'cart'}>
            {
                cartItems.length > 0 ?
                <div>
                    <div className={'cart-items'}>
                        {
                            cartItems.map((cartItem) => {
                                return <CartItem key={cartItem.product.id} item={cartItem}/>
                            })
                        }
                    </div>
                    <div className="bottom-actions">
                        <button className="action clear" onClick={() => clearCart()}>Winkelwagen legen</button>
                        <button className="action order">Bestellen</button>
                    </div>
                </div>
                : <h3>Er zitten nog geen producten in je winkelwagen!</h3>
            }
        </div>
    )
}

export default Cart;
