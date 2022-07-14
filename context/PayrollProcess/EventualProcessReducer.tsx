import {Types} from './EventualPayrollProcessContext'


const ModalReducer  = (state:any, action: any) =>{
  const {payload, type} = action;
  switch(type){
    case Types.CREATE_EVENTUAL:
      return{
        ...state,
        createEventual: payload.createEventual
      }
    case Types.CLEAR_EVENTUAL:
    return{
      ...state,
      _id: '',
      createEventual: false,
      deleteModal: false
    }
    case Types.DELETE_EVENTUAL:
      return{
        ...state,
        _id: payload._id,
        deleteModal: true
      }
    default:
      return state 
  }
}

export default ModalReducer;