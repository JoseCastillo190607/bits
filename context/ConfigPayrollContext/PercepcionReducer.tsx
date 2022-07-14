import { PerceptionsModalTypes } from './PerceptionsModalTypes';
import {initialState} from './PerceptionContext'


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
                ConceptName: payload.ConceptName,
                SATKey: payload.SATKey,
                ConceptType: payload.ConceptType,
                AccountingAccount: payload.AccountingAccount,
                PayType: payload.PayType,
                ISRTax: payload.ISRTax,
                ISNTax: payload.ISNTax,
                SocialSecurity: payload.SocialSecurity,
                IntegratesIMSS: payload.IntegratesIMSS,
                showInformacion: payload.showInformacion,
                showEliminar: payload.showEliminar,
                showEdit: payload.showEdit
                

            }
        case PerceptionsModalTypes.CLOSE_PERCEPTIONS_MODAL:
                return initialState;

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