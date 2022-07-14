import { Dispatch } from "react"

import { PerceptionModalTypes } from "../../../context/ConfigPayrollContext/PerceptionModalTypes";
//import {Types} from "../../../context/ConfigPayrollContext/"
export const openPerceptionModal = ({ 
        _id = '',
        ConceptName= '',
        SATKey= '',
        ConceptType= '',
        AccountingAccount= '',
        PayType= '',
        ISRTax= '',
        ISNTax= '',
        SocialSecurity= '',
        IntegratesIMSS= '',
        showInformacion=false,
        showEliminar = false, 
        showEdit = false
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionModalTypes.OPEN_PERCEPTION_MODAL,
        payload: {
            _id,
            ConceptName,
            SATKey,
            ConceptType,
            AccountingAccount,
            PayType,
            ISRTax,
            ISNTax,
            SocialSecurity,
            IntegratesIMSS,
            showInformacion,
            showEliminar,
            showEdit
        }
    });
}

export const deletePerceptionModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionModalTypes.CLOSE_PERCEPTION_MODAL
    });
};

export const closePerceptionModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionModalTypes.CLOSE_PERCEPTION_MODAL 
    })
}