import {useReducer} from 'react'
import NominaContext,{initialState} from './NominaContext'
import NominaReducer from './NominaReducer'

const NominaState = (props: any) =>{
    const [state, dispatch] = useReducer(NominaReducer, initialState)
    return( 
        <NominaContext.Provider value={{state, dispatch}}>
            {props.children}
        </NominaContext.Provider>
    )
}


export default NominaState