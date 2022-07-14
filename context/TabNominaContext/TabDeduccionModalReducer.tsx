import { DeduccionModalTypes } from './TabDeduccionModalTypes';

const DeduccionModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case DeduccionModalTypes.OPEN_DEDUCCION_MODAL:
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
            }
        case DeduccionModalTypes.CLOSE_DEDUCCION_MODAL:
            return {
                ...state,
                open: false,
                showEdit: false,
                showInformacion:false,
                showEliminar: false,
                _id: '',
            }
        case DeduccionModalTypes.REACTIVE_DEDUCCION_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    }
}

export default DeduccionModalReducer;