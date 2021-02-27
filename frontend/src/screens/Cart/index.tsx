import {useSelector} from 'react-redux';
import {RootState} from '../../config/store';
import React, {FunctionComponent} from 'react';
import CartItem from '../../components/CartItem';
import './styles.scss';

const Cart: FunctionComponent = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items)

    return (
        <div className={'cart'}>
            {
                cartItems.length > 0 ?
                <div>
                    <div className={'cart-items'}>
                        {
                            cartItems.map((cartItem) => {
                                return <CartItem key={cartItem.id} item={cartItem}/>
                            })
                        }
                    </div>
                    <button className="action order">Bestellen</button>
                </div>
                : <h3>Er zitten nog geen producten in je winkelwagen!</h3>
            }
        </div>
    )
}

export default Cart;
