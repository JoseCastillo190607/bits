import {createContext, Dispatch} from 'react';

type initialStateType={
    _id: string,
    Permisos: any,
    sent: boolean
};

type ModalPartial = {
    state: initialStateType,
    dispatch: Dispatch<any>
}

export const initialState ={
    _id: '',
    Permisos:{},
    sent: true
}


    export enum Types{
        UPDATE_PERMISOS = 'UPDATE_PERMISOS'
    }
    
    const ModalInitialState = {
        state: initialState,
        dispatch: () => null
    }

    const AdminPermisosContext = createContext<ModalPartial>(ModalInitialState);
    
    export default AdminPermisosContext;