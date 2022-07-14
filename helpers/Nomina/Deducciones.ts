import { Console } from "console"
import {ChangeEvent, Dispatch} from "react"
import { DeduccionModalTypes } from "../../context/ConfigPayrollContext/DeduccionModalTypes";


export const updateDeduccion = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean): Promise<void> => {
    state[Nombre]= Value
    
    updateDeducciones(state.Perceptions, dispatch);
}

const updateDeducciones = (Deducciones: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: DeduccionModalTypes.UPDATE_DEDUCCION,
        payload:{
            Deducciones
        }
    })
}

export { updateDeducciones};