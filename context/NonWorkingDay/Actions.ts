import { Dispatch,ChangeEvent } from "react";
import {Types} from "./NonWorkingDayContext";

export const createModal = ({_id = "",createModal = true}:any, dispatch: Dispatch<any>):void =>{
    dispatch({
       type:Types.CREATE_NON_WORKINGDAY,
       payload:{
           createModal
       } 
    })
}

export const updateModal = (_id = "", updateModal = true, dispatch: Dispatch<any>):void => {
    console.log("edit id" + _id)
    dispatch({
        type:Types.UPDATE_NON_WORKINGDAY,
        payload:{
            _id,
            updateModal,
        }
    })
}

export const deleteModal = (_id="", deleteModal=true, dispatch:Dispatch<any>):void =>{
    dispatch({
        type: Types.DELETE_NON_WORKINGDAY,
        payload:{
            _id,
            deleteModal
        }
    })
}