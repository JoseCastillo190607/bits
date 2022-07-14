export interface TabPerceptionsInterfaces {
    data?: Perception[];
    error?: string
}

export interface Perception {
    _id: string;
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
}

export interface PerceptionModal {
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

}

export enum TabPerceptionTypes {
    init = '[Tab Perception] Init',
    add = '[Tab Perception] Add',
    substract = '[Tab Perception] Substract',
    filter = '[Tab Perception] Filter',
    scheduleDrop = '[Tab Perception] Scuedule Drop',
    setPerception = '[Tab Perception] Set Perception',
    cleanPerception = '[Tab Perception] Clean Perception',
} 

export type ActionTabPerceptionReducer = {
    type: TabPerceptionTypes,
    payload?: any
};

export interface StateTabPerceptionInterface {
    loading: boolean;
    Perceptions: Perception[];
    PerceptionsFilter?: Perception[];
    Perception?: Perception | null;
};
