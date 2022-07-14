import { Dispatch,ChangeEvent } from "react";
import {Types} from "./IncidenciasContext"

export const createIncidenciasModal = ({_id = "", createModal = true}:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CREATE_INCIDENCIAS,
    payload:{
      createModal
    }
  })
}

export const updateIncidenciasModal = (_id = "", updateModal = true, dispatch: Dispatch<any>): void=>{
  console.log('Este id es el que pasa',_id)
  dispatch({
    type: Types.UPDATE_INCIDENCIAS,
    payload:{
      _id,
      updateModal
    }
  })
}

export const clearIncidenciasModal = ({_id = "", createModal = false, updateModal = false, Permisos = {}, deleteModal = false }:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CLEAR_INCIDENCIAS,
    payload:{
      _id,
      Permisos,
      createModal,
      updateModal,
      deleteModal
    }
  })
}

export const deleteIncidenciasModal= ({_id = "", deleteModal = true}:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.DELETE_INCIDENCIAS,
    payload:{
      _id,
      deleteModal
    }
  })
}

export const updateAdmin = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean, Modulo: string): Promise<void> => {
  console.log('Prueba.', Value)
  
  switch (Modulo) {
      case 'EstructuraEquipo':
          state.Permisos.Permisos.Modulos[Nombre] = Value
          break;
      case 'Colaboradores':
          state.Permisos.Permisos.Modulos[Nombre]= Value
          break;
      case 'MyMood':
          state.Permisos.Permisos.Modulos[Nombre]= Value
          break;
      case 'Notificaciones':
          state.Permisos.Permisos.Modulos[Nombre]= Value
      break;
      case 'Noticias':
          state.Permisos.Permisos.Modulos[Nombre]= Value
      break;
      case 'Calendario':
          state.Permisos.Permisos.Modulos[Nombre]= Value
      break;
      case 'Feedback':
          state.Permisos.Permisos.Modulos[Nombre]= Value
      break;
  }
  updateAdminPermisos(state.Permisos, dispatch)
  //console.log('Permisos desde context',state.Permisos.Modulos.EstructuraEquipo.Sedes.Ver)
  //state.Permisos.Modulos.EstructuraEquipo.Sedes.Ver = false
  //console.log('Permisos Convertidos',state.Permisos.Modulos.EstructuraEquipo.Sedes.Ver)   
  //updateAdminPermisos(state.Permisos, dispatch)
}

const updateAdminPermisos = (Permisos: any, dispatch: Dispatch<any>): void =>{

}

export { updateAdminPermisos };