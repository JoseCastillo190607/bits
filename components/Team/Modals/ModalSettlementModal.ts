import { Dispatch } from "react"
import { SettlementPayrollModalTypes } from "../../../context/PayrollContext/SettlementPayrollModalTypes";

export const openSettlementPayrollModal = ({ 
        _id = '',
        dischargeDate = '',
        dischargeType = '',
        reason = '',
        recessionJob = '',
        Taxable = '',
        NotTaxable = '',
        Mixed = '',
        Total = '',
        idConcept = '',
        idCollaborator = '',
        showEliminar = false
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: SettlementPayrollModalTypes.OPEN_SETTLEMENTPAYROLL_MODAL,
        payload: {
            _id,
            dischargeDate,
            dischargeType,
            reason,
            recessionJob,
            Taxable,
            NotTaxable,
            Mixed,
            Total,
            idConcept,
            idCollaborator,
        }
    });
}

export const deleteSettlementPayrollModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: SettlementPayrollModalTypes.CLOSE_SETTLEMENTPAYROLL_MODAL
    });
};

export const closeSettlementPayrollModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: SettlementPayrollModalTypes.CLOSE_SETTLEMENTPAYROLL_MODAL 
    })
}