import { useReducer } from 'react';
import CollaboratorContext, { initialState } from './CollaboratorContext';
import CollaboratorReducer from './CollaboratorReducer';

const CollaboratorState = (props: any) => {
    const [state, dispatch] = useReducer(CollaboratorReducer, initialState);

    return (
        <CollaboratorContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CollaboratorContext.Provider>
    )
}

export default CollaboratorState;