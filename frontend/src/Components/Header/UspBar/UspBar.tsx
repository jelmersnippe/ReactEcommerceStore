import React, {FunctionComponent} from 'react';
import CheckIcon from '@material-ui/icons/Check';

const UspBar: FunctionComponent = () => {

    const renderUspItem = (icon: JSX.Element, text: string) => {
        return (
            <li className="usp-item">
                {icon}
                {text}
            </li>
        );
    };

    return (
        <div className="layout-wrapper usp-bar">
            <div className="layout-container">
                <div className="usp-container">
                    <ul className="usp-list">
                        {renderUspItem(<CheckIcon className="usp-icon"/>, 'Gratis verzending vanaf 20,-')}
                        {renderUspItem(<CheckIcon className="usp-icon"/>, 'Bezorging dezelfde dag, \'s avonds of in het weekend')}
                        {renderUspItem(<CheckIcon className="usp-icon"/>, 'Gratis retourneren')}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UspBar;
