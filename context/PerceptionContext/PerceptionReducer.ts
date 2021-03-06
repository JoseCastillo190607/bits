import {Types} from "./PerceptionContext"

const PerceptionModalReducer = (state: any, action: any) =>{
    const {payload, type} = action;
    switch(type){
            case Types.UPDATE_PERCEPTIONS:
            return {
                ...state,
                [payload.key]: payload.value,
            }
            case Types.OPEN_PERCEPTION_MODAL:
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
            case Types.CLOSE_PERCEPTION_MODAL:
                return {
                    ...state,
                    open: false,
                    showEdit: false,
                    showEliminar: false,
                    showInformacion:false,
                    _id: '',
                }
            case Types.REACTIVE_PERCEPTION_COL:
                return {
                    ...state,
                    _id: payload
                }        
            default:
            return state
    };
}

export default PerceptionModalReducer;