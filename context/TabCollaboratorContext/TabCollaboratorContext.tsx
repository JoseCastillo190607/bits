import { createContext, Dispatch } from 'react';
import { ActionTabCollaboratorReducer, StateTabCollaboratorInterface } from '../../interfaces/TabCollaborator.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addCollaboratorOpen: any,
    setAddCollaboratorOpen: any,
    collaboratorState: StateTabCollaboratorInterface;
    collaboratorDispatch: Dispatch<ActionTabCollaboratorReducer>
}

const initState = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addCollaboratorOpen: false,
    setAddCollaboratorOpen: () => { },
    collaboratorState: {
        collaborators: [],
        loading: false,
    },
    collaboratorDispatch: () => { },
}

export const TabCollaboratorContext = createContext<InactiveModalInterface>(initState);