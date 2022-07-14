import {createContext, Dispatch} from 'react';

type initialStateType={
  _id: string,
  createEventual: boolean,
  deleteModal: boolean,
  fondosInsuficientes: boolean;
  aceptarDispersar: boolean;
  sinNominasSeleccionadas: boolean;
};

type ModalPartial = {
    state: initialStateType,
    dispatch: Dispatch<any>
}

export const initialState ={
  _id: '',
  createEventual: false,
  deleteModal: false,
  fondosInsuficientes:false,
  aceptarDispersar: false,
  sinNominasSeleccionadas: false 
}

export enum Types{
  CREATE_EVENTUAL = "CREATE_EVENTUAL",
  CLEAR_EVENTUAL = "CLEAR_EVENTUAL",
  DELETE_EVENTUAL = "DELETE_EVENTUAL",
  FONDOS_INSUFICIENTES = "FONDOS_INSUFICIENTES",
  ACEPTAR_DISPERSAR = "ACEPTAR_DISPERSAR",
  SIN_NOMINAS = "SIN_NOMINAS"
}
    
const ModalInitialState = {
  state: initialState,
  dispatch: () => null
}

const EventualPayrollProcessContext = createContext<ModalPartial>(ModalInitialState);
    
export default EventualPayrollProcessContext;