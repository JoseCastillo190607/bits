import { PayrollModalTypes } from "./PayrollModalTypes";


const PayrollModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case PayrollModalTypes.OPEN_PAYROLL_MODAL:
            return {
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showEliminar: payload.showEliminar,
                PayrollType: payload.payload.showEliminar,
                InitDate: payload.InitDate,
                EndDate: payload.EndDate,
                PaymentFrecuency: payload.EndDate

            }
        case PayrollModalTypes.CLOSE_PAYROLL_MODAL:
            return {
                ...state,
                open: false,
                showEliminar: false,
                _id: '',
            }
        case PayrollModalTypes.REACTIVE_PAYROLL_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    }
}

export default PayrollModalReducer;