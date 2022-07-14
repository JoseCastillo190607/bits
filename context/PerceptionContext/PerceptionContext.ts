import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showInformacion: boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    ConceptName: string;
    SATKey: string;
    ConceptType: string;
    AccountingAccount: string;
    PayType: string;
    ISRTax: string;
    ISNTax: string;
    SocialSecurity: string;
    IntegratesIMSS: string
};
 
type ModalPartial = {
    state: InitialStateType,
    dispatch: Dispatch<any>,
}
const initialState = {
    open: false,
    showInformacion: false,
    showEdit: false, 
    showEliminar: false,
    _id: '',
    ConceptName: '',
    SATKey: '',
    ConceptType: '',
    AccountingAccount: '', 
    PayType: '',
    ISRTax: '',
    ISNTax: '',
    SocialSecurity: '',
    IntegratesIMSS: ''
}
export enum Types{
    UPDATE_PERCEPTIONS = 'UPDATE_PERCEPTIONS',
    OPEN_PERCEPTION_MODAL = 'OPEN_PERCEPTION_MODAL',
    CLOSE_PERCEPTION_MODAL = 'CLOSE_PERCEPTION_MODAL',
    REACTIVE_PERCEPTION_COL = 'REACTIVE_PERCEPTION_COL',
    //UPDATE_PERCEPTIONS ='UPDATE_PERCEPTIONS',
}
const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const PerceptionContext = createContext<ModalPartial>(ModalInitialState);

export default PerceptionContext;