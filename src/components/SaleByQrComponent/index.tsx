import SaleByQrComponent from './SaleByQrComponent'
import { connect } from 'react-redux';

import { CART_ADD_PRODUCT, CART_DELETE_PRODUCT } from '../../store/actions/types';
import { getProductByCode, getProductById } from '../../store/actions/productAction';

export const mapStateToProps = (state:any) =>{
    return {
        cart: state.cartReducer.cart,
        productSelected: state.productReducer.productSelected,
        productsError: state.productReducer.productsError
    }
}
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      addToCart: (data:IProduct) => dispatch({type:CART_ADD_PRODUCT,value:data}),
      deleteFromCart: (data:IProduct) => dispatch({type:CART_DELETE_PRODUCT,value:data}),
      getProductById: (id:string) => dispatch(getProductById(id)),
      getProductByCode: (id:number) => dispatch(getProductByCode(id)),
      /*
      updateBrand: (data:IBrand) => dispatch(updateBrand(data)),
      deleteBrand: (data:IBrand) => dispatch(deleteBrand(data)) */
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SaleByQrComponent);