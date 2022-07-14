import { Types } from "./CollaboratorContext";

const ModalReducer = (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case Types.INGRESE_PROGRESS:
            return {
                ...state,
                progress: payload.progress,
            }
        case Types.VALIDATE_SECTION:
            return {
                ...state,
                sections: payload.sections,
            }
        case Types.UPDATE_COLLABORATOR:
            return {
                ...state,
                collaborator: payload.collaborator,
            }
        case Types.SET_COLLABORATOR:
            return {
                ...state,
                progress: payload.progress,
                sections: payload.sections
            }
        case Types.UPDATE_BAND:
            return {
                ...state,
                band: true
            }
        case Types.REJECT_DATA:
            return {
                ...state,
                rejectModal: true
            }
        case Types.CANCEL_REJECT_DATA:
            return {
                ...state,
                rejectModal: false
            }
        case Types.DECLINE_MODAL:
            return {
                ...state,
                _id: payload._id,
                declineModal: true
            }
        case Types.CANCEL_DECLINE_MODAL:
            return {
                ...state,
                _id: "",
                declineModal: false
            }
        case Types.CONVERT_MODAL:
            return {
                ...state,
                _id: payload._id,
                convertModal: true
            }
        case Types.CANCEL_CONVERT_MODAL:
            return {
                ...state,
                _id: "",
                convertModal: false
            }
        default:
            return state;
    };
};

export default ModalReducer;