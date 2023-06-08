// npm i redux
// npm i redux-devtools-extension
// npm i redux-thunk
// npm i react-redux

import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {getProductsReducer, getProductDetailsReducer} from "./reducers/productsReducer";
import {cartReducer} from "./reducers/cartReducer";

const reducer=combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart:cartReducer
})

const middleware=[thunk];

const store=createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;