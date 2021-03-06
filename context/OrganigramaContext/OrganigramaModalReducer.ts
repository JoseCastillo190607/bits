import { OrganigramaModalTypes } from './OrganigramaModalTypes';

const OrganigramaModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case OrganigramaModalTypes.OPEN_ORGANIGRAMA_MODAL:    
        return {
            
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showEdit: payload.showEdit,
                showInformacion: payload.showInformacion,
                showEliminar: payload.showEliminar,
                NombrePuesto: payload.NombrePuesto,
                AreaProyecto: payload.AreaProyecto,
                PuestoSuperior: payload.PuestoSuperior,
                Descripcion: payload.Descripcion,
                showAgregaPersona: payload. showAgregaPersona

            }
        case OrganigramaModalTypes.CLOSE_ORGANIGRAMA_MODAL:
            return {
                ...state,
                open: false,
                showEdit: false,
                showInformacion:false,
                showEliminar: false,
                showAgregaPersona: false,
                _id: '',
            }
        case OrganigramaModalTypes.REACTIVE_ORGANIGRAMA_COL:
            return {
                ...state,
                _id: payload
            }
        case OrganigramaModalTypes.UPDATE_PUESTOS:
            return {
                ...state,
                [payload.key]: payload.value,
            }
        default:
            return state;
    }
}

export default OrganigramaModalReducer;