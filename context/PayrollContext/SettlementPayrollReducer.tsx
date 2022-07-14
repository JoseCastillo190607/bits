import { SettlementPayrollModalTypes } from "./SettlementPayrollModalTypes";


const SETTLEMENTPayrollModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case SettlementPayrollModalTypes.OPEN_SETTLEMENTPAYROLL_MODAL:
            return {
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showEliminar: payload.showEliminar,
                dischargeDate: payload.dischargeDate,
                dischargeType: payload.dischargeType,
                reason: payload.reason,
                recessionJob: payload.recessionJob,
                Taxable: payload.Taxable,
                NotTaxable: payload.NotTaxable,
                Mixed: payload.Mixed,
                Total: payload.Total,
                idConcept: payload.idConcept,

            }
        case SettlementPayrollModalTypes.CLOSE_SETTLEMENTPAYROLL_MODAL:
            return {
                ...state,
                open: false,
                showEliminar: false,
                _id: '',
            }
        case SettlementPayrollModalTypes.REACTIVE_SETTLEMENTPAYROLL_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    }
}

export default SETTLEMENTPayrollModalReducer;