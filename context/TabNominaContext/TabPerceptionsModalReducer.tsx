import { PerceptionsModalTypes } from './TabPerceptionsModalTypes';

const PerceptionsModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case PerceptionsModalTypes.OPEN_PERCEPTIONS_MODAL:
            return { 
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showInformacion: payload.showInformacion,
                showEliminar: payload.showEliminar,
                showEdit: payload.showEdit,
                ConceptName: payload.ConceptName,
                SATKey: payload.SATKey,
                ConceptType: payload.ConceptType,
                AccountingAccount: payload.AccountingAccount,
                PayType: payload.PayType,
                ISRTax: payload.ISRTax,
                ISNTax: payload.ISNTax,
                SocialSecurity: payload.SocialSecurity,
                IntegratesIMSS: payload.IntegratesIMSS
            }
        case PerceptionsModalTypes.CLOSE_PERCEPTIONS_MODAL:
            return {
                ...state,
                open: false,
                showEdit: false,
                showInformacion:false,
                showEliminar: false,
                _id: '',
            }
        case PerceptionsModalTypes.REACTIVE_PERCEPTIONS_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    }
}

export default PerceptionsModalReducer;