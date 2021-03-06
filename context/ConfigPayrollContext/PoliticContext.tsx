import {createContext, Dispatch} from 'react';

type InitialStateType = {
    open: boolean;
    showEdit: boolean;
    showEliminar: boolean;
    _id: string;
    value: string;
    client: string;
    title: string;
    PolicyName: string,
    EconomicDays: string,
    AnniversaryVacationPremium: string,
    PantryValueType: string,
    PantryValueCap: string,
    PantryValue: string,
    SavingsFundType: string,
    SavingsFundCap: string,
    SavingsFund: string,
    RestaurantValue: string,
    RestaurantValueType: string,
    RestaurantValueCap: string,
    AbsenceDiscount: boolean,
    DisabilityDiscount: string,
    VoucherCost: string,
    DiscountDay: string,
    SeniorityDate: string,
    ContractStartDate: string
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
    PolicyName: '',
    EconomicDays: '',
    AnniversaryVacationPremium: '',
    PantryValueType: '',
    PantryValueCap: '',
    PantryValue: '',
    SavingsFundType: '',
    SavingsFundCap: '',
    SavingsFund: '',
    RestaurantValue: '',
    RestaurantValueType: '',
    RestaurantValueCap: '',
    AbsenceDiscount: false,
    DisabilityDiscount: '',
    VoucherCost: '',
    DiscountDay: '',
    SeniorityDate: '',
    ContractStartDate: ''
}

const ModalInitialState = {
    state: initialState,
    dispatch: () => null
}

const PoliticContext = createContext<ModalPartial>(ModalInitialState);

export default PoliticContext;