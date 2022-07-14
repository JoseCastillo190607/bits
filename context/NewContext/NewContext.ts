import { createContext, Dispatch } from 'react';
import { INew } from '../../interfaces/News.interfaces';
;

type Partial = {
    state: INew,
    dispatch: Dispatch<any>,
}

export const initialState = {
    isOpen: false,
    showModal: false,
    sent: true,
    _id: '',
    projects: '',
    titulo: '',
    BodyHTML: '',
    AutorImg: '',
    Fecha: '',
    scheduled: false,
    scheduleDate: '',
    File: '',
    Image: false,
    ImageUri: '',
    Autor:''
}

export enum Types {
    OPEN_MODAL = 'OPEN_MODAL',
    UPDATE_NEW = "UPDATE_NEW",
    CLOSE_MODAL = "CLOSE_MODAL",
    UPDATE_FILE = "UPDATE_FILE",
    DELETE_FILE = "DELETE_FILE",
    DELETE_NEW = "DELETE_NEW",
    UPDATE_SCHEDULEDATE = "UPDATE_SCHEDULEDATE",
    DELETE_SCHEDULEDATE = "DELETE_SCHEDULEDATE",
    OPEN_MODAL_SHOW = "OPEN_MODAL_SHOW",
    OPEN_RESEND = "OPEN_RESEND"
};

const InitialState = {
    state: initialState,
    dispatch: () => null
}

export const NewsContext = createContext<Partial>(InitialState);