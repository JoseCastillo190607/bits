import { Types } from "./TableSubsidyContext";

const ModalReducer = (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case Types.UPDATE_TABLESUBSIDY:
            return {
                ...state,
                collaborator: payload.tablesValue,
            }
        case Types.SET_TABLESUBSIDY:
            return {
                ...state,
                progress: payload.progress,
                sections: payload.sections
            }
        case Types.EDIT_MODAL:
            return {
                ...state,
                _id: payload._id,
                EditModal: true
            }
        case Types.CANCEL_EDIT_MODAL:
            return {
                ...state,
                _id: "",
                EditModal: false
            }
        case Types.DELETE_MODAL:
            return {
                ...state,
                _id: payload._id,
                DeleteModal: true
            }
        case Types.CANCEL_DELETE_MODAL:
            return {
                ...state,
                _id: "",
                DeleteModal: false
            }
        default:
            return state;
    };
};

export default ModalReducer;