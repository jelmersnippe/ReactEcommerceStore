import {combineReducers, createStore} from 'redux';
import cartReducer from '../reducers/cart/reducer';
import userReducer from '../reducers/user/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export default store;
