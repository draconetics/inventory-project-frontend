import SaleListComponent from './SaleListComponent';
import { connect } from 'react-redux';
import { getSales } from '../../store/actions/saleAction';

export const mapStateToProps = (state:any) =>{
      return {
          sales: state.saleReducer.sales,
          /* productLoading: state.productReducer.brandLoading,
          productError: state.productReducer.productError, */
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getSales: () => dispatch(getSales()),
      /* createBrand: (data:IBrand) => dispatch(createBrand(data)),
      updateBrand: (data:IBrand) => dispatch(updateBrand(data)),
      deleteBrand: (data:IBrand) => dispatch(deleteBrand(data)) */
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SaleListComponent);