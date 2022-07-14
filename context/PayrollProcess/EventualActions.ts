import { Dispatch,ChangeEvent } from "react";
import {Types} from "./EventualPayrollProcessContext"

export const createEventualnominaModal = ({_id = "", createEventual = false}:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CREATE_EVENTUAL,
    payload:{
      createEventual
    }
  })
}

export const clearEventualPayrollProcess = ({_id = "", createEventual = false, deleteModal = false }:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CLEAR_EVENTUAL,
    payload:{
      _id,
      createEventual,
      deleteModal
    }
  })
}


export const deleteEventualProcess= ({_id = "", deleteModal = true}:any, dispatch: Dispatch<any>): void=>{
  console.log('Adios',_id)
  dispatch({
    type: Types.DELETE_EVENTUAL,
    payload:{
      _id,
      deleteModal
    }
  })
}
export const openfondosInsuficientes = ({fondosInfucientes = true}:any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type: Types.FONDOS_INSUFICIENTES,
    payload:{
      fondosInfucientes
    }
  })
}

export const openSinNominasSeleccionadas = ({sinNominasSeleccionadas = true}:any, dispatch: Dispatch<any>): void =>{
  console.log('Fondos')
  dispatch({
    type: Types.SIN_NOMINAS,
    payload:{
      sinNominasSeleccionadas
    }
  })
}
export const openaceptarDispersar = ({aceptarDispersar = true}:any, dispatch: Dispatch<any>): void =>{
  console.log('entra')
  dispatch({
    type: Types.ACEPTAR_DISPERSAR,
    payload:{
      aceptarDispersar
    }
  })
}
