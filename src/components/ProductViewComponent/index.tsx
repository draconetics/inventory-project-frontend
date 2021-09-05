import ProductViewComponent from './ProductViewComponent'
import { connect } from 'react-redux';

import { getProductById, getProductByCode} from '../../store/actions/productAction';

export const mapStateToProps = (state:any) =>{
      return {
          productSelected: state.productReducer.productSelected
          /* brands: state.brandReducer.brands, */
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      //getProductById: (id:string) => dispatch(getProductById(id))
      getProductByCode: (code:number) => dispatch(getProductByCode(code)),
      /*getBrands: () => dispatch(getBrands()),
      createProduct: (data:IProduct) => dispatch(createProduct(data)),
      updateBrand: (data:IBrand) => dispatch(updateBrand(data)),
      deleteBrand: (data:IBrand) => dispatch(deleteBrand(data)) */
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewComponent);