import { Dispatch,ChangeEvent } from "react";
import {Types} from "./DocumentsContext";

export const createDocumentsModal = ({_id = "",createModal = true}:any, dispatch: Dispatch<any>):void =>{
    console.log("create id" + _id)
    dispatch({
       type:Types.CREATE_DOCUMENTS,
       payload:{
           createModal
       } 
    })
}

export const clearDocumentsModal = ({_id="", createModal = false, updateModal = false, Documento = {}, deleteModal = false}:any, dispatch: Dispatch<any>):void => {
    dispatch({
        type: Types.CLEAR_DOCUMENTS,
        payload: {
            _id,
            Documento,
            createModal,
            updateModal,
            deleteModal
        }
    })
}

export const updateDocumentsModal = (_id = "", updateModal = true, dispatch: Dispatch<any>):void => {
    console.log("edit id" + _id)
    dispatch({
        type:Types.UPDATE_DOCUMENTS,
        payload:{
            _id,
            updateModal,
        }
    })
}

export const deleteDocumentsModal = (_id="", deleteModal=true, dispatch:Dispatch<any>):void =>{
    dispatch({
        type: Types.DELETE_DOCUMENTS,
        payload:{
            _id,
            deleteModal
        }
    })
}

export const updateDocuments = async (e: ChangeEvent <{name:string, value:unknown}>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean, Modulo:string): Promise<void> => {
    console.log("YEYEYEYE ")
}

const updateDocument = (Documents: object, dispatch: Dispatch<any>):void => {
    dispatch ({
        type: Types.UPDATE_DOCUMENTS_DOCUMENT,
        payload: {
            Documents
        }
    })
}

export {updateDocument}