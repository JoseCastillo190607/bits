import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    ConceptName: string,
    SATKey: string,
    ISRTax: string,
    TaxBoth: string
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}
const initialState = {
    open: false,
    showEdit: false,
    showEliminar: false,
    _id: '',
    value: '',
    client: '',
    title: '',
    ConceptName: '',
    SATKey: '',
    ISRTax: '',
    TaxBoth: ''
}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const DeduccionContext = createContext<ModalPartial>(ModalInitialState);

export default DeduccionContext;