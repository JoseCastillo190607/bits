import {
    ActionTabCollaboratorReducer,
    Collaborator,
    StateTabCollaboratorInterface,
    TabCollaboratorTypes
} from '../../interfaces/TabCollaborator.interfaces';

const initialState: StateTabCollaboratorInterface = {
    loading: true,
    collaborators: [],
    collaboratorsFilter: [],
    collaborator: {
        _id: '',
        Proyecto: '',
        Sede: '',
        Cliente: '',
        email: '',
        FechaIngreso: '',
        FullName: '',
        FechaBaja: '',
        reasonCollaborator: '',
        typeDrop: '',
        bussinesName: '',
        terminationDate: '',
    }
};

export const tabCollaboratorReducer = (
    state = initialState,
    action: ActionTabCollaboratorReducer
) => {

    const substractByID = (e: Collaborator) => e._id !== action!.payload;
    const updateCollaborator = (collaborator: Collaborator) => collaborator._id === action.payload._id
        ? { ...collaborator, ...action.payload.data }
        : collaborator;

    const dictionary = {
        [TabCollaboratorTypes.init]: () => ({
            collaborators: action.payload,
            collaboratorsFilter: action.payload,
            loading: false
        }),
        [TabCollaboratorTypes.add]: () => ({
            ...state,
            collaborators: [...state.collaborators, action.payload],
            collaboratorsFilter: [...state.collaboratorsFilter!, action.payload],
        }),
        [TabCollaboratorTypes.substract]: () => ({
            ...state,
            collaborators: state.collaborators.filter(substractByID),
            collaboratorsFilter: state.collaborators.filter(substractByID)
        }),
        [TabCollaboratorTypes.scheduleDrop]: () => ({
            ...state,
            collaborators: state.collaborators.map(updateCollaborator),
            collaboratorsFilter: state.collaborators.map(updateCollaborator)
        }),
        [TabCollaboratorTypes.filter]: () => ({
            ...state,
            collaboratorsFilter: action.payload
        }),

        [TabCollaboratorTypes.setCollaborator]: () => ({
            ...state,
            collaborator: action.payload
        }),
        [TabCollaboratorTypes.cleanCollaborator]: () => ({
            ...state,
            collaborator: {}
        }),
    };

    return dictionary[action.type]() || state;
};