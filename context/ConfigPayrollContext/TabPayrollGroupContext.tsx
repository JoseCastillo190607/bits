import { createContext, Dispatch } from 'react';
import { ActionTabPayrollGroupReducer, StateTabPayrollGroupInterface } from '../../interfaces/TabPayrollGroup.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addPayrollGroupOpen: any,
    setAddPayrollGroupOpen: any,
    PayrollGroupState: StateTabPayrollGroupInterface;
    PayrollGroupDispatch: Dispatch<ActionTabPayrollGroupReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addPayrollGroupOpen: false,
    setAddPayrollGroupOpen: () => { },
    PayrollGroupState: {
        PayrollGroups: [],
        loading: false,
    },
    PayrollGroupDispatch: () => { },
}

export const TabPayrollGroupContext = createContext<InactiveModalInterface>(initState);