import {useReducer} from 'react';
import NonWorkingDayContext, {initialState} from "./NonWorkingDayContext";
import NonWorkingDayReducer from './NonWorkingDayReducer';

const NonWorkingDayState = (props:any) => {
    const [state,dispatch] = useReducer(NonWorkingDayReducer, initialState)
    return (
        <NonWorkingDayContext.Provider value={{state,dispatch}}>
            {props.children}
        </NonWorkingDayContext.Provider>
    )
}

export default NonWorkingDayState;