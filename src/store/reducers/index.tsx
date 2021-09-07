import { combineReducers } from 'redux';
import {brandReducer} from './brandReducer';
import {productReducer} from './productReducer';
import {clientReducer} from './clientReducer';
import {saleReducer} from './saleReducer';
import {cartReducer} from './cartReducer';
import {containerReducer} from './containerReducer';
import {stateReducer} from './stateReducer';

export default combineReducers({
    brandReducer, productReducer, clientReducer, saleReducer, cartReducer, containerReducer, stateReducer
});