import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    dischargeDate: string;
    dischargeType: string;
    reason: string;
    recessionJob: string;
    Taxable: string;
    NotTaxable: string;
    Mixed: string;
    Total: string;
    idConcept: string;
    Concepts: any


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
    dischargeDate: '',
    dischargeType: '',
    reason: '',
    recessionJob: '',
    Taxable: '',
    NotTaxable: '',
    Mixed: '',
    Total: '',
    idConcept: '',
    Concepts: {}

}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const PayrollContext = createContext<ModalPartial>(ModalInitialState);

export default PayrollContext;