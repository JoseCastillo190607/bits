import {createContext, Dispatch} from 'react';

type initialStateType={
  _id: string,
  Permisos: any,
  updateModal: boolean,
  createModal: boolean,
  deleteModal: boolean
};

type ModalPartial = {
    state: initialStateType,
    dispatch: Dispatch<any>
}

export const initialState ={
  _id: '',
  Permisos:{},
  updateModal: false,
  createModal: false,
  deleteModal: false
}

export enum Types{
  UPDATE_INCIDENCIAS = "UPDATE_INCIDENCIAS",
  CREATE_INCIDENCIAS = "CREATE_INCIDENCIAS",
  DELETE_INCIDENCIAS = "DELETE_INCIDENCIAS",
  CLEAR_INCIDENCIAS = "CLEAR_INCIDENCIAS",
}
    
const ModalInitialState = {
  state: initialState,
  dispatch: () => null
}

const IncidenciasContext = createContext<ModalPartial>(ModalInitialState);
    
export default IncidenciasContext;