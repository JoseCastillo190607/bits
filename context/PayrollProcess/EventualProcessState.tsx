import { useReducer } from "react";
import EventualPayrollProcessContext, {initialState} from "./EventualPayrollProcessContext";
import EventualPayrollReducer from "./EventualProcessReducer"

const SettlementProcessState =(props:any) =>{
  const [state, dispatch] = useReducer(EventualPayrollReducer, initialState)
  return(
    <EventualPayrollProcessContext.Provider value={{state, dispatch}}>
      {props.children}
    </EventualPayrollProcessContext.Provider>
  )
}

export default SettlementProcessState