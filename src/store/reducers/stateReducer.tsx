import * as actionTypes from '../actions/types'
const initialState:IStateStateReducer = {
    states:[],
    statesLoading:false,
    statesError:""
}
export const stateReducer = (
    state = initialState,
    action: IActionReducer
  ): IStateStateReducer => {
    switch (action.type) {
        case actionTypes.SET_STATES:
            return {
                ...state,
                states:action.value,
            }
        case actionTypes.SAVE_STATE:         
            const newList = state.states.map((item)=>{
                if(item._id === action.value._id){
                    item.description = action.value.description;
                    item.name = action.value.name;
                }
                return item;
            });
            
            return {
                ...state,
                states:newList
            }
        case actionTypes.CREATE_STATE:
            return {
                ...state,
                states:[...state.states,action.value]
            }
        case actionTypes.DELETE_STATE:
            let filterList = state.states.filter(item => item._id !== action.value._id);
            console.log(filterList);
            return {
                ...state,
                states:filterList
            }
        default: return state;
    }
  };
  
  