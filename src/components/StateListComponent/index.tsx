import StateListComponent from './StateListComponent'
import { connect } from 'react-redux';

import {getStates, createState, updateState, deleteState} from '../../store/actions/stateAction'

export const mapStateToProps = (state:any) =>{
      return {
          states: state.stateReducer.states,
          stateLoading: state.stateReducer.stateLoading,
          stateError: state.stateReducer.stateError,
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getStates: () => dispatch(getStates()),
      createState: (data:IState) => dispatch(createState(data)),
      updateState: (data:IState) => dispatch(updateState(data)),
      deleteState: (data:IState) => dispatch(deleteState(data))
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(StateListComponent);