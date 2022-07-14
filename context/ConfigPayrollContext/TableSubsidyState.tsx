import { useReducer } from 'react';
import TableSubsidyContext, { initialState } from './TableSubsidyContext';
import TableSubsidyReducer from './TableSubsidyReducer';

const TablesValueState = (props: any) => {
    const [state, dispatch] = useReducer(TableSubsidyReducer, initialState);

    return (
        <TableSubsidyContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TableSubsidyContext.Provider>
    )
}

export default TablesValueState;