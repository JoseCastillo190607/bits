import { useReducer } from 'react';
import PayrollReducer from './PayrollReducer';
import PayrollContext from './PayrollContext';


const PayrollState = (props: any) => {
    
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(PayrollReducer, initialState);

    return (
        <PayrollContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PayrollContext.Provider>
    )
}

export default PayrollState;