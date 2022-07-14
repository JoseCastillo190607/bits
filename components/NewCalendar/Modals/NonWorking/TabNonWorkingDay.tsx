import { createContext, Dispatch } from 'react';
import { ActionTabNonWorkingDayReducer, StateTabNonWorkingDayTypesInterface } from './TabNonWorkingDay.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addNonWorkingDayOpen: any,
    setAddNonWorkingDayOpen: any,
    NonWorkingDayState: StateTabNonWorkingDayTypesInterface;
    NonWorkingDayDispatch: Dispatch<ActionTabNonWorkingDayReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addNonWorkingDayOpen: false,
    setAddNonWorkingDayOpen: () => { },
    NonWorkingDayState: {
        NonWorkingDays: [],
        loading: false,
    },
    NonWorkingDayDispatch: () => { },
}

export const TabNonWorkingDaContext = createContext<InactiveModalInterface>(initState);