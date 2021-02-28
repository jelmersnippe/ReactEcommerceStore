import {Route, Switch} from 'react-router-dom';

import './reset.scss';
import './buttons.scss';
import Header from './components/Header';
import Home from './screens/Home';
import CategoryPage from './screens/CategoryPage';
import ProductPage from './screens/ProductPage';
import React, {useEffect} from 'react';
import Cart from './screens/Cart';
import Account from './screens/Account';
import api from './config/api';
import {RootState} from './config/store';
import {useSelector} from 'react-redux';

function App() {
    const accessToken = useSelector((state: RootState) => state.user.accessToken);

    useEffect(() => {
        accessToken && api.setBearerAccessToken(accessToken);
    }, [accessToken])

    return (
        <div className="app-wrapper">
            <Header/>
            <main className="main-content">
                <div className="layout-wrapper">
                    <div className="layout-container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/category/:slug" component={CategoryPage}/>
                            <Route path="/product/:sku" component={ProductPage}/>
                            <Route path="/cart" component={Cart}/>
                            <Route path="/account" component={Account}/>
                            <Route path="*">
                                <h2>404</h2>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
