import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import {PersistGate} from 'redux-persist/integration/react';
import {persistReducer} from 'redux-persist';
import rootReducer from './reducers/index';
import Reactotron from '../../ReactotronConfig';
import storage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage,
};
const middleware = applyMiddleware(thunk);
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const Store = createStore(
    persistedReducer,
    compose(middleware, Reactotron.createEnhancer())
);
