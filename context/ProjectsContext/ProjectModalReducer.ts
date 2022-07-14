import ModalReducer from '../CollaboratorContext/CollaboratorReducer';
import { ProjectModalTypes } from './ProjectModalTypes';

const ProjectModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case ProjectModalTypes.OPEN_PROJECT_MODAL:
            return {
                ...state,
                open: true,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title
            }
        case ProjectModalTypes.CLOSE_PROJECT_MODAL:
            return {
                ...state,
                open: false,
                _id: '',
            }
        case ProjectModalTypes.REACTIVE_PROJECT_COL:
            return {
                ...state,
                _id: payload
            }
        default:
            return state;
    }
}

export default ProjectModalReducer;