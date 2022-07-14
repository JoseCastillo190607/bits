import { createContext, Dispatch } from 'react';
import { ActionTabPoliticReducer, StateTabPoliticInterface } from '../../interfaces/TabPolitic.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addPoliticOpen: any,
    setAddPoliticOpen: any,
    PoliticState: StateTabPoliticInterface;
    PoliticDispatch: Dispatch<ActionTabPoliticReducer>
}

const initState:InactiveModalInterface  = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addPoliticOpen: false,
    setAddPoliticOpen: () => { },
    PoliticState: {
        Politics: [],
        loading: false,
    },
    PoliticDispatch: () => { },
}

export const TabPoliticContext = createContext<InactiveModalInterface>(initState);