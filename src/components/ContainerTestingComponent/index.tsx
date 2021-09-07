import ContainerTestingComponent from './ContainerTestingComponent'
import { connect } from 'react-redux';

import { getProductListByContainerId} from '../../store/actions/containerAction';
import { DELETE_CONTAINER_PRODUCTLIST } from '../../store/actions/types';

export const mapStateToProps = (state:any) =>{
      return {
          containerProductList: state.containerReducer.containerProductList
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      //getProductById: (id:string) => dispatch(getProductById(id))
      getProductListByContainerId: (code:string) => dispatch(getProductListByContainerId(code)),
      deleteProductFromContainer:(code:string) => dispatch({type: DELETE_CONTAINER_PRODUCTLIST, value: code})
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ContainerTestingComponent);