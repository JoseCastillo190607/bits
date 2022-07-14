import { useReducer } from "react";
import SettlementPayrollProcessContext, {initialState} from "./SettlementPayrollProcessContext";
import SettlementPayrollReducer from "./SettlementProcessReducer"

const SettlementProcessState =(props:any) =>{
  const [state, dispatch] = useReducer(SettlementPayrollReducer, initialState)
  return(
    <SettlementPayrollProcessContext.Provider value={{state, dispatch}}>
      {props.children}
    </SettlementPayrollProcessContext.Provider>
  )
}

export default SettlementProcessState