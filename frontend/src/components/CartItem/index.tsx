import {FunctionComponent} from 'react';
import Props from './props';
import './styles.scss';
import PriceDisplay from '../PriceDisplay';
import QtyInput from '../QtyInput';
import {useDispatch} from 'react-redux';
import {updateQty} from '../../reducers/cart/actions';

const CartItem: FunctionComponent<Props> = ({item}) => {
    const dispatch = useDispatch();

    return (
        <div className={'cart-item'}>
            <img src={item.image} alt={item.name}/>
            <strong>{item.name}</strong>
            <QtyInput value={item.qty} setValue={(value) => dispatch(updateQty(item.id, value))} max={10}/>
            <PriceDisplay price={item.price}/>
        </div>
    )
}

export default CartItem;
