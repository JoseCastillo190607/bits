import { useReducer } from 'react';
import TablesValueContext, { initialState } from './TablesValueContext';
import TablesValueReducer from './TablesValueReducer';

const TablesValueState = (props: any) => {
    const [state, dispatch] = useReducer(TablesValueReducer, initialState);

    return (
        <TablesValueContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TablesValueContext.Provider>
    )
}

export default TablesValueState;