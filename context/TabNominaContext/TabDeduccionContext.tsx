import { createContext, Dispatch } from 'react';
import { ActionTabDeduccionReducer, StateTabDeduccionInterface } from '../../interfaces/TabDeduccion.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addDeduccionOpen: any,
    setAddDeduccionOpen: any,
    DeduccionState: StateTabDeduccionInterface;
    DeduccionDispatch: Dispatch<ActionTabDeduccionReducer>
}

const initState = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addDeduccionOpen: false,
    setAddDeduccionOpen: () => { },
    DeduccionState: {
        Deducciones: [],
        loading: false,
    },
    DeduccionDispatch: () => { },
}

export const TabDeduccionContext = createContext<InactiveModalInterface>(initState);