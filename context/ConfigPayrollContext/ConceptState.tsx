import { useReducer } from 'react';
import ConceptContext, { initialState } from './ConceptContext';
import ConceptReducer from './ConceptReducer';

const ConceptState = (props: any) => {
    const [state, dispatch] = useReducer(ConceptReducer, initialState);

    return (
        <ConceptContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ConceptContext.Provider>
    )
}

export default ConceptState;