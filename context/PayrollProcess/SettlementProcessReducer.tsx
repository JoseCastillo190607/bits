import {Types} from './SettlementPayrollProcessContext'


const ModalReducer  = (state:any, action: any) =>{
  const {payload, type} = action;
  switch(type){
    case Types.CREATE_SETTLEMENT:
      return{
        ...state,
        createSettlement: payload.createSettlement
      }
    case Types.CLEAR_SETTLEMENT:
    return{
      ...state,
      _id: '',
      createSettlement: false,
      deleteModal: false
    }
    case Types.DELETE_SETTLEMENT:
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