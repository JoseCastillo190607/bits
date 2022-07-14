import { useReducer } from 'react';
import PoliticContext from './PoliticContext';
import PoliticReducer from './PoliticReducer';

const PoliticState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(PoliticReducer, initialState);

    return (
        <PoliticContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PoliticContext.Provider>
    )
}

export default PoliticState;