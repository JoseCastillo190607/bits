import { createContext, Dispatch } from 'react';

type InitialStateType = {
    _id: string;
    Concept: any;
    EditModal: boolean;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    _id: '',
    Concept: {},
    band: false,
    EditModal: false,
    DeleteModal: false
}

export enum Types {
    UPDATE_CONCEPT = 'UPDATE_CONCEPT',
    SET_CONCEPT = "SET_CONCEPT",
    EDIT_MODAL = "EDIT_MODAL",
    CANCEL_EDIT_MODAL = "CANCEL_EDIT_MODAL",
    DELETE_MODAL = "DELETE_MODAL",
    CANCEL_DELETE_MODAL = "CANCEL_DELETE_MODAL"
};

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const ConceptContext = createContext<ModalPartial>(ModalInitialState);

export default ConceptContext;