import {Route, Switch} from 'react-router-dom';

import './reset.scss';
import './buttons.scss';
import Header from './Components/Header';
import Home from './Components/Home';
import CategoryPage from './Components/CategoryPage';
import Footer from './Components/Footer';

function App() {
    return (
        <div className="app-wrapper">
            <Header/>
            <main className="main-content">
                <div className="layout-wrapper">
                    <div className="layout-container">
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route path="/category">
                                <CategoryPage/>
                            </Route>
                            <Route path="*">
                                <h2>404</h2>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
