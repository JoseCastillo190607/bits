import {Types} from './PayrollProcessContext'


const ModalReducer  = (state:any, action: any) =>{
  const {payload, type} = action;
  switch(type){
    case Types.CREATE_PRENOMINA:
      return{
        ...state,
        createPrenomina: payload.createPrenomina
      }
    case Types.CREATE_INCIDENCIA:
    return{
      ...state,
      createIncidencia: true
    }
    case Types.CLEAR_PAYROLL:
    return{
      ...state,
      _id: '',
      createPrenomina: false,
      createIncidencia: false,
      deleteModal: false,
      fondosInsuficientes: false,
      aceptarDispersar: false,
      sinNominasSeleccionadas: false,
      alertaReporte: false,
      alertaEnviarIDSE: false
    }
    case Types.DELETE_PAYROLL:
      return{
        ...state,
        _id: payload._id,
        deleteModal: true
      }
    case Types.FONDOS_INSUFICIENTES:
      return{
        ...state,
        fondosInsuficientes: true
      }
    case Types.ACEPTAR_DISPERSAR:
      return{
        ...state,
        aceptarDispersar: true
      }
    case Types.SIN_NOMINAS:
      return{
        ...state,
        sinNominasSeleccionadas: true
      }
    case Types.ALERTA_REPORTE:
      return{
        ...state,
        alertaReporte: true
      }
    case Types.ALERTA_ENVIARIDSE:
      return{
        ...state,
        alertaEnviarIDSE: true
      }
      case Types.ALERTA_DESCARTARIDSE:
        return{
          ...state,
          alertaDescartarIDSE: true
        }
    default:
      return state 
  }
}

export default ModalReducer;