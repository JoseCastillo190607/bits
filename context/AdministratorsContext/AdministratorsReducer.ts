import {Types} from './AdministratorsContext'


const ModalReducer  = (state:any, action: any) =>{
  const {payload, type} = action;
  switch(type){
    case Types.UPDATE_ADMINISTRATORS:
      return{
        ...state,
        _id:payload._id,
        updateModal: true
      }
    case Types.CREATE_ADMINISTRATORS:
    return{
      ...state,
      createModal: true
    }
    case Types.DELETE_ADMINISTRATORS:
    return{
      ...state,
      deleteModal: true
    }
    case Types.CLEAR_ADMINISTRATORS:
    return{
      ...state,
      _id: '',
      Permisos: payload.Permisos,
      createModal: payload.createModal,
      updateModal: payload.updateModal,
      deleteModal: payload.deleteModal
    }
    case Types.UPDATE_ADMINISTRATORS_PERMISOS:
      return {
        ...state,
        Permisos: payload.Permisos
    }     
    default:
      return state 
  }
}

export default ModalReducer;