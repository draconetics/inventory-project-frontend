import ProductViewComponent from './ProductViewComponent'
import { connect } from 'react-redux';

import { getProductByCode} from '../../store/actions/productAction';

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

    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewComponent);