import { useReducer } from 'react';
import SettlementPayrollReducer from './SettlementPayrollReducer';
import SettlementPayrollContext from './SettlementPayrollContext';


const PayrollState = (props: any) => {
    
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(SettlementPayrollReducer, initialState);

    return (
        <SettlementPayrollContext.Provider value={{ state, dispatch }}>
            {props.children}
        </SettlementPayrollContext.Provider>
    )
}

export default PayrollState;