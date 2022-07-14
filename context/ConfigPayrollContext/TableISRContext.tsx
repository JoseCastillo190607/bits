import { createContext, Dispatch } from 'react';

type InitialStateType = {
    _id: string;
    TableISR: any;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    _id: '',
    TableISR: {},
    band: false,
    EditModal: false,
    DeleteModal: false
}

export enum Types {
    UPDATE_TABLEISR = 'UPDATE_TABLEISR',
    SET_TABLEISR = "SET_TABLEISR",
    EDIT_MODAL = "EDIT_MODAL",
    CANCEL_EDIT_MODAL = "CANCEL_EDIT_MODAL",
    DELETE_MODAL = "DELETE_MODAL",
    CANCEL_DELETE_MODAL = "CANCEL_DELETE_MODAL"
};

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const TableISRContext = createContext<ModalPartial>(ModalInitialState);

export default TableISRContext;