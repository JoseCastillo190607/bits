export interface TabEventIncident {
    data?: EventIncident[];
    error?: string
}

export interface EventIncident {
    _id: String;
    calendarId: String,
    name: String,
    initDate: String,
    endDate: String,
    status: String
}

export interface EventIncidentModal {
    calendarId: number
    name: String,
    initDate: String,
    endDate: String
}

export enum TabEventIncidentTypes {
    init = '[Tab EventIncident] Init',
    add = '[Tab EventIncident] Add',
    substract = '[Tab EventIncident] Substract',
    filter = '[Tab EventIncident] Filter',
    scheduleDrop = '[Tab EventIncident] Scuedule Drop',
    setEventIncident = '[Tab EventIncident] Set EventIncident',
    cleanEventIncident = '[Tab EventIncident] Clean EventIncident',
} 

export type ActionTabEventIncidentReducer = {
    type: TabEventIncidentTypes,
    payload?: any
};

export interface StateTabEventIncidentTypesInterface {
    loading: boolean;
    EventIncidents: EventIncident[];
    EventIncidentFilter?: EventIncident[];
    EventIncident?: EventIncident | null;
};