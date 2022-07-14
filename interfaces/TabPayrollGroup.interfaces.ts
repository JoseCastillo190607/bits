export interface TabPayrollGroupInterfaces {
    data?: PayrollGroup[];
    error?: string
}

export interface PayrollGroup {
    _id: string;
    GroupName: string;
    PaymentScheme: string;
    CompanyName: string;
    BankAccount: string;
    PayrollPeriod: string;
    SocialSecurity: string;
    MonthlyISR: string;
    PayrollPeriodDays: string;
    RegulationISR: string;
    SubsidyEmployee: string;
}

export interface PayrollGroupModal {
    GroupName: string;
    PaymentScheme: string;
    CompanyName: string;
    BankAccount: string;
    PayrollPeriod: string;
    SocialSecurity: string;
    MonthlyISR: string;
    PayrollPeriodDays: string;
    RegulationISR: string;
    SubsidyEmployee: string;
}

export enum TabPayrollGroupTypes {
    init = '[Tab PayrollGroup] Init',
    add = '[Tab PayrollGroup] Add',
    substract = '[Tab PayrollGroup] Substract',
    filter = '[Tab PayrollGroup] Filter',
    scheduleDrop = '[Tab PayrollGroup] Scuedule Drop',
    setPayrollGroup = '[Tab PayrollGroup] Set PayrollGroup',
    cleanPayrollGroup = '[Tab PayrollGroup] Clean PayrollGroup',
}

export type ActionTabPayrollGroupReducer = {
    type: TabPayrollGroupTypes,
    payload?: any
};

export interface StateTabPayrollGroupInterface {
    loading: boolean;
    PayrollGroups: PayrollGroup[];
    PayrollGroupsFilter?: PayrollGroup[];
    PayrollGroup?: PayrollGroup | null;
};
