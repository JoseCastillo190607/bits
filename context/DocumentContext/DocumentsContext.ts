import {createContext, Dispatch} from 'react';

type initialStateType = {
    _id:string,
    Documento:object,
    updateModal:boolean,
    createModal:boolean,
    deleteModal:boolean
}

type ModalPartial = {
     state:initialStateType,
     dispatch: Dispatch<any>
}

export const initialState = {
    _id: '',
    Documento:{},
    updateModal:false,
    createModal: false,
    deleteModal: false
}

export enum Types {
    UPDATE_DOCUMENTS = "UPDATE_DOCUMENT",
    CREATE_DOCUMENTS = "CREATE_DOCUMENT",
    DELETE_DOCUMENTS = "DELETE_DOCUMENT",
    CLEAR_DOCUMENTS = "CLEAR_DOCUMENT",
    UPDATE_DOCUMENTS_DOCUMENT = "UPDATE_DOCUMENTS_DOCUMENT"
}

const ModalInitialState = {
    state:initialState,
    dispatch:() => null
}

const DocumentsContext = createContext<ModalPartial>(ModalInitialState)

export default DocumentsContext;