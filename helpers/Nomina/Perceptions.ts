import {ChangeEvent, Dispatch} from "react"
import { PerceptionModalTypes } from "../../context/ConfigPayrollContext/PerceptionModalTypes";


export const updatePerception = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean): Promise<void> => {
    state[Nombre]= Value
    
    updatePerceptions(state.Perceptions, dispatch)
}

const updatePerceptions = (Perceptions: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PerceptionModalTypes.UPDATE_PERCEPTIONS,
        payload:{
            Perceptions
        }
    })
}

export { updatePerceptions};