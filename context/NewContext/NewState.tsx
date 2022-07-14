import { useReducer } from 'react';
import { NewsContext, initialState } from './NewContext';
import CalendarReducer from './NewReducer';

const CollaboratorState = (props: any) => {
    const [state, dispatch] = useReducer(CalendarReducer, initialState);
    return (
        <NewsContext.Provider value={{ state, dispatch }}>
            {props.children}
        </NewsContext.Provider>
    )
}

export default CollaboratorState;