import {createContext, Dispatch} from 'react';

type initialStateType = {
    _id:string,
    createMessageLogin:boolean
}

type ModalPartial = {
     state:initialStateType,
     dispatch: Dispatch<any>
}

export const initialState = {
    _id: '',
    createMessageLogin:false
}

export enum Types {
    CREATE_MESSAGELOGIN = "CREATE_MESSAGELOGIN",
    CLEAR_MESSAGELOGIN = "CLEAR_MESSAGELOGIN"
}

const ModalInitialState = {
    state:initialState,
    dispatch:() => null
}

const LoginContext = createContext<ModalPartial>(ModalInitialState)

export default LoginContext; 