import {createContext, Dispatch} from 'react';

type initialStateType={
    _id: string,
    Estado: any,
    sent: boolean
};

type ModalPartial = {
    state: initialStateType,
    dispatch: Dispatch<any>
}

export const initialState ={
    _id: '',
    Estado:{},
    sent: true
}


    export enum Types{
        UPDATE_STATE = 'UPDATE_STATE'
    }
    
    const ModalInitialState = {
        state: initialState,
        dispatch: () => null
    }

    const NominaContext = createContext<ModalPartial>(ModalInitialState);
    
    export default NominaContext;