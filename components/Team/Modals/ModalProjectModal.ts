import { Dispatch } from "react";
import { ProjectModalTypes } from "../../../context/ProjectsContext/ProjectModalTypes";

export const openProjectModal = ({ _id = '', value = '' , client = '', title = ''}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: ProjectModalTypes.OPEN_PROJECT_MODAL,
        payload: {
            _id,
            value,
            client,
            title
        }
    });
}

export const deleteProjectModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: ProjectModalTypes.CLOSE_PROJECT_MODAL
    });
};

export const closeProjectModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: ProjectModalTypes.CLOSE_PROJECT_MODAL 
    })
}