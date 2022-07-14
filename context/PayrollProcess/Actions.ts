import { Dispatch,ChangeEvent } from "react";
import {Types} from "./PayrollProcessContext"

export const createPrenominaModal = ({_id = "", createPrenomina = false}:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CREATE_PRENOMINA,
    payload:{
      createPrenomina
    }
  })
}

export const clearPayrollProcess = ({_id = "", createPrenomina = false, createIncidencia = false, deleteModal = false }:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CLEAR_PAYROLL,
    payload:{
      _id,
      createPrenomina,
      createIncidencia,
      deleteModal
    }
  })
}


export const createincidenciaModal = ({_id = "", createIncidencia = true}:any, dispatch: Dispatch<any>): void=>{
  console.log('hopla')
  dispatch({
    type: Types.CREATE_INCIDENCIA,
    payload:{
      _id,
      createIncidencia
    }
  })
}

export const deletePayrollProcess= ({_id = "", deleteModal = true}:any, dispatch: Dispatch<any>): void=>{
  console.log('Adios',_id)
  dispatch({
    type: Types.DELETE_PAYROLL,
    payload:{
      _id,
      deleteModal
    }
  })
}
export const openfondosInsuficientes = ({fondosInfucientes = true}:any, dispatch: Dispatch<any>): void =>{
  console.log('Fondos')
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

export const openalertaReporte = ({alertaReporte = true}:any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type: Types.ALERTA_REPORTE,
    payload:{
      alertaReporte
    }
  })
}

export const openalertaEnviarIDSE = ({alertaEnviarIDSE = true}:any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type: Types.ALERTA_ENVIARIDSE,
    payload:{
      alertaEnviarIDSE
    }
  })
}

export const openDescartarIDSE = ({descartarIDSE = true}:any, dispatch: Dispatch<any>): void =>{
  dispatch({
    type: Types.ALERTA_DESCARTARIDSE,
    payload:{
      descartarIDSE
    }
  })
}