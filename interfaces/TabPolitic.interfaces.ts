export interface TabPoliticInterfaces {
    data?: Politic[];
    error?: string
}

export interface Politic {
    _id: string;
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
    AbsenceDiscount: string,
    DisabilityDiscount: string,
    VoucherCost: string,
    DiscountDay: string,
    SeniorityDate: string,
    ContractStartDate: string
}

export interface PoliticModal {
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
    AbsenceDiscount: string,
    DisabilityDiscount: string,
    VoucherCost: string,
    DiscountDay: string,
    SeniorityDate: string,
    ContractStartDate: string
}

export enum TabPoliticTypes {
    init = '[Tab Politic] Init',
    add = '[Tab Politic] Add',
    substract = '[Tab Politic] Substract',
    filter = '[Tab Politic] Filter',
    scheduleDrop = '[Tab Politic] Scuedule Drop',
    setPolitic = '[Tab Politic] Set Politic',
    cleanPolitic = '[Tab Politic] Clean Politic',
}

export type ActionTabPoliticReducer = {
    type: TabPoliticTypes,
    payload?: any
};

export interface StateTabPoliticInterface {
    loading: boolean;
    Politics: Politic[];
    PoliticsFilter?: Politic[];
    Politic?: Politic | null;
};
