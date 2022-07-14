import { Dispatch,ChangeEvent } from "react";
import {Types} from "../../context/NewCalendarContext/CalendarsContext";

export const createCalendarsModal = ({_id = "",createModal = true}:any, dispatch: Dispatch<any>):void =>{
    dispatch({
       type:Types.CREATE_CALENDARS,
       payload:{
           createModal
       } 
    })
}

export const createEventModal = ({_id = "",createEventModal = true}:any, dispatch: Dispatch<any>):void =>{
    //console.log(createEventModal);
    
    dispatch({
       type:Types.CREATE_EVENT,
       payload:{
        createEventModal
       } 
    })
}
export const createIncidentModal = (_id = "",createIncidentModal = true, dispatch: Dispatch<any>):void =>{
    //console.log("create indi"+_id)
    
    dispatch({
       type:Types.CREATE_INCIDENT,
       payload:{
        _id,   
        createIncidentModal
       } 
    })
}

export const clearCalendarsModal = ({_id="", createModal = false, updateModal = false, Documento = {}, deleteModal = false, createEventModal = false, createIncidentModal = false}:any, dispatch: Dispatch<any>):void => {
    dispatch({
        type: Types.CLEAR_CALENDARS,
        payload: {
            _id,
            createModal,
            updateModal,
            deleteModal,
            createEventModal,
            createIncidentModal
        }
    })
}

export const updateCalendarsModal = (_id = "", updateModal = true, dispatch: Dispatch<any>):void => {
    //console.log("edit id" + _id)
    dispatch({
        type:Types.UPDATE_CALENDARS,
        payload:{
            _id,
            updateModal,
        }
    })
}

export const deleteCalendarsModal = (_id="", deleteModal=true, dispatch:Dispatch<any>):void =>{
    dispatch({
        type: Types.DELETE_CALENDARS,
        payload:{
            _id,
            deleteModal
        }
    })
}

export const createNonWorkingDayModal = (_id = "",createNonWorkingDayModal = true, dispatch: Dispatch<any>):void =>{
    //console.log('id non working',_id);
    
    dispatch({
       type:Types.CREATE_NONWORKINGDAY,
       payload:{
        _id,
        createNonWorkingDayModal
       } 
    })
}


export const clearNonWorkingDayModal = ({_id = "",createNonWorkingDayModal = false}:any, dispatch: Dispatch<any>):void =>{
    
    dispatch({
       type:Types.CLEAR_NONWORKINGDAY,
       payload:{
        createNonWorkingDayModal
       } 
    })
}

export const deleteNonWorkingDayModal = (_id="", deleteNonWorkingDayModal=true, dispatch:Dispatch<any>):void =>{
    console.log('Modal elimina',deleteNonWorkingDayModal)
    dispatch({
        type: Types.DELETE_NONWORKINGDAY,
        payload:{
            _id,
            deleteNonWorkingDayModal
        }
    })
}

export const cleardeleteNonWorkingDayModal = ({_id = "",deleteNonWorkingDayModal = false}:any, dispatch: Dispatch<any>):void =>{
    
    dispatch({
       type:Types.CLEAR_DELETE_NONWORKINGDAY,
       payload:{
        deleteNonWorkingDayModal
       } 
    })
}

export const createEditEventModal = (_id = "",createEditEventModal = true, dispatch: Dispatch<any>):void =>{
    
    dispatch({
       type:Types.CREATE_EDITEVENT,
       payload:{
        _id,
        createEditEventModal
       } 
    })
}

export const deleteEditEventModal = (_id = "",deleteEditEventModal = true, dispatch: Dispatch<any>):void =>{
    
    dispatch({
       type:Types.DELETE_EDITEVENT,
       payload:{
        _id,
        deleteEditEventModal
       } 
    })
}

export const clearEditEventModal = ({_id = "",createEditEventModal = false}:any, dispatch: Dispatch<any>):void =>{
    
    dispatch({
       type:Types.CLEAR_EDITEVENT,
       payload:{
        createEditEventModal
       } 
    })
}

export const clearDeleteEditEventModall = ({_id = "",deleteEditEventModal = false}:any, dispatch: Dispatch<any>):void =>{
    
    dispatch({
       type:Types.CLEAR_DELETE_EDITEVENT,
       payload:{
        deleteEditEventModal
       } 
    })
}