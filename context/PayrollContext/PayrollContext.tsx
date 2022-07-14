import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    PayrollType: string;
    InitDate: string;
    EndDate: string;
    PaymentFrecuency: string;
    PayrollGroups: any

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
    PayrollType: '',
    InitDate: '',
    EndDate: '',
    PaymentFrecuency: '',
    PayrollGroups: {}

}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const PayrollContext = createContext<ModalPartial>(ModalInitialState);

export default PayrollContext;