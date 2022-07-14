
import {Types} from "./NominaContext"

const ModalReducer = (state: any, action: any) =>{
    const {payload, type} = action;
    switch(type){
        case Types.UPDATE_STATE:
            return {
                ...state,
                Estado: payload.Estado
            }        
            default:
            return state
    };
}

export default ModalReducer;