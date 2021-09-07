import ContainerViewComponent from './ContainerViewComponent'
import { connect } from 'react-redux';

import { getProductListByContainerId} from '../../store/actions/containerAction';

export const mapStateToProps = (state:any) =>{
      return {
          containerProductList: state.containerReducer.containerProductList
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      //getProductById: (id:string) => dispatch(getProductById(id))
      getProductListByContainerId: (code:string) => dispatch(getProductListByContainerId(code)),

    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ContainerViewComponent);