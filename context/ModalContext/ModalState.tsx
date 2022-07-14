import { useReducer } from 'react';
import TeamContext from './ModalContext';
import ModalReducer from './ModalReducer';

const ModalState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    };

    const [state, dispatch] = useReducer(ModalReducer, initialState);

    return (
        <TeamContext.Provider value={{ state, dispatch }}>
            {props.children}
        </TeamContext.Provider>
    )
}

export default ModalState;