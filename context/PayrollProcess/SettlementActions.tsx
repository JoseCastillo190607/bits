import { Dispatch,ChangeEvent } from "react";
import {Types} from "./SettlementPayrollProcessContext"

export const createSettlementModal = ({_id = "", createSettlement = false}:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CREATE_SETTLEMENT,
    payload:{
      createSettlement
    }
  })
}

export const clearSettlementProcess = ({_id = "", createSettlement = false, deleteModal = false }:any, dispatch: Dispatch<any>): void=>{
  dispatch({
    type: Types.CLEAR_SETTLEMENT,
    payload:{
      _id,
      createSettlement,
      deleteModal
    }
  })
}

export const deleteSettlementProcess= ({_id = "", deleteModal = true}:any, dispatch: Dispatch<any>): void=>{
  console.log('Adios',_id)
  dispatch({
    type: Types.DELETE_SETTLEMENT,
    payload:{
      _id,
      deleteModal
    }
  })
}