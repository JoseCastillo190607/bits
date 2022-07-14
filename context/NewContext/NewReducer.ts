import { initialState, Types } from "./NewContext";

const CalendarReducer = (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case Types.OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                sent: false
            }
        case Types.CLOSE_MODAL:
            return initialState;
        case Types.UPDATE_NEW:
            return {
                ...state,
                [payload.key]: payload.value,
            }
        case Types.UPDATE_FILE:
            return {
                ...state,
                File: payload.value,
                Image: true
            }
        case Types.DELETE_FILE:
            return {
                ...state,
                File: '',
                Image: false
            }
        case Types.DELETE_NEW:
            return {
                ...state,
                sent: false
            }
        case Types.UPDATE_SCHEDULEDATE:
            return {
                ...state,
                scheduleDate: payload.value,
                scheduled: true
            }
        case Types.DELETE_SCHEDULEDATE:
            return {
                ...state,
                scheduleDate: '',
                scheduled: false
            }

        case Types.OPEN_MODAL_SHOW:
            return {
                ...state,
                titulo: payload.values.titulo,
                BodyHTML: payload.values.BodyHTML,
                showModal: true,
                ImageUri: payload.values.ImageUri,
                _id: payload.values._id,
                Autor: payload.values.Autor
            }
        case Types.OPEN_RESEND:
            return {
                ...state,
                titulo: payload.values.titulo,
                BodyHTML: payload.values.BodyHTML,
                isOpen: true,
                ImageUri: payload.values.ImageUri,
                _id: payload.values._id,
                Autor: payload.values.Autor,
                projects: payload.values.projects,
                AutorImg: payload.values.AutorImg
            }
        default:
            return state;
    };
};

export default CalendarReducer;