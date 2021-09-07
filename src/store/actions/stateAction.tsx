import {SET_STATES, SET_STATES_LOADING, SET_STATES_ERROR} from './types';
import stateService from '../../services/stateService';
import * as actionTypes from './types';

export const getStates = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_STATES_LOADING,
            value: true
        });
        return stateService.getList()
            .then(resp => {
                
                //console.log(resp);
                // dispatch
                dispatch({
                    type: SET_STATES,
                    value: resp.data.data
                });
                
                dispatch({
                    type: SET_STATES_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_STATES_ERROR,
                    value: ""
                });
            }).catch((e)=>{
                //console.log("entra a catcher")
                dispatch({
                    type: SET_STATES_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_STATES_ERROR,
                    value: "Error getting data from the server: " + e.message
                });
            });
    };//end getBrands
  
    export const createState = (data:IState) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_STATES_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: actionTypes.SET_STATES_ERROR, value: error});
        const createNewState = (item:IState) => ({type: actionTypes.CREATE_STATE, value: item});
    
        dispatch(setLoadingTo(true));
        return stateService.createState(data)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                dispatch(createNewState(resp.data.data))
                console.log('success on create new brand');
            }).catch((e)=>{
                console.log(e.response.data);
                let defaultError = "Failing conneting to server: " + e.message;
                if(e.response && e.response.data){
                    const data = e.response.data;
                    if(data.message){
                        defaultError = data.message;
                    }
                }
                dispatch(setErrorTo(defaultError));
                dispatch(setLoadingTo(false)); 
            });
    };//end create new brand
    

    export const updateState = (data:IState) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_STATES_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: actionTypes.SET_STATES_ERROR, value: error});
        const saveBrand = (item:IState) => ({type: actionTypes.SAVE_STATE, value: item});
    
        dispatch(setLoadingTo(true));
        
        if(data._id)
        return stateService.updateState(data._id, data)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                dispatch(saveBrand(resp.data.data))
                console.log('success on create new brand');
            }).catch((e)=>{
                console.log(e.response.data);
                let defaultError = "Failing conneting to server: " + e.message;
                if(e.response && e.response.data){
                    const data = e.response.data;
                    if(data.message){
                        defaultError = data.message;
                    }
                }
                dispatch(setErrorTo(defaultError));
                dispatch(setLoadingTo(false)); 
            });
        else
            throw new Error("Id not found to update item");
    };//end create new brand
    
    export const deleteState = (data:IState) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_STATES_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: actionTypes.SET_STATES_ERROR, value: error});
        const deleteState = (item:IState) => ({type: actionTypes.DELETE_STATE, value: item});
    
        dispatch(setLoadingTo(true));
        
        if(data._id)
        return stateService.deleteState(data._id)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                console.log(data);
                dispatch(deleteState(data))
                console.log('success on delete brand');
            }).catch((e)=>{
                console.log(e.response.data);
                let defaultError = "Failing conneting to server: " + e.message;
                if(e.response && e.response.data){
                    const data = e.response.data;
                    if(data.message){
                        defaultError = data.message;
                    }
                }
                dispatch(setErrorTo(defaultError));
                dispatch(setLoadingTo(false)); 
            });
        else
            throw new Error("Id not found to delete item");
    };//end delete brand