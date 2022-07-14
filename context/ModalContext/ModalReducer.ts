import { ModalTypes } from './ModalTypes';
const ModalReducer = (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {
        case ModalTypes.OPEN_MODAL:
            return {
                ...state,
                open: true,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title
            }
        case ModalTypes.CLOSE_MODAL:
            return {
                ...state,
                open: false,
                _id: '',
            }
        case ModalTypes.REACTIVE_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    };
};

export default ModalReducer;