import { useReducer } from 'react';
import TableISRContext, { initialState } from './TableISRContext';
import TableISRReducer from './TableISRReducer';

const TablesValueState = (props: any) => {
    const [state, dispatch] = useReducer(TableISRReducer, initialState);

    return (
        <TableISRContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TableISRContext.Provider>
    )
}

export default TablesValueState;