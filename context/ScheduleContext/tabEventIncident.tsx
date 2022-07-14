import { createContext, Dispatch } from 'react';
import { ActionTabEventIncidentReducer, StateTabEventIncidentTypesInterface } from '../../interfaces/tabEventIncident.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addEventIncidentOpen: any,
    setAddEventIncidentOpen: any,
    EventIncidentState: StateTabEventIncidentTypesInterface;
    EventIncidentDispatch: Dispatch<ActionTabEventIncidentReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addEventIncidentOpen: false,
    setAddEventIncidentOpen: () => { },
    EventIncidentState: {
        EventIncidents: [],
        loading: false,
    },
    EventIncidentDispatch: () => { },
}

export const TabEventIncidentContext = createContext<InactiveModalInterface>(initState);