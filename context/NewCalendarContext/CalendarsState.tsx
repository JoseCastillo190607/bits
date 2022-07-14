import {useReducer} from 'react';
import CalendarsContext, {initialState} from "./CalendarsContext";
import CalendarsReducer from './CalendarsReducer';

const CalendarsState = (props:any) => {
    const [state,dispatch] = useReducer(CalendarsReducer, initialState)
    return (
        <CalendarsContext.Provider value={{state,dispatch}}>
                  {props.children}
        </CalendarsContext.Provider>
    )
}

export default CalendarsState;