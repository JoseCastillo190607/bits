import { createContext, Dispatch } from 'react';
import { ActionTabPuestoReducer, StateTabPuestoInterface } from '../../interfaces/TabPuesto.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addPuestoOpen: any,
    setAddPuestoOpen: any,
    PuestoState: StateTabPuestoInterface;
    PuestoDispatch: Dispatch<ActionTabPuestoReducer>
}

const initState = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addPuestoOpen: false,
    setAddPuestoOpen: () => { },
    PuestoState: {
        Puestos: [],
        loading: false,
    },
    PuestoDispatch: () => { },
}

export const TabPuestoContext = createContext<InactiveModalInterface>(initState);