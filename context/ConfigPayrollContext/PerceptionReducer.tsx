import { PerceptionModalTypes } from './PerceptionModalTypes';
import {initialState} from './PerceptionContext'

const PerceptionModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case PerceptionModalTypes.UPDATE_PERCEPTIONS:
            return {
                ...state,
                [payload.key]: payload.value,
            }
        case PerceptionModalTypes.OPEN_PERCEPTION_MODAL:
            return {
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showEdit: payload.showEdit,
                showEliminar: payload.showEliminar,
                showInformacion: payload.showInformacion,
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
        case PerceptionModalTypes.CLOSE_PERCEPTION_MODAL:
                return initialState;
            
        case PerceptionModalTypes.REACTIVE_PERCEPTION_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    }
}

export default PerceptionModalReducer;