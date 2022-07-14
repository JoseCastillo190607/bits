import {useReducer} from 'react';
import DocumentContext, {initialState} from "./DocumentsContext";
import DocumentReducer from './DocumentsReducer';

const DocumentState = (props:any) => {
    const [state,dispatch] = useReducer(DocumentReducer, initialState)
    return (
        <DocumentContext.Provider value={{state,dispatch}}>
                  {props.children}
        </DocumentContext.Provider>
    )
}

export default DocumentState;