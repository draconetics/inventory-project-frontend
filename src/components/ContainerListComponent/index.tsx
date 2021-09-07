import ContainerListComponent from './ContainerListComponent'
import { connect } from 'react-redux';

import {getContainers, createContainer, updateContainer, deleteContainer} from '../../store/actions/containerAction'
//import {CREATE_NOTE_DO_LIST, DELETE_NOTE, SAVE_NOTE_DO_LIST, SET_NOTES_DO,SET_NOTES_DONE, SET_NOTES_ERROR} from '../../actions/types'
//import * as actionCreators from '../../actions/noteAction'


export const mapStateToProps = (state:any) =>{
      return {
          containers: state.containerReducer.containers,
          containerLoading: state.containerReducer.containerLoading,
          containerError: state.containerReducer.containerError,
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getContainers: () => dispatch(getContainers()),
      createContainer: (data:IContainer) => dispatch(createContainer(data)),
      updateContainer: (data:IContainer) => dispatch(updateContainer(data)),
      deleteContainer: (data:IContainer) => dispatch(deleteContainer(data)) 
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ContainerListComponent);