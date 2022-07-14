import {Types} from './IncidenciasContext'


const ModalReducer  = (state:any, action: any) =>{
  const {payload, type} = action;
  switch(type){
    case Types.UPDATE_INCIDENCIAS:
      return{
        ...state,
        _id:payload._id,
        updateModal: true
      }
    case Types.CREATE_INCIDENCIAS:
    return{
      ...state,
      createModal: true
    }
    case Types.DELETE_INCIDENCIAS:
    return{
      ...state,
      deleteModal: true
    }
    case Types.CLEAR_INCIDENCIAS:
      return{
        ...state,
        _id: '',
        Permisos: payload.Permisos,
        createModal: payload.createModal,
        updateModal: payload.updateModal,
        deleteModal: payload.deleteModal
      }
    default:
      return state 
  }
}

export default ModalReducer;