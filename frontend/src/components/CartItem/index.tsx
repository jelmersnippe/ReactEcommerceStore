import {FunctionComponent} from 'react';
import Props from './props';
import './styles.scss';
import PriceDisplay from '../PriceDisplay';
import QtyInput from '../QtyInput';
import {useDispatch} from 'react-redux';
import {removeItemFromCart, setCart} from '../../reducers/cart/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../config/api';

const CartItem: FunctionComponent<Props> = ({item}) => {
    const {product, qty} = item;
    const dispatch = useDispatch();

    const updateQty = async (value: number) => {
        api.cart.updateCartItem({id: product.id, qty: value})
            .then((response) => {
                dispatch(setCart(response.data));
            });
    };

    const removeItem = async () => {
        await api.cart.removeCartItem(product.id)
            .then(() => dispatch(removeItemFromCart(product.id)));
    };

    return (
        <div className={'cart-item'}>
            <img src={product.image} alt={product.name}/>
            <strong>{product.name}</strong>
            <QtyInput value={qty} max={product.stock} setValue={(value) => updateQty(value)}/>
            <PriceDisplay price={product.price}/>
            <button onClick={() => removeItem()}>
                <DeleteIcon className={'icon delete'}/>
            </button>
        </div>
    );
};

export default CartItem;
