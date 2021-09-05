import * as actionTypes from '../actions/types'
const initialState:ICartStateReducer = {
    cart:[],
}
export const cartReducer = (
    state = initialState,
    action: IActionReducer
  ): ICartStateReducer => {
    switch (action.type) {
        case actionTypes.CART_ADD_PRODUCT:
            let exist = state.cart.filter(item => {
                return item._id === action.value._id;
            });
            if(exist.length > 0)
                return state;
            return {
                ...state,
                cart:[...state.cart,action.value],
            }
        case actionTypes.CART_DELETE_PRODUCT:
            let filterList = state.cart.filter(item => item._id !== action.value._id);
            return {
                ...state,
                cart:filterList
            }/*
        case actionTypes.SELECT_PRODUCT:
            console.log(JSON.stringify(action.value));
            return {
                ...state,
                productSelected:action.value,
            }
        case actionTypes.SAVE_BRAND:         
            const newList = state.brands.map((item)=>{
                if(item._id === action.value._id){
                    item.code = action.value.code;
                    item.name = action.value.name;
                }
                return item;
            });
            
            return {
                ...state,
                brands:newList
            }
        case actionTypes.CREATE_PRODUCT:
            return {
                ...state,
                products:[...state.products, action.value]
            }
        case actionTypes.DELETE_BRAND:
            let filterList = state.brands.filter(item => item._id !== action.value._id);
            console.log(filterList);
            return {
                ...state,
                brands:filterList
            } */
        default: return state;
    }
  };
  
  