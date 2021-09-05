import ProductListComponent from './ProductListComponent'
import { connect } from 'react-redux';

import { deleteProductById, getProducts } from '../../store/actions/productAction';

export const mapStateToProps = (state:any) =>{
      return {
          products: state.productReducer.products,
          productLoading: state.productReducer.brandLoading,
          productError: state.productReducer.productError,
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getProducts: () => dispatch(getProducts()),
      deleteProductById:(id:string) => dispatch(deleteProductById(id)),
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductListComponent);