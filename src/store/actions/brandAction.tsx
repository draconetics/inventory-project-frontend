import {SET_BRANDS, SET_BRANDS_LOADING, SET_BRANDS_ERROR} from './types';
import brandService from '../../services/brandService';
import * as actionTypes from './types';

export const getBrands = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_BRANDS_LOADING,
            value: true
        });
        return brandService.getList()
            .then(resp => {
                
                //console.log(resp);
                // dispatch
                dispatch({
                    type: SET_BRANDS,
                    value: resp.data.data
                });
                
                dispatch({
                    type: SET_BRANDS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_BRANDS_ERROR,
                    value: ""
                });
            }).catch((e)=>{
                //console.log("entra a catcher")
                dispatch({
                    type: SET_BRANDS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_BRANDS_ERROR,
                    value: "Error getting data from the server: " + e.message
                });
            });
    };//end getBrands
  
    export const createBrand = (data:IBrand) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_BRANDS_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: actionTypes.SET_BRANDS_ERROR, value: error});
        const createNewBrand = (item:IBrand) => ({type: actionTypes.CREATE_BRAND, value: item});
    
        dispatch(setLoadingTo(true));
        return brandService.createBrand(data)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                dispatch(createNewBrand(resp.data.data))
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
    

    export const updateBrand = (data:IBrand) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_BRANDS_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: actionTypes.SET_BRANDS_ERROR, value: error});
        const saveBrand = (item:IBrand) => ({type: actionTypes.SAVE_BRAND, value: item});
    
        dispatch(setLoadingTo(true));
        
        if(data._id)
        return brandService.updateBrand(data._id, data)
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
    
    export const deleteBrand = (data:IBrand) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_BRANDS_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: actionTypes.SET_BRANDS_ERROR, value: error});
        const deleteBrand = (item:IBrand) => ({type: actionTypes.DELETE_BRAND, value: item});
    
        dispatch(setLoadingTo(true));
        
        if(data._id)
        return brandService.deleteBrand(data._id)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                console.log(data);
                dispatch(deleteBrand(data))
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