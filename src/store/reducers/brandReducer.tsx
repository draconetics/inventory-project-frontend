import * as actionTypes from '../actions/types'
const initialState:IBrandStateReducer = {
    brands:[],
    brandLoading:false,
    brandError:""
}
export const brandReducer = (
    state = initialState,
    action: IActionReducer
  ): IBrandStateReducer => {
    switch (action.type) {
        case actionTypes.SET_BRANDS:
            return {
                ...state,
                brands:action.value,
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
        case actionTypes.CREATE_BRAND:
            return {
                ...state,
                brands:[...state.brands,action.value]
            }
        case actionTypes.DELETE_BRAND:
            let filterList = state.brands.filter(item => item._id !== action.value._id);
            console.log(filterList);
            return {
                ...state,
                brands:filterList
            }
        default: return state;
    }
  };
  
  