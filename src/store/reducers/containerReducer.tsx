import * as actionTypes from '../actions/types'
const initialState:IContainerStateReducer = {
    containers:[],
    containerLoading:false,
    containerError:"",
    containerSelected:{
        type:"",
        space:""
    },
    containerProductList:[]
}
export const containerReducer = (
    state = initialState,
    action: IActionReducer
  ): IContainerStateReducer => {
    switch (action.type) {
        case actionTypes.SET_CONTAINERS:
            return {
                ...state,
                containers:action.value,
            } 
        case actionTypes.SAVE_CONTAINER:         
            const newList = state.containers.map((item:any)=>{
                if(item._id === action.value._id){
                    item.type = action.value.type;
                    item.space = action.value.space;
                }
                return item;
            });
            
            return {
                ...state,
                containers:newList
            }
        case actionTypes.CREATE_CONTAINER:
            return {
                ...state,
                containers:[...state.containers,action.value]
            }
        case actionTypes.DELETE_CONTAINER:
            let filterList = state.containers.filter(item => item._id !== action.value._id);
            console.log(filterList);
            return {
                ...state,
                containers:filterList
            }
        case actionTypes.SELECT_CONTAINER:
            console.log(JSON.stringify(action.value));
            return {
                ...state,
                containerSelected:action.value,
            }
        case actionTypes.SELECT_CONTAINER_PRODUCTLIST:
            console.log(JSON.stringify(action.value));
            return {
                ...state,
                containerProductList:action.value,
            }
        case actionTypes.DELETE_CONTAINER_PRODUCTLIST:
            let containerProductList = state.containerProductList.filter(item => item._id !== action.value);
            console.log(containerProductList);
            return {
                ...state,
                containerProductList:containerProductList
            }
        default: return state;
    }
  };
  
  