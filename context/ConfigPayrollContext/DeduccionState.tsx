import { useReducer } from 'react';
import DeduccionContext from './DeduccionContext';
import DeduccionReducer from './DeduccionReducer';

const DeduccionState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(DeduccionReducer, initialState);

    return (
        <DeduccionContext.Provider value={{ state, dispatch }}>
            {props.children}
        </DeduccionContext.Provider>
    )
}

export default DeduccionState;