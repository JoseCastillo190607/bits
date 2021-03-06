import { useReducer } from "react";
import OrganigramaContext from './OrganigramaContext'
import OrganigramaModalReducer from "./OrganigramaModalReducer";


const OrganigramaModalState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }
    
    const [state, dispatch] = useReducer(OrganigramaModalReducer, initialState);

    console.log("OrganigramaModalState", {state, dispatch})
    return (
        <OrganigramaContext.Provider value={{state, dispatch}}>
         
            {props.children}
        </OrganigramaContext.Provider>
    )

};

export default OrganigramaModalState; 