import {createContext, Dispatch} from 'react';

type initialStateType={
  _id: string,
  createPrenomina: boolean,
  createIncidencia: boolean,
  deleteModal: boolean;
  fondosInsuficientes: boolean;
  aceptarDispersar: boolean;
  sinNominasSeleccionadas: boolean;
  alertaReporte: boolean;
  alertaEnviarIDSE: boolean;
  alertaDescartarIDSE: boolean;
};

type ModalPartial = {
    state: initialStateType,
    dispatch: Dispatch<any>
}

export const initialState ={
  _id: '',
  createPrenomina: false,
  createIncidencia: false,
  deleteModal: false,
  fondosInsuficientes:false,
  aceptarDispersar: false,
  sinNominasSeleccionadas: false,
  alertaReporte: false,
  alertaEnviarIDSE: false,
  alertaDescartarIDSE: false
}

export enum Types{
  CREATE_PRENOMINA = "CREATE_PRENOMINA",
  CREATE_INCIDENCIA = "CREATE_INCIDENCIA",
  CLEAR_PAYROLL = "CLEAR_PAYROLL",
  DELETE_PAYROLL = "DELETE_PAYROLL",
  FONDOS_INSUFICIENTES = "FONDOS_INSUFICIENTES",
  ACEPTAR_DISPERSAR = "ACEPTAR_DISPERSAR",
  SIN_NOMINAS = "SIN_NOMINAS",
  ALERTA_REPORTE = "ALERTA_REPORTE",
  ALERTA_ENVIARIDSE = "ALERTA_ENVIARIDSE",
  ALERTA_DESCARTARIDSE = "ALERTA_DESCARTARIDSE"
}
    
const ModalInitialState = {
  state: initialState,
  dispatch: () => null
}

const PayrollProcessContext = createContext<ModalPartial>(ModalInitialState);
    
export default PayrollProcessContext;