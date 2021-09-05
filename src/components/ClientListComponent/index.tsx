import ClientListComponent from './ClientListComponent'
import { connect } from 'react-redux';

import { getClients } from '../../store/actions/clientAction';

export const mapStateToProps = (state:any) =>{
      return {
          clients: state.clientReducer.clients,
          /* productLoading: state.productReducer.brandLoading,
          productError: state.productReducer.productError, */
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getClients: () => dispatch(getClients()),
      /* createBrand: (data:IBrand) => dispatch(createBrand(data)),
      updateBrand: (data:IBrand) => dispatch(updateBrand(data)),
      deleteBrand: (data:IBrand) => dispatch(deleteBrand(data)) */
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ClientListComponent);