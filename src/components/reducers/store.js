import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productApiReducer, userApiReducer } from './apiReducer';

const rootReducer = combineReducers({
  productData: productApiReducer,
  userData: userApiReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
