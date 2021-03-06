import { Dispatch,ChangeEvent } from "react";
import { Types } from "./EmpresaContext";

export const openCreateEmpresaModal = ({createEmpresa = true}:any, dispatch: Dispatch<any>): void =>{
  
  dispatch({
    
      type:Types.CREATE_EMPRESA,
      payload:{
        createEmpresa
      }
    })
  }
  const initialState ={
    _id: '',
    createEmpresa: false,
    tabUno: false,
    tabDos: false, 
    tabTres: false,
    identidadLegal:{
      nombre: '',
      razonSocial: '',
      logo: '',
      rfc: '',
      regimenFiscal: '',
      direccion: '',
      estado: '',
      codigoPostal:''
    },
    informacionBancaria:{
      cuentaBancaria: '',
      cuentaSTP: '',
      cuentaClabeSTP: ''
    },
    certificadoLlaves:{
      imss: '',
      sello: '',
      password: ''
    },
    registroPatronal:[],
    primaRiesgo:[]
  }

export const openUpdateEmpresaModal = ({updateEmpresa = true, _id=""}:any, dispatch: Dispatch<any>): void =>{
  console.log('entra el id', _id)
  dispatch({
    type:Types.UPDATE_EMPRESA,
    payload:{
      _id,
      updateEmpresa
    }
  })
}
  export const clearEmpresaModal = ({createEmpresa = false, state}:any, dispatch: Dispatch<any>): void =>{
    state = initialState
    dispatch({
      type:Types.CLEAR_EMPRESA,
      payload:{
        state,
        createEmpresa
      }
    })
  }
export const openUpdateSedeModal =({updateSede = true, _id = "", nombreSede=""}:any, dispatch: Dispatch<any>):void =>{
  console.log('id que se enva', nombreSede)
  dispatch({
    type: Types.UPDATE_SEDE,
    payload:{
      _id,
      updateSede,
      nombreSede
    }
  })
}

export const openDeleteSedeModal = ({deleteSede = true, _id = ""}:any, dispatch: Dispatch<any>):void =>{
  dispatch({
    type: Types.DELETE_SEDE,
    payload:{
      _id,
      deleteSede
    }
  })
}

  export const updateState = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: {}, Modulo: string): Promise<void> => {
    //console.log('value', Value)
    let statusTabUno = false
    switch(Modulo){
      case 'tabUno':
        state[Nombre] = Value;  
        updateStateTabUno(state,dispatch)
      break
      case 'tabDos':
        state[Nombre] = Value;
        updateStateTabDos(state,dispatch)
      break
      case 'tabTres':
        state[Nombre] = Value;
        updateStateTabTres(state,dispatch)
      break
        
    }
  }

export const opendDeleteProjectModal = ({deleteProject = true, _id = ""}:any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type: Types.DELETE_PROJECT,
    payload:{
      _id,
      deleteProject
    }
  })
}

export const openCreateSedeModal = ({createSede = true}: any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type:Types.CREATE_SEDE,
    payload:{
      createSede
    }
  })
}

export const openCreateProject  = ({createProject = true}:any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type:Types.CREATE_PROJECT,
    payload:{
      createProject
    }
  })
}
  const updateStateTabUno = (state:any,dispatch:Dispatch<any>): void =>{
    console.log('Estatus resultanto', state)
    dispatch({
      type: Types.UPDATE_TAB_UNO,
      payload:{
        state
      }
    })
  }

  const updateStateTabTres = (state:any,dispatch:Dispatch<any>): void =>{
    console.log('Estatus resultanto', state)
    dispatch({
      type: Types.UPDATE_TAB_TRES,
      payload:{
        state
      }
    })
  }

  const updateStateTabDos = (state:any,dispatch:Dispatch<any>): void =>{
    console.log('Estatus resultanto', state)
    if(state.certificadoLlaves.uno !== "" || state.certificadoLlaves.dos !== ""){
      const regPAtronal ={
        "RegistroPatronal": state.certificadoLlaves.uno,
        "PrimaRiesgo": state.certificadoLlaves.dos
      }
      //state.primaRiesgo.push(state.certificadoLlaves.dos)
      state.registroPatronal.push(regPAtronal)
    }
    
    dispatch({
      type: Types.UPDATE_TAB_DOS,
      payload:{
        state
      }
    })
  }
  
    const updateSectionState = (state:any, statusTab:boolean, dispatch:Dispatch<any>): void =>{
    console.log('Estado resultante', state)
    dispatch({
      type: Types.UPDATE_TAB_UNO,
      payload:{
        state,
        statusTab
      }
    })
  }

export const openUpdateProject = ({updateProject = true, _id="", nombreProject="", clienteProject = ""}:any, dispatch: Dispatch<any>): void =>{
  console.log('id que se envia', _id)
  console.log('nombre que se envia', nombreProject)
  console.log('cliente que se envia',clienteProject)
  dispatch({
    type: Types.UPDATE_PROJECT,
    payload:{
      _id,
      updateProject,
      nombreProject,
      clienteProject
    }
  })
}

 export const addRegistroPatronal = (state:any,dispatch:Dispatch<any>): void =>{
    console.log('Estado final', state)
    dispatch({
      type: Types.UPDATE_REGISTRO_PATRONAL,
      payload:{
        state
      }
    })
  }
  
  

