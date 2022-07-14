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
  UPDATE_ADMINISTRATORS = "UPDATE_ADMINISTRATORS",
  CREATE_ADMINISTRATORS = "CREATE_ADMINISTRATORS",
  DELETE_ADMINISTRATORS = "DELETE_ADMINISTRATORS",
  CLEAR_ADMINISTRATORS = "CLEAR_ADMINISTRATORS",
  UPDATE_ADMINISTRATORS_PERMISOS = "UPDATE_ADMINISTRATORS_PERMISOS"
}
    
const ModalInitialState = {
  state: initialState,
  dispatch: () => null
}

const AdministratorsContext = createContext<ModalPartial>(ModalInitialState);
    
export default AdministratorsContext;