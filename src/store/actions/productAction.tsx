import {SET_PRODUCTS, SET_PRODUCTS_LOADING, SET_PRODUCTS_ERROR, SELECT_PRODUCT} from './types';
import productService from '../../services/productService';
import * as actionTypes from './types';

export const getProducts = () =>(dispatch:AppDispatch) =>{
        dispatch({
            type: SET_PRODUCTS_LOADING,
            value: true
        });
        return productService.getList()
            .then(resp => {
                
                console.log(resp);
                // dispatch
                dispatch({
                    type: SET_PRODUCTS,
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
};//end getProducts

export const createProduct = (data:IProduct,image:string) => (dispatch:AppDispatch) =>{
    const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_PRODUCTS_LOADING, value: flag});
    const setErrorTo = (error:string) => ({type: actionTypes.SET_PRODUCTS_ERROR, value: error});
    const createNewProduct = (item:IProduct) => ({type: actionTypes.CREATE_PRODUCT, value: item});

    dispatch(setLoadingTo(true));
    const productToSend = {...data,imageBase64:image}
    return productService.createProduct(productToSend)
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
};//end create new product
  
export const getProductByCode = (code:number) =>(dispatch:AppDispatch) =>{
    dispatch({
        type: SET_PRODUCTS_LOADING,
        value: true
    });
    console.log('get product by code');
    return productService.getProductByCode(code)
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
            console.log("entra a catcher")
            console.log(e.response);
            dispatch({
                type: SET_PRODUCTS_LOADING,
                value: false
            });
            dispatch({
                type: SET_PRODUCTS_ERROR,
                value: "Error getting data from the server: " + e.response.data.message
            });
        });
};//end getProductByCode

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

export const updateProduct = (data:IProduct,image:string) => (dispatch:AppDispatch) =>{
    const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_PRODUCTS_LOADING, value: flag});
    const setErrorTo = (error:string) => ({type: actionTypes.SET_PRODUCTS_ERROR, value: error});
    const updateProduct = (item:IProduct) => ({type: actionTypes.UPDATE_PRODUCT, value: item});

    dispatch(setLoadingTo(true));
    const productToSend = {...data,imageBase64:image}
    return productService.updateProduct(productToSend)
        .then(resp => {
            // dispatch
            //console.log("register action")
            console.log(resp);
            dispatch(setLoadingTo(false));
            dispatch(setErrorTo(''));
            dispatch(updateProduct(resp.data.data))
            console.log('success on update a Product');
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
};//end create new product

export const deleteProductById = (id:string) => (dispatch:AppDispatch) =>{
    const setLoadingTo = (flag:boolean) => ({type: actionTypes.SET_PRODUCTS_LOADING, value: flag});
    const setErrorTo = (error:string) => ({type: actionTypes.SET_PRODUCTS_ERROR, value: error});
    const deleteProduct = (item:IProduct) => ({type: actionTypes.DELETE_PRODUCT, value: item});

    dispatch(setLoadingTo(true));
    if(id)
    return productService.deleteProductById(id)
        .then(resp => {
            // dispatch
            //console.log("register action")
            console.log(resp);
            dispatch(setLoadingTo(false));
            dispatch(setErrorTo(''));
            
            dispatch(deleteProduct(resp.data.data))
            console.log('success on delete product');
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
};//end delete product