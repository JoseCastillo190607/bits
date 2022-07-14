import { useReducer } from "react";
import IncidenciasContext, {initialState} from "./IncidenciasContext";
import IncidenciasReducer from "./IncidenciasReducer"

const IncidenciasState =(props:any) =>{
  const [state, dispatch] = useReducer(IncidenciasReducer, initialState)
  return(
    <IncidenciasContext.Provider value={{state, dispatch}}>
      {props.children}
    </IncidenciasContext.Provider>
  )
}

export default IncidenciasState