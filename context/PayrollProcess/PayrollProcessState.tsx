import { useReducer } from "react";
import PayrollProcessContext, {initialState} from "./PayrollProcessContext";
import PayrollReducer from "./PayrollProcessReducer"

const PayrollProcessState =(props:any) =>{
  const [state, dispatch] = useReducer(PayrollReducer, initialState)
  return(
    <PayrollProcessContext.Provider value={{state, dispatch}}>
      {props.children}
    </PayrollProcessContext.Provider>
  )
}

export default PayrollProcessState