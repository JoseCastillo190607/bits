import {useReducer} from 'react'
import EmpresaContext, {initialState}  from './EmpresaContext'
import  EmpresaReducer  from './EmpresaReducer'

const EmpresaState = (props:any) => {
  const [state, dispatch] = useReducer(EmpresaReducer, initialState)
  return(
    <EmpresaContext.Provider value={{state, dispatch}}>
      {props.children}
    </EmpresaContext.Provider>
  )
}

export default EmpresaState