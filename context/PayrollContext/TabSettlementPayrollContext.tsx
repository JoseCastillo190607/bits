import { createContext, Dispatch } from 'react';
import { ActionTabSettlementPayrollReducer, StateTabSettlementPayrollInterface } from '../../interfaces/TabSettlementPayroll.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addSettlementPayrollOpen: any,
    setAddSettlementPayrollOpen: any,
    SettlementPayrollState: StateTabSettlementPayrollInterface;
    SettlementPayrollDispatch: Dispatch<ActionTabSettlementPayrollReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addSettlementPayrollOpen: false,
    setAddSettlementPayrollOpen: () => { },
    SettlementPayrollState: {
        SettlementPayrolls: [],
        loading: false,
    },
    SettlementPayrollDispatch: () => { },
}

export const TabSettlementPayrollContext = createContext<InactiveModalInterface>(initState);