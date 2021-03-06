import { Dispatch } from "react"
 
import { PerceptionsModalTypes } from "../../../context/TabNominaContext/TabPerceptionsModalTypes";

export const openPerceptionsModal = ({
     _id = '', 
     ConceptName = '',
     SATKey= '',
     ConceptType= '',
     AccountingAccount= '',
     PayType= '',
     ISRTax= '',
     ISNTax= '',
     SocialSecurity= '',
     IntegratesIMSS= '',
     showInformacion = false,
     showEliminar = false,
     showEdit = false
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionsModalTypes.OPEN_PERCEPTIONS_MODAL,
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

export const deletePerceptionsModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionsModalTypes.CLOSE_PERCEPTIONS_MODAL
    });
};

export const closePerceptionsModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionsModalTypes.CLOSE_PERCEPTIONS_MODAL 
    })
}