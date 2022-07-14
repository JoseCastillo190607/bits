import { createContext, Dispatch } from 'react';

type InitialStateType = {
    progress: Array<number>;
    sections: Array<number>;
    _id: string;
    collaborator: any;
    band: boolean;
    rejectModal: boolean;
    declineModal: boolean;
    convertModal: boolean;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    progress: [0, 0, 0, 0, 0],
    sections: [0, 0, 0, 0],
    _id: '',
    collaborator: {},
    band: false,
    rejectModal: false,
    declineModal: false,
    convertModal: false
}

export enum Types {
    INGRESE_PROGRESS = 'INGRESE_PROGRESS',
    VALIDATE_SECTION = 'VALIDATE_SECTION',
    UPDATE_COLLABORATOR = 'UPDATE_COLLABORATOR',
    SET_COLLABORATOR = "SET_COLLABORATOR",
    UPDATE_BAND = "UPDATE_BAND",
    REJECT_DATA = "REJECT_DATA",
    CANCEL_REJECT_DATA = "CANCEL_REJECT_DATA",
    DECLINE_MODAL = "DECLINE_MODAL",
    CANCEL_DECLINE_MODAL = "CANCEL_DECLINE_MODAL",
    CONVERT_MODAL = "CONVERT_MODAL",
    CANCEL_CONVERT_MODAL = "CANCEL_CONVERT_MODAL"
};

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const CollaboratorContext = createContext<ModalPartial>(ModalInitialState);

export default CollaboratorContext;