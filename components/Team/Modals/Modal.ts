import { Dispatch } from "react";
import { ModalTypes } from "../../../context/ModalContext/ModalTypes";

export const openModal = ({ _id = '', value = '', client = '', title = '' }: any, dispatch: Dispatch<any>): void => {
    dispatch({
        type: ModalTypes.OPEN_MODAL,
        payload: {
            _id,
            value,
            client,
            title
        }
    });
};

export const deleteModal = ({ _id, value }: any, dispatch: Dispatch<any>): void => {
    dispatch({
        type: ModalTypes.OPEN_MODAL,
        payload: {
            _id,
            value
        }
    });
};

export const closeModal = (dispatch: Dispatch<any>): void => {
    dispatch({
        type: ModalTypes.CLOSE_MODAL
    });
};