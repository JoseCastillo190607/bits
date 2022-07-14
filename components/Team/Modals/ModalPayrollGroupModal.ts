import { Dispatch } from "react"

import { PayrollGroupModalTypes } from "../../../context/ConfigPayrollContext/PayrollGroupModalTypes";

export const openPayrollGroupModal = ({ 
        _id = '',
        GroupName = '' ,
        PaymentScheme = '', 
        CompanyName = '', 
        BankAccount = '', 
        PayrollPeriod = '', 
        PayrollPeriodDays = '', 
        RegulationISR = '', 
        SubsidyEmployee = '', 
        showEliminar = false, 
        showEdit = false
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollGroupModalTypes.OPEN_PAYROLLGROUP_MODAL,
        payload: {
            _id,
            GroupName,
            PaymentScheme,
            CompanyName,
            BankAccount,
            PayrollPeriod,
            PayrollPeriodDays,
            RegulationISR,
            SubsidyEmployee,
            showEliminar,
            showEdit,
        }
    });
}

export const deletePayrollGroupModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollGroupModalTypes.CLOSE_PAYROLLGROUP_MODAL
    });
};

export const closePayrollGroupModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollGroupModalTypes.CLOSE_PAYROLLGROUP_MODAL 
    })
}

export const openCreatePayrollGroupModal = ({openCreate}:any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollGroupModalTypes.OPEN_PAYROLLGROUP_CREATE_MODAL
    })
}