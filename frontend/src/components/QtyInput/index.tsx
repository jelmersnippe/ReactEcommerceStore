import {FunctionComponent} from 'react';
import Props from './props';
import './styles.scss';

const QtyInput: FunctionComponent<Props> = ({value, max, setValue}) => {
    return (
        <div className="qty-input">
            <input type={'number'} min={0} max={max} id={'qty'} value={value} onChange={(event) => setValue(parseInt(event.target.value))}/>
        </div>
    );
};

export default QtyInput;
