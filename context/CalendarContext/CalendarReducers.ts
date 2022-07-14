import { initialState } from './CalendarContext';
import { Types } from './Types';
const CalendarReducer = (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case Types.OPEN_MENU:
            return {
                ...state,
                isOpen: true,
                sent: false
            }
        case Types.CLOSE_MENU:
            return initialState;
        case Types.OPEN_MODAL:
            return {
                ...state,
                sent: false
            }
        case Types.OPEN_MODAL_EDIT:
            return {
                ...state,
                isOpen: true,
                fechaInicio: payload.data.fechaInicio,
                fechaFinal: payload.data.fechaFinal,
                titulo: payload.data.titulo,
                descripcion: payload.data.descripcion,
                tipo: payload.data.tipo,
                _id: payload.data._id,
                sent: false,
                proyecto: payload.data.projects
            }
        case Types.UPDATE_DATE:
            return {
                ...state,
                [payload.key]: payload.value,
            }
        default:
            return state;
    };
};

export default CalendarReducer;