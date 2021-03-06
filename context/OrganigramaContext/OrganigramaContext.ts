import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showEdit: boolean;
    showInformacion: boolean;
    showEliminar: boolean;
    showAgregaPersona: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    NombrePuesto: string;
    AreaProyecto: string;
    PuestoSuperior: string;
    Descripcion: string;
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}
const initialState = {
    open: false,
    showEdit: false,
    showInformacion: false,
    showEliminar: false,
    showAgregaPersona: false,
    _id: '',
    value: '',
    client: '',
    title: '',
    NombrePuesto: '',
    AreaProyecto: '',
    PuestoSuperior: '',
    Descripcion: ''
}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const OrganigramaContext = createContext<ModalPartial>(ModalInitialState);

export default OrganigramaContext;