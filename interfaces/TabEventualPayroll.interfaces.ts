export interface TabEventualPayrollInterfaces {
    data?: EventualPayroll[];
    error?: string
}

export interface EventualPayroll {
    id: string,
    _id: string,
    group_name: string,
    payroll_type: string,
    init_date: string,
    end_date: string,
    employees: number,
    perception: number,
    deduction: number,
    total: number,
    id_group_payroll: number,
    status: string,
    statusProgress: string,
    AportacionPatronal: boolean,
    AnioPTU: string,
    MontoRepartirPTU: string
}

export interface EventualPayrollModal {
    payroll_type: string,
    init_date: string,
    end_date: string,
    AportacionPatronal: boolean,
    AnioPTU: string,
    MontoRepartirPTU: string
}

export enum TabEventualPayrollTypes {
    init = '[Tab EventualPayroll] Init',
    add = '[Tab EventualPayroll] Add',
    substract = '[Tab EventualPayroll] Substract',
    filter = '[Tab EventualPayroll] Filter',
    scheduleDrop = '[Tab EventualPayroll] Scuedule Drop',
    setEventualPayroll = '[Tab EventualPayroll] Set EventualPayroll',
    cleanEventualPayroll = '[Tab EventualPayroll] Clean EventualPayroll',
}

export type ActionTabEventualPayrollReducer = {
    type: TabEventualPayrollTypes,
    payload?: any
};

export interface StateTabEventualPayrollInterface {
    loading: boolean;
    EventualPayrolls: EventualPayroll[];
    EventualPayrollFilter?: EventualPayroll[];
    EventualPayroll?: EventualPayroll | null;
};
