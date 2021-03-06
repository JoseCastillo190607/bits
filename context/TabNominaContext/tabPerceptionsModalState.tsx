import { useReducer } from "react";
import PerceptionContext from '../../context/ConfigPayrollContext/PerceptionContext';
import TabPerceptionsContext from "../../context/TabNominaContext/TabPerceptionsModalReducer";


const TabPerceptionsModalState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(TabPerceptionsContext, initialState);

    return (
        <PerceptionContext.Provider value={{state, dispatch}}>
            {props.children}
        </PerceptionContext.Provider>
    )

};

export default TabPerceptionsModalState;