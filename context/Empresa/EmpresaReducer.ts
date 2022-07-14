import { Types } from "./EmpresaContext";

const EmpresaReducer = (state:any, action: any) =>{
  const {payload, type} = action
  switch(type){
    case Types.CREATE_EMPRESA:
      console.log('Finalads', payload)

      return {
        ...state,
        createEmpresa: true
      }
      break;
    case Types.CLEAR_EMPRESA:
      return{
        ...state,
        _id:'',
        updateSede: false,
        createEmpresa: false,
        createSede: false,
        nombreSede: '',
        deleteSede: false,
        createProject: false,
        updateProject: false,
        nombreProject: '',
        clienteProject: '',
        deleteProject: false,
        updateEmpresa: false,
        identidadLegal:payload.state.identidadLegal,
        certificadoLlaves:payload.state.certificadoLlaves,
        tabUno:false,
        tabDos:false,
        tabTres:false,
      }
      break;
    case Types.UPDATE_TAB_UNO:
      console.log('Finassl', payload.state)
      return{
        ...state,
        identidadLegal: payload.state.identidadLegal,
        tabUno: true
      }
      break;
       case Types.UPDATE_TAB_DOS:
        console.log('Final', payload.state)
        return{
          ...state,
          certificadoLlaves: payload.state.certificadoLlaves,
          tabDos: true
        }
        break;
    case Types.UPDATE_REGISTRO_PATRONAL:
      console.log('Finssal', payload.state)
      return{
        ...state,
        registroPatronal: payload.state
      }
      break;
            case Types.UPDATE_TAB_TRES:
        console.log('Final', payload.state)
        return{
          ...state,
          informacionBancaria: payload.state.informacionBancaria
        }
        break;
    case Types.UPDATE_EMPRESA:
      return{
        ...state,
        _id: payload._id,
        updateEmpresa: true
      }
      break;
    case Types.CREATE_SEDE:
      return{
        ...state,
        createSede: true
      }
      break;
    case Types.UPDATE_SEDE:
      console.log('Finaddddl', payload.nombreSede)
      return{
        ...state,
        _id: payload._id,
        updateSede: true,
        nombreSede: payload.nombreSede
      }
    case Types.DELETE_SEDE:
      console.log('Finalsssssssss', payload._id)
      return{
        ...state,
        _id: payload._id,
        deleteSede: true
      }
      break;
    case Types.CREATE_PROJECT:
      console.log('Final')
      return{
        ...state,
        createProject: true
      }
      break;
    case Types.UPDATE_PROJECT:
      return{
        ...state,
        _id: payload._id,
        updateProject: true,
        nombreProject: payload.nombreProject,
        clienteProject: payload.clienteProject
      }
      break;
    case Types.DELETE_PROJECT:
      return{
        ...state,
        _id: payload._id,
        deleteProject: true
      }
      default:
        return state 
  }
}

export default EmpresaReducer

