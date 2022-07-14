import { createContext, Dispatch } from 'react';
import { ActionTabPayrollReducer, StateTabPayrollInterface } from '../../interfaces/TabPayroll.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addPayrollOpen: any,
    setAddPayrollOpen: any,
    PayrollState: StateTabPayrollInterface;
    PayrollDispatch: Dispatch<ActionTabPayrollReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addPayrollOpen: false,
    setAddPayrollOpen: () => { },
    PayrollState: {
        Payrolls: [],
        loading: false,
    },
    PayrollDispatch: () => { },
}

export const TabPayrollContext = createContext<InactiveModalInterface>(initState);