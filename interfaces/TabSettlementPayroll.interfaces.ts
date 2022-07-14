export interface TabSettlementPayrollInterfaces {
    data?: SettlementPayroll[];
    error?: string
}

export interface SettlementPayroll {
    _id: string;
    dischargeDate: string;
    dischargeType: string;
    reason: string;
    recessionJob: string;
    Taxable: boolean;
    NotTaxable: boolean;
    Mixed: boolean;
    Total: number;
    idConcept: number;
    idCollaborator: number;
    Concepts: any
}

export interface SettlementPayrollModal {
    dischargeDate: string;
    dischargeType: string;
    reason: string;
    recessionJob: string;
    Taxable: boolean;
    NotTaxable: boolean;
    Mixed: boolean;
    Total: number;
    idConcept: number;
    idCollaborator: number;
    Concepts: any
}

export enum TabSettlementPayrollTypes {
    init = '[Tab SettlementPayroll] Init',
    add = '[Tab SettlementPayroll] Add',
    substract = '[Tab SettlementPayroll] Substract',
    filter = '[Tab SettlementPayroll] Filter',
    scheduleDrop = '[Tab SettlementPayroll] Scuedule Drop',
    setSettlementPayroll = '[Tab SettlementPayroll] Set SettlementPayroll',
    cleanSettlementPayroll = '[Tab SettlementPayroll] Clean SettlementPayroll',
}

export type ActionTabSettlementPayrollReducer = {
    type: TabSettlementPayrollTypes,
    payload?: any
};

export interface StateTabSettlementPayrollInterface {
    loading: boolean;
    SettlementPayrolls: SettlementPayroll[];
    SettlementPayrollFilter?: SettlementPayroll[];
    SettlementPayroll?: SettlementPayroll | null;
};
