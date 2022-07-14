import { Dispatch} from "react";
import { getCollaborators } from "../services/collaboratorService";
import { Collaborator, ScheduleDropCollaborator, TabCollaboratorTypes } from '../interfaces/TabCollaborator.interfaces';


export const startCollaborators = async (dispatch: Dispatch<any>, proyectos: string) => {
    //const collaborators = //await getCollaborators();
    //let ArrayFiltrado = collaborators.data.filter((r:any) => proyectos.includes(r.Proyecto))
    //dispatch(setCollaborators(ArrayFiltrado));
};

export const setCollaborators: any = (collaborators: Collaborator[]) => ({
    type: TabCollaboratorTypes.init,
    payload: collaborators
});

export const setCollaborator = (collaborator: Collaborator) => ({
    type: TabCollaboratorTypes.setCollaborator,
    payload: collaborator
});

export const cleanCollaborator = () => ({
    type: TabCollaboratorTypes.cleanCollaborator
});

export const filterCollaborators = (collaborators: Collaborator[]) => ({
    type: TabCollaboratorTypes.filter,
    payload: collaborators
});

export const substractCollaborator = (id: string) => ({
    type: TabCollaboratorTypes.substract,
    payload: id
});

export const scheduleDropCollaborator = (id: string, data: ScheduleDropCollaborator) => ({
    type: TabCollaboratorTypes.scheduleDrop,
    payload: { _id: id, data }
});

export const addNewCollaborator = (collaborator: Collaborator) => ({
    type: TabCollaboratorTypes.add,
    payload: collaborator
});