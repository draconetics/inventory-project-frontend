import * as actionTypes from '../actions/types'
const initialState:IProductStateReducer = {
    products:[],
    productsLoading:false,
    productsError:"",
    productSelected:{
        cost:0,
        gender:''
    }
}
export const productReducer = (
    state = initialState,
    action: IActionReducer
  ): IProductStateReducer => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products:action.value,
            }
        case actionTypes.SELECT_PRODUCT:
            console.log(JSON.stringify(action.value));
            return {
                ...state,
                productSelected:action.value,
            }
        case actionTypes.UPDATE_PRODUCT:
            const newProductList:IProduct[] = state.products.map((item) => {
                if(item._id === action.value._id){
                    item.imageId = action.value.imageId;
                    item.gender = action.value.gender;
                    item.cost = action.value.cost;
                    item.brand = action.value.brand;
                }
                return item;
            });
            console.log(newProductList);
            return {
                ...state,
                products: newProductList
            };
        case actionTypes.CREATE_PRODUCT:
            return {
                ...state,
                products:[...state.products, action.value]
            }
        case actionTypes.DELETE_PRODUCT:
            console.log(action.value);
            let filterList = state.products.filter(item => item._id !== action.value._id);
            console.log(filterList);
            return {
                ...state,
                products:filterList
            }
        case actionTypes.SET_PRODUCTS_ERROR:
            return {
                ...state,
                productsError: action.value
            }
        default: return state;
    }
  };
  
  