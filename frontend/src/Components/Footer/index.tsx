import "./footer.scss";
import {FunctionComponent} from 'react';

const Footer: FunctionComponent = () => {
    return (
        <footer>
            {/*
        Links
        Copyright
      */}
            <div className="layout-wrapper footer">
                <div className="layout-container">
                    <div className="footer-content">
                        <div className="footer-list">
                            <h4 className="list-header">Header 1</h4>
                            <ul className="list-items">
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                                <li>Link 4</li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h4 className="list-header">Header 1</h4>
                            <ul className="list-items">
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                                <li>Link 4</li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h4 className="list-header">Header 1</h4>
                            <ul className="list-items">
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                                <li>Link 4</li>
                            </ul>
                        </div>
                        <div className="footer-list">
                            <h4 className="list-header">Header 1</h4>
                            <ul className="list-items">
                                <li>Link 1</li>
                                <li>Link 2</li>
                                <li>Link 3</li>
                                <li>Link 4</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
