import {FunctionComponent} from 'react';
import Props from './props';
import './styles.scss';
import PriceDisplay from '../PriceDisplay';
import QtyInput from '../QtyInput';
import {useDispatch} from 'react-redux';
import {removeItemFromCart, updateQty} from '../../reducers/cart/actions';
import DeleteIcon from '@material-ui/icons/Delete';

const CartItem: FunctionComponent<Props> = ({item}) => {
    const dispatch = useDispatch();

    return (
        <div className={'cart-item'}>
            <img src={item.image} alt={item.name}/>
            <strong>{item.name}</strong>
            <QtyInput value={item.qty} setValue={(value) => dispatch(updateQty(item.id, value))} max={10}/>
            <PriceDisplay price={item.price}/>
            <button onClick={() => dispatch(removeItemFromCart(item.id))}>
                <DeleteIcon className={'icon delete'}/>
            </button>
        </div>
    )
}

export default CartItem;
