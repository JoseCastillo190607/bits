import {createContext, Dispatch} from 'react';

type initialStateType={
  _id: string,
  createSettlement: boolean,
  deleteModal: boolean
};

type ModalPartial = {
    state: initialStateType,
    dispatch: Dispatch<any>
}

export const initialState ={
  _id: '',
  createSettlement: false,
  deleteModal: false
}

export enum Types{
  CREATE_SETTLEMENT = "CREATE_SETTLEMENT",
  CLEAR_SETTLEMENT = "CLEAR_SETTLEMENT",
  DELETE_SETTLEMENT = "DELETE_SETTLEMENT"
}
    
const ModalInitialState = {
  state: initialState,
  dispatch: () => null
}

const SettlementPayrollProcessContext = createContext<ModalPartial>(ModalInitialState);
    
export default SettlementPayrollProcessContext;