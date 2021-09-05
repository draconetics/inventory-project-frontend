import * as actionTypes from '../actions/types'
const initialState:IClientStateReducer = {
    clients:[],
    clientsLoading:false,
    clientsError:"",
}
export const clientReducer = (
    state = initialState,
    action: IActionReducer
  ): IClientStateReducer => {
    switch (action.type) {
        case actionTypes.SET_CLIENTS:
            return {
                ...state,
                clients:action.value,
            }
        /*case actionTypes.SELECT_PRODUCT:
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
  
  