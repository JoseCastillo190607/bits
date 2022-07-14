import { Console } from "console"
import {ChangeEvent, Dispatch} from "react"
import { Types } from "../../context/PayrollContext/NominaContext"

export const updateEstadoPayroll = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean, Modulo: string): Promise<void> => {

    updateEstadoNomina(state, dispatch)
}

const updateEstadoNomina = (Permisos: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: Types.UPDATE_STATE,
        payload:{
            Permisos
        }
    })
}

export { updateEstadoNomina};