import {createContext, Dispatch} from 'react';

type InitialStateType = {
    Permisos:{
        Modulos:{
            Dashboard:{
                Ver: boolean,
                Editar: boolean,
                Eliminar: boolean
            }
        }
    }
}

type Partial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}

export const initialState ={
    Permisos:{
        Modulos:{
            Dashboard:{
                Ver: true,
                Editar: true,
                Eliminar: true
            }
        }
    }
}

const InitialState ={
    state: initialState,
    dispatch: () => null
}

export const AdminBaseContext = createContext<Partial>(InitialState)