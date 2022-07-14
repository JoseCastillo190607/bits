import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showInformacion:boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    ConceptName: string,
    SATKey: string,
    ConceptType: string,
    AccountingAccount: string,
    PayType: string,
    ISRTax: string,
    ISNTax: string,
    SocialSecurity: string,
    IntegratesIMSS: string,
    TaxBoth: string
};

type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}
export const initialState = {
    open: false,
    showInformacion: false,
    showEdit: false,
    showEliminar: false,
    _id: '',
    value: '',
    client: '',
    title: '',
    ConceptName: '',
    SATKey: '',
    ConceptType: '',
    AccountingAccount: '',
    PayType: '',
    ISRTax: '',
    ISNTax: '',
    SocialSecurity: '',
    IntegratesIMSS: '',
    TaxBoth: '',
}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}



const PerceptionContext = createContext<ModalPartial>(ModalInitialState);

export default PerceptionContext;