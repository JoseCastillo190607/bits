import { useReducer } from 'react';
import PerceptionContext from './PerceptionContext';
import PerceptionReducer from './PerceptionReducer';

const PerceptionState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(PerceptionReducer, initialState);

    return (
        <PerceptionContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PerceptionContext.Provider>
    )
}

export default PerceptionState;