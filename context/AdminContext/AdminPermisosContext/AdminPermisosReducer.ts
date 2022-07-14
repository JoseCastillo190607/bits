
import {Types} from "./AdminPermisosContext"

const ModalReducer = (state: any, action: any) =>{
    const {payload, type} = action;
    switch(type){
        case Types.UPDATE_PERMISOS:
            return {
                ...state,
                Permisos: payload.Permisos
            }        
            default:
            return state
    };
}

export default ModalReducer;