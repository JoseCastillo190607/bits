import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}
const initialState = {
    open: false,
    _id: '',
    value: '',
    client: '',
    title: '',
}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const ProjectContext = createContext<ModalPartial>(ModalInitialState);

export default ProjectContext;