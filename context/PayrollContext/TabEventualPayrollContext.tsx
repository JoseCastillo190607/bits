import { createContext, Dispatch } from 'react';
import { ActionTabEventualPayrollReducer, StateTabEventualPayrollInterface } from '../../interfaces/TabEventualPayroll.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addEventualPayrollOpen: any,
    setAddEventualPayrollOpen: any,
    EventualPayrollState: StateTabEventualPayrollInterface;
    EventualPayrollDispatch: Dispatch<ActionTabEventualPayrollReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addEventualPayrollOpen: false,
    setAddEventualPayrollOpen: () => { },
    EventualPayrollState: {
        EventualPayrolls: [],
        loading: false,
    },

    EventualPayrollDispatch: () => { },
}

export const TabEventualPayrollContext = createContext<InactiveModalInterface>(initState);