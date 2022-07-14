export interface TabDeduccionInterfaces {
    data?: Deduccion[];
    error?: string
}

export interface Deduccion {
    _id: string;
    SATKey: string,
    ConceptName: string,
    ISRTax: string,
    TaxBoth: string
}

export interface DeduccionModal {
    SATKey: string,
    ConceptName: string,
    ISRTax: string,
    TaxBoth: string
}

export enum TabDeduccionTypes {
    init = '[Tab Deduccion] Init',
    add = '[Tab Deduccion] Add',
    substract = '[Tab Deduccion] Substract',
    filter = '[Tab Deduccion] Filter',
    scheduleDrop = '[Tab Deduccion] Scuedule Drop',
    setDeduccion = '[Tab Deduccion] Set Deduccion',
    cleanDeduccion = '[Tab Deduccion] Clean Deduccion',
} 

export type ActionTabDeduccionReducer = {
    type: TabDeduccionTypes,
    payload?: any
};

export interface StateTabDeduccionInterface {
    loading: boolean;
    Deducciones: Deduccion[];
    DeduccionesFilter?: Deduccion[];
    Deduccion?: Deduccion | null;
};
