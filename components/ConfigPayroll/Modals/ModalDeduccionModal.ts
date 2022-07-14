import { Dispatch } from "react"
 
import { DeduccionModalTypes } from "../../../context/TabNominaContext/TabDeduccionModalTypes";

export const openDeduccionModal = ({ 
    _id = '', 
    SATKey= '',
    ConceptName= '',
    showInformacion = false,
    showEliminar = false,
    showEdit = false,
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: DeduccionModalTypes.OPEN_DEDUCCION_MODAL,
        payload: {
            _id,
            SATKey,
            ConceptName,
            showInformacion,
            showEliminar,
            showEdit
        }
    });
}

export const deleteDeduccionModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: DeduccionModalTypes.CLOSE_DEDUCCION_MODAL
    });
};

export const closeDeduccionModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: DeduccionModalTypes.CLOSE_DEDUCCION_MODAL 
    })
}