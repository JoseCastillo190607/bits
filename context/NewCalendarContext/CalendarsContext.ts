import {createContext, Dispatch} from 'react';

type initialStateType = {
    _id:string,
    updateModal:boolean,
    createModal:boolean,
    deleteModal:boolean,
    createEventModal:boolean,
    createIncidentModal:boolean,
    createNonWorkingDayModal: boolean,
    deleteNonWorkingDayModal: boolean,
    createEditEventModal:boolean,
    deleteEditEventModal: boolean,
}

type ModalPartial = {
     state:initialStateType,
     dispatch: Dispatch<any>
}

export const initialState = {
    _id: '',
    updateModal:false,
    createModal: false,
    deleteModal: false,
    createEventModal: false,
    createIncidentModal: false,
    createNonWorkingDayModal: false,
    deleteNonWorkingDayModal: false,
    createEditEventModal: false,
    deleteEditEventModal: false,
}

export enum Types {
    UPDATE_CALENDARS = "UPDATE_CALENDARS",
    CREATE_CALENDARS = "CREATE_CALENDARS",
    DELETE_CALENDARS = "DELETE_CALENDARS",
    CLEAR_CALENDARS = "CLEAR_CALENDARS",
    CREATE_EVENT = "CREATE_EVENT",
    CREATE_INCIDENT = "CREATE_INCIDENT",
    CREATE_NONWORKINGDAY = "CREATE_NONWORKINGDAY",
    CLEAR_NONWORKINGDAY = "CLEAR_NONWORKINGDAY",
    DELETE_NONWORKINGDAY = "DELETE_NONWORKINGDAY",
    CLEAR_DELETE_NONWORKINGDAY = "CLEAR_DELETE_NONWORKINGDAY",
    CREATE_EDITEVENT = "CREATE_EDITEVENT",
    CLEAR_EDITEVENT = "CLEAR_EDITEVENT",
    DELETE_EDITEVENT = "DELETE_EDITEVENT",
    CLEAR_DELETE_EDITEVENT = "CLEAR_DELETE_EDITEVENT",
}

const ModalInitialState = {
    state:initialState,
    dispatch:() => null
}

const CalendarsContext = createContext<ModalPartial>(ModalInitialState)

export default CalendarsContext; 