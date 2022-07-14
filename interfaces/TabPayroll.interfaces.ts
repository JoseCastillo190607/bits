export interface TabPayrollInterfaces {
    data?: Payroll[];
    error?: string
}

export interface Payroll {
    _id: string;
    PayrollType: string;
    InitDate: string;
    EndDate: string;
    PaymentFrecuency: string;
    PayrollGroups: any
}

export interface PayrollModal {
    PayrollType: string;
    InitDate: string;
    EndDate: string;
    PaymentFrecuency: string;
    PayrollGroups: any
}

export interface IncidenciaModal {
    idPayroll: number;
    idCollaborator: number;
    Incident_type: string;
    Dias: number;
    Horas: number;
    InitDate: string;
    EndDate: string;
    Total: number;
    Taxable: boolean;
    NotTaxable: boolean;
    Mixed: boolean;
    TipoIncP: boolean;
    TipoIncC: boolean;
    idConcept: number;
    Comentarios: string;
    typeconcept: string;
    Periodico: boolean;
    FechaPeriodica: string;
}

export enum TabPayrollTypes {
    init = '[Tab Payroll] Init',
    add = '[Tab Payroll] Add',
    substract = '[Tab Payroll] Substract',
    filter = '[Tab Payroll] Filter',
    scheduleDrop = '[Tab Payroll] Scuedule Drop',
    setPayroll = '[Tab Payroll] Set Payroll',
    cleanPayroll = '[Tab Payroll] Clean Payroll',
}

export type ActionTabPayrollReducer = {
    type: TabPayrollTypes,
    payload?: any
};

export interface StateTabPayrollInterface {
    loading: boolean;
    Payrolls: Payroll[];
    PayrollFilter?: Payroll[];
    Payroll?: Payroll | null;
};
