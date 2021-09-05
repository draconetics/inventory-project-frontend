import BrandListComponent from './BrandListComponent'
import { connect } from 'react-redux';

import {getBrands, createBrand, updateBrand, deleteBrand} from '../../store/actions/brandAction'
//import {CREATE_NOTE_DO_LIST, DELETE_NOTE, SAVE_NOTE_DO_LIST, SET_NOTES_DO,SET_NOTES_DONE, SET_NOTES_ERROR} from '../../actions/types'
//import * as actionCreators from '../../actions/noteAction'


export const mapStateToProps = (state:any) =>{
      return {
          brands: state.brandReducer.brands,
          brandLoading: state.brandReducer.brandLoading,
          brandError: state.brandReducer.brandError,
      }
  }
 
export const mapDispatchToProps = (dispatch: AppDispatch)=>{
    
    return {
      getBrands: () => dispatch(getBrands()),
      createBrand: (data:IBrand) => dispatch(createBrand(data)),
      updateBrand: (data:IBrand) => dispatch(updateBrand(data)),
      deleteBrand: (data:IBrand) => dispatch(deleteBrand(data))
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BrandListComponent);