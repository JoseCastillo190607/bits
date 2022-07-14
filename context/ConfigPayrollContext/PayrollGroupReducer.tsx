import { PayrollGroupModalTypes } from './PayrollGroupModalTypes';
import {initialState} from './PayrollGroupContext'

const PayrollGroupModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case PayrollGroupModalTypes.OPEN_PAYROLLGROUP_MODAL:
            return {
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showEdit: payload.showEdit,
                showEliminar: payload.showEliminar,
                GroupName: payload.GroupName,
                PaymentScheme: payload.PaymentScheme,
                CompanyName: payload.CompanyName,
                BankAccount: payload.BankAccount,
                PayrollPeriod: payload. PayrollPeriod,
                PayrollPeriodDays: payload.PayrollPeriodDays,
                RegulationISR: payload.RegulationISR,
                SubsidyEmployee: payload. SubsidyEmployee

            }
        case PayrollGroupModalTypes.CLOSE_PAYROLLGROUP_MODAL:
            return {
                _id: ""
            }
        case PayrollGroupModalTypes.REACTIVE_PAYROLLGROUP_COL:
            return {
                ...state,
                _id: payload
            }
        case PayrollGroupModalTypes.UPDATE_PAYROLLGROUPS:
            return {
                ...state,
                [payload.key]: payload.value,
            }
        case PayrollGroupModalTypes.OPEN_PAYROLLGROUP_CREATE_MODAL:
            return{
                showCreate: true
            }
        default:
            return state;
    }
}

export default PayrollGroupModalReducer;