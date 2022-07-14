export interface TabNonWorkingDay {
    data?: NonWorkingDay[];
    error?: string
}

export interface NonWorkingDay {
    _id: String;
    calendarId: String,
    name: String,
    initDate: String,
    endDate: String,
    status: String
}

export interface NonWorkingDayModal {
    calendarId: number
    name: String,
    initDate: String,
    endDate: String
}

export enum TabNonWorkingDayTypes {
    init = '[Tab NonWorkingDay] Init',
    add = '[Tab NonWorkingDay] Add',
    substract = '[Tab NonWorkingDay] Substract',
    filter = '[Tab NonWorkingDay] Filter',
    scheduleDrop = '[Tab NonWorkingDay] Scuedule Drop',
    setNonWorkingDay = '[Tab NonWorkingDay] Set NonWorkingDay',
    cleanNonWorkingDay = '[Tab NonWorkingDay] Clean NonWorkingDay',
} 

export type ActionTabNonWorkingDayReducer = {
    type: TabNonWorkingDayTypes,
    payload?: any
};

export interface StateTabNonWorkingDayTypesInterface {
    loading: boolean;
    NonWorkingDays: NonWorkingDay[];
    NonWorkingDayFilter?: NonWorkingDay[];
    NonWorkingDay?: NonWorkingDay | null;
};