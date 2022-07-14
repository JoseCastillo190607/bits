import { createContext, Dispatch } from 'react';

type InitialStateType = {
    _id: string;
    TablesValue: any;
    EditModal: boolean;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    _id: '',
    TablesValue: {},
    band: false,
    EditModal: false,
    DeleteModal: false
}

export enum Types {
    UPDATE_TABLESVALUE = 'UPDATE_TABLESVALUE',
    SET_TABLESVALUE = "SET_TABLESVALUE",
    EDIT_MODAL = "EDIT_MODAL",
    CANCEL_EDIT_MODAL = "CANCEL_EDIT_MODAL",
    DELETE_MODAL = "DELETE_MODAL",
    CANCEL_DELETE_MODAL = "CANCEL_DELETE_MODAL"
};

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const TablesValueContext = createContext<ModalPartial>(ModalInitialState);

export default TablesValueContext;