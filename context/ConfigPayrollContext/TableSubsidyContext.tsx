import { createContext, Dispatch } from 'react';

type InitialStateType = {
    _id: string;
    TableSubsidy: any;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    _id: '',
    TableSubsidy: {},
    band: false,
    EditModal: false,
    DeleteModal: false
}

export enum Types {
    UPDATE_TABLESUBSIDY = 'UPDATE_TABLESUBSIDY',
    SET_TABLESUBSIDY = "SET_TABLESUBSIDY",
    EDIT_MODAL = "EDIT_MODAL",
    CANCEL_EDIT_MODAL = "CANCEL_EDIT_MODAL",
    DELETE_MODAL = "DELETE_MODAL",
    CANCEL_DELETE_MODAL = "CANCEL_DELETE_MODAL"
};

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const TableSubsidyContext = createContext<ModalPartial>(ModalInitialState);

export default TableSubsidyContext;