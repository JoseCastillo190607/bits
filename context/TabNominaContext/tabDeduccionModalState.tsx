import { useReducer } from "react";
import DeduccionContext from '../../context/DeduccionContext/DeduccionContext';
import TabDeduccionContext from "../../context/TabNominaContext/TabDeduccionModalReducer";

const TabDeduccionModalState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(TabDeduccionContext, initialState);

    return (
        <DeduccionContext.Provider value={{state, dispatch}}>
            {props.children}
        </DeduccionContext.Provider>
    )

};

export default TabDeduccionModalState;