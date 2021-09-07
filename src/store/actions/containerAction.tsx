import {
    SET_CONTAINERS, 
    SET_CONTAINERS_LOADING, 
    SET_CONTAINERS_ERROR,
    CREATE_CONTAINER,
    SAVE_CONTAINER,
    DELETE_CONTAINER,
    SELECT_CONTAINER,
    SELECT_CONTAINER_PRODUCTLIST
} from './types';
import containerService from '../../services/containerService';

export const getContainers = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_CONTAINERS_LOADING,
            value: true
        });
        return containerService.getList()
            .then(resp => {
                console.log(resp);
                // dispatch
                dispatch({
                    type: SET_CONTAINERS,
                    value: resp.data.data
                });
                
                dispatch({
                    type: SET_CONTAINERS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CONTAINERS_ERROR,
                    value: ""
                });
            }).catch((e)=>{
                //console.log("entra a catcher")
                dispatch({
                    type: SET_CONTAINERS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CONTAINERS_ERROR,
                    value: "Error getting data from the server: " + e.message
                });
            });
    };//end getContainers
 
    export const createContainer = (data:IContainer) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: SET_CONTAINERS_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: SET_CONTAINERS_ERROR, value: error});
        const createNewContainer = (item:IContainer) => ({type: CREATE_CONTAINER, value: item});
    
        dispatch(setLoadingTo(true));
        return containerService.createContainer(data)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                dispatch(createNewContainer(resp.data.data))
                console.log('success on create new container');
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
    

    export const updateContainer = (data:IContainer) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: SET_CONTAINERS_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: SET_CONTAINERS_ERROR, value: error});
        const saveContainer = (item:IContainer) => ({type: SAVE_CONTAINER, value: item});
    
        dispatch(setLoadingTo(true));
        
        if(data._id)
        return containerService.updateContainer(data._id, data)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                dispatch(saveContainer(resp.data.data))
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
    };//end create new CONTAINER
    
    export const deleteContainer = (data:IContainer) => (dispatch:AppDispatch) =>{
        const setLoadingTo = (flag:boolean) => ({type: SET_CONTAINERS_LOADING, value: flag});
        const setErrorTo = (error:string) => ({type: SET_CONTAINERS_ERROR, value: error});
        const deleteContainer = (item:IContainer) => ({type: DELETE_CONTAINER, value: item});
    
        dispatch(setLoadingTo(true));
        
        if(data._id)
        return containerService.deleteContainer(data._id)
            .then(resp => {
                // dispatch
                //console.log("register action")
                console.log(resp);
                dispatch(setLoadingTo(false));
                dispatch(setErrorTo(''));
                console.log(data);
                dispatch(deleteContainer(data))
                console.log('success on delete container');
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
    };//end delete brand */

    export const getContainerByCode = (code:string) =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_CONTAINERS_LOADING,
            value: true
        });
        console.log('get product by code');
        return containerService.getContainerById(code)
            .then(resp => {
                console.log(resp);
                // dispatch
                dispatch({
                    type: SELECT_CONTAINER,
                    value: resp.data.data
                });
                
                dispatch({
                    type: SET_CONTAINERS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CONTAINERS_ERROR,
                    value: ""
                }); 
            }).catch((e)=>{
                console.log("entra a catcher")
                console.log(e.response);
                dispatch({
                    type: SET_CONTAINERS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CONTAINERS_ERROR,
                    value: "Error getting data from the server: " + e.response.data.message
                });
            });
    };//end getProductByCode

    export const getProductListByContainerId = (code:string) =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_CONTAINERS_LOADING,
            value: true
        });
        console.log('get product by code');
        return containerService.getProductListByContainerId(code)
            .then(resp => {
                console.log(resp);
                // dispatch
                dispatch({
                    type: SELECT_CONTAINER_PRODUCTLIST,
                    value: resp.data.data
                });
                
                dispatch({
                    type: SET_CONTAINERS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CONTAINERS_ERROR,
                    value: ""
                }); 
            }).catch((e)=>{
                console.log("entra a catcher")
                console.log(e.response);
                dispatch({
                    type: SET_CONTAINERS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CONTAINERS_ERROR,
                    value: "Error getting data from the server: " + e.response.data.message
                });
            });
    };//end getProductByCode