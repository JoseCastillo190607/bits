import { Dispatch } from "react"
import { PayrollModalTypes } from "../../../context/PayrollContext/PayrollModalTypes";

export const openPayrollModal = ({ 
        _id = '',
        PayrollType = '',
        InitDate = '',
        EndDate = '',
        PaymentFrecuency = '',
        showEliminar = false
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollModalTypes.OPEN_PAYROLL_MODAL,
        payload: {
            _id,
            PayrollType,
            InitDate,
            EndDate,
            PaymentFrecuency,
            showEliminar
        }
    });
}

export const deletePayrollModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollModalTypes.CLOSE_PAYROLL_MODAL
    });
};

export const closePayrollModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollModalTypes.CLOSE_PAYROLL_MODAL 
    })
}