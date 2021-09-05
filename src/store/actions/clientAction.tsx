import { SET_CLIENTS, SET_CLIENTS_ERROR, SET_CLIENTS_LOADING } from './types';
import clientService from '../../services/ClientService';

export const getClients = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_CLIENTS_LOADING,
            value: true
        });
        return clientService.getList()
            .then(resp => {
                
                console.log(resp);
                // dispatch
                dispatch({
                    type: SET_CLIENTS,
                    value: resp.data.data
                });
                
                dispatch({
                    type: SET_CLIENTS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CLIENTS_ERROR,
                    value: ""
                }); 
            }).catch((e)=>{
                //console.log("entra a catcher")
                dispatch({
                    type: SET_CLIENTS_LOADING,
                    value: false
                });
                dispatch({
                    type: SET_CLIENTS_ERROR,
                    value: "Error getting data from the server: " + e.message
                });
            });
};//end getClients

/*

export const createProduct = (data:IProduct) => (dispatch:AppDispatch) =>{
    const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_PRODUCTS_LOADING, value: flag});
    const setErrorTo = (error:string) => ({type: actionTypes.SET_PRODUCTS_ERROR, value: error});
    const createNewProduct = (item:IProduct) => ({type: actionTypes.CREATE_PRODUCT, value: item});

    dispatch(setLoadingTo(true));
    return productService.createProduct(data)
        .then(resp => {
            // dispatch
            //console.log("register action")
            console.log(resp);
            dispatch(setLoadingTo(false));
            dispatch(setErrorTo(''));
            dispatch(createNewProduct(resp.data.data))
            console.log('success on create new Product');
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
  
export const getProductById = (id:string) =>(dispatch:AppDispatch) =>{
    dispatch({
        type: SET_PRODUCTS_LOADING,
        value: true
    });
    console.log('get product by id');
    return productService.getProductById(id)
        .then(resp => {
            console.log(resp);
            // dispatch
            dispatch({
                type: SELECT_PRODUCT,
                value: resp.data.data
            });
            
            dispatch({
                type: SET_PRODUCTS_LOADING,
                value: false
            });
            dispatch({
                type: SET_PRODUCTS_ERROR,
                value: ""
            }); 
        }).catch((e)=>{
            //console.log("entra a catcher")
            dispatch({
                type: SET_PRODUCTS_LOADING,
                value: false
            });
            dispatch({
                type: SET_PRODUCTS_ERROR,
                value: "Error getting data from the server: " + e.message
            });
        });
};//end getProductById

*/