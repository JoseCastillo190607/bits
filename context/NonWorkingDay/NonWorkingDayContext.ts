import {createContext, Dispatch} from 'react';

type initialStateType = {
    _id:string,
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
    updateModal:false,
    createModal: false,
    deleteModal: false
}

export enum Types {
    UPDATE_NON_WORKINGDAY = "UPDATE_NON_WORKINGDAY",
    CREATE_NON_WORKINGDAY = "CREATE_NON_WORKINGDAY",
    DELETE_NON_WORKINGDAY = "DELETE_NON_WORKINGDAY",
    CLEAR_NON_WORKINGDAY = "CLEAR_NON_WORKINGDAY"
}

const ModalInitialState = {
    state:initialState,
    dispatch:() => null
}

const NonWorkingDayContext = createContext<ModalPartial>(ModalInitialState)

export default NonWorkingDayContext; 