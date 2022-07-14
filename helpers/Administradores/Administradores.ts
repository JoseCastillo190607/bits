import { Console } from "console"
import {ChangeEvent, Dispatch} from "react"
import {Types} from "../../context/AdminContext/AdminPermisosContext/AdminPermisosContext"



export const updateAdmin = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean, Modulo: string): Promise<void> => {
    switch (Modulo) {
        case 'EstructuraEquipo':
            state.Permisos.Permisos.Modulos[Nombre]= Value
            break;
        case 'Colaboradores':
            state.Permisos.Permisos.Modulos[Nombre]= Value
            break;
        case 'MyMood':
            state.Permisos.Permisos.Modulos[Nombre]= Value
            break;
        case 'Notificaciones':
            state.Permisos.Permisos.Modulos[Nombre]= Value
        break;
        case 'Noticias':
            state.Permisos.Permisos.Modulos[Nombre]= Value
        break;
        case 'Calendario':
            state.Permisos.Permisos.Modulos[Nombre]= Value
        break;
        case 'Feedback':
            state.Permisos.Permisos.Modulos[Nombre]= Value
        break;
    }
    updateAdminPermisos(state.Permisos, dispatch)
}

const updateAdminPermisos = (Permisos: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: Types.UPDATE_PERMISOS,
        payload:{
            Permisos
        }
    })
}

export { updateAdminPermisos};