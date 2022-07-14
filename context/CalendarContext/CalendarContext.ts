import { createContext, Dispatch } from 'react';

type InitialStateType = {
    isOpen: boolean,
    fechaInicio: string;
    fechaFinal: string;
    titulo: string;
    descripcion: string;
    tipo: string;
    _id: string;
    sent: boolean;
    proyecto?: any;
};

type Partial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState = {
    isOpen: false,
    fechaInicio: '',
    fechaFinal: '',
    titulo: '',
    descripcion: '',
    tipo: '',
    _id: '',
    sent: true,
    proyecto: ''
}

const InitialState = {
    state: initialState,
    dispatch: () => null
}

export const CalendarContext = createContext<Partial>(InitialState);