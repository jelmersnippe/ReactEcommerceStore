import React, {FunctionComponent} from 'react';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import Props from './props';
import './styles.scss';

const PriceDisplay: FunctionComponent<Props> = ({price}) => {
    return (
        <div className="product-pricing">
            <span className="price">
                <EuroSymbolIcon className="icon" fontSize="small"/>
                {price.toString()}
            </span>
        </div>
    );
};

export default PriceDisplay;
