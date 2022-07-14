import { useReducer } from 'react';
import PayrollGroupContext from './PayrollGroupContext';
import PayrollGroupReducer from './PayrollGroupReducer';

const PayrollGroupState = (props: any) => {
    
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(PayrollGroupReducer, initialState);

    return (
        <PayrollGroupContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PayrollGroupContext.Provider>
    )
}

export default PayrollGroupState;