import ProductCreateComponent from './ProductCreateComponent'
import { connect } from 'react-redux';

import {getBrands} from '../../store/actions/brandAction';
import {createProduct, getProductById, updateProduct} from '../../store/actions/productAction';

export const mapStateToProps = (state:any) =>{
      return {
          brands: state.brandReducer.brands,
          productSelected: state.productReducer.productSelected,
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getBrands: () => dispatch(getBrands()),
      createProduct: (data:IProduct,image:string) => dispatch(createProduct(data,image)),
      updateProduct: (data:IProduct, image:string) => dispatch(updateProduct(data,image)),
      getProductById: (data:string) => dispatch(getProductById(data)),
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductCreateComponent);