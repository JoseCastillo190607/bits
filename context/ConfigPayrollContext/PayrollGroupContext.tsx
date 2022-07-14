import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    GroupName: string,
    PaymentScheme: string,
    CompanyName: string,
    BankAccount: string
    PayrollPeriod: string,
    SocialSecurity: string,
    MonthlyISR: string,
    PayrollPeriodDays: string,
    RegulationISR: string,
    SubsidyEmployee: string,
    showCreate: boolean
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}
export const initialState = {
    open: false,
    showEdit: false,
    showEliminar: false,
    _id: '',
    value: '',
    client: '',
    title: '',
    GroupName: '',
    PaymentScheme: '',
    CompanyName: '',
    BankAccount: '',
    PayrollPeriod: '',
    SocialSecurity: '',
    MonthlyISR: '',
    PayrollPeriodDays: '',
    RegulationISR: '',
    SubsidyEmployee: '',
    showCreate: false
}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const PayrollGroupContext = createContext<ModalPartial>(ModalInitialState);

export default PayrollGroupContext;