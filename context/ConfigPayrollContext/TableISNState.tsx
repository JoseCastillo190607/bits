import { useReducer } from 'react';
import TableISNContext, { initialState } from './TableISNContext';
import TableISNReducer from './TableISNReducer';

const TablesValueState = (props: any) => {
    const [state, dispatch] = useReducer(TableISNReducer, initialState);

    return (
        <TableISNContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TableISNContext.Provider>
    )
}

export default TablesValueState;