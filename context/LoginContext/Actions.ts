import { Dispatch,ChangeEvent } from "react";
import {Types} from "./LoginContext";

export const createMessageLoginModal = ({_id = "",createMessageLoginModal = true}:any, dispatch: Dispatch<any>):void =>{
    dispatch({
       type:Types.CREATE_MESSAGELOGIN,
       payload:{
           createMessageLoginModal
       } 
    })
}

export const clearMessageLoginModal = ({_id="", createMessageLoginModal = false}:any, dispatch: Dispatch<any>):void => {
    dispatch({
        type: Types.CLEAR_MESSAGELOGIN,
        payload: {
            _id,
            createMessageLoginModal
        }
    })
}