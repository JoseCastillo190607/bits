import {ChangeEvent, Dispatch} from "react"
import { OrganigramaModalTypes } from "../../context/OrganigramaContext/OrganigramaModalTypes";


export const updatePuesto = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean): Promise<void> => {
    state[Nombre]= Value
    
    updatePuestos(state.Perceptions, dispatch)
}

const updatePuestos = (Perceptions: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: OrganigramaModalTypes.UPDATE_PUESTOS,
        payload:{
            Perceptions
        }
    })
}

export { updatePuestos};