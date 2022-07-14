import { createContext, Dispatch } from 'react';
import { ActionTabPerceptionReducer, StateTabPerceptionInterface } from '../../interfaces/TabPerceptions.interfaces';

interface InactiveModalInterface {
    inactiveOpen: any//boolean | (() => void);
    setInactiveOpen: any//boolean | (() => void);,
    addPerceptionOpen: any,
    setAddPerceptionOpen: any,
    PerceptionState: StateTabPerceptionInterface;
    PerceptionDispatch: Dispatch<ActionTabPerceptionReducer>
}

const initState:InactiveModalInterface = {
    inactiveOpen: false,
    setInactiveOpen: () => { },
    addPerceptionOpen: false,
    setAddPerceptionOpen: () => { },
    PerceptionState: {
        Perceptions: [],
        loading: false,
    },
    PerceptionDispatch: () => { },
}

export const TabPerceptionsContext = createContext<InactiveModalInterface>(initState);