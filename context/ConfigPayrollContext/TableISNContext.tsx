import { createContext, Dispatch } from 'react';

type InitialStateType = {
    _id: string;
    TableISN: any;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    _id: '',
    TableISN: {},
    band: false,
    EditModal: false,
    DeleteModal: false
}

export enum Types {
    UPDATE_TABLEISN = 'UPDATE_TABLEISN',
    SET_TABLEISN = "SET_TABLEISN",
    EDIT_MODAL = "EDIT_MODAL",
    CANCEL_EDIT_MODAL = "CANCEL_EDIT_MODAL",
    DELETE_MODAL = "DELETE_MODAL",
    CANCEL_DELETE_MODAL = "CANCEL_DELETE_MODAL"
};

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const TableISNContext = createContext<ModalPartial>(ModalInitialState);

export default TableISNContext;