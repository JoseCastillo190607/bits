import { useReducer } from "react";
import AdministratorsContext, {initialState} from "./AdministratorsContext";
import AdministratorsReducer from "./AdministratorsReducer"

const AdministratorsState =(props:any) =>{
  const [state, dispatch] = useReducer(AdministratorsReducer, initialState)
  return(
    <AdministratorsContext.Provider value={{state, dispatch}}>
      {props.children}
    </AdministratorsContext.Provider>
  )
}

export default AdministratorsState