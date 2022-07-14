import { useReducer } from 'react';
import { CalendarContext, initialState } from './CalendarContext';
import CalendarReducer from './CalendarReducers';

const CollaboratorState = (props: any) => {
    const [state, dispatch] = useReducer(CalendarReducer, initialState);

    return (
        <CalendarContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CalendarContext.Provider>
    )
}

export default CollaboratorState;