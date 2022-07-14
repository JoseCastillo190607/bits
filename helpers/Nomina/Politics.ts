import {ChangeEvent, Dispatch} from "react"
import { PoliticModalTypes } from "../../context/ConfigPayrollContext/PoliticModalTypes";


export const updatePolitic = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean): Promise<void> => {
    state[Nombre]= Value
    
    updatePolitics(state.Politics, dispatch)
}

const updatePolitics = (Politics: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PoliticModalTypes.UPDATE_POLITICS,
        payload:{
            Politics
        }
    })
}

export { updatePolitics};