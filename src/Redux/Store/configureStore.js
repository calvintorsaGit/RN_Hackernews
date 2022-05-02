import { createStore, combineReducers, applyMiddleware } from 'redux';
import ItemListReducer from '../Reducer/ItemListReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
    { itemListReducer: ItemListReducer}
);
const configureStore = () => {
    return createStore(rootReducer,applyMiddleware(thunk, logger));
}
export default configureStore;
