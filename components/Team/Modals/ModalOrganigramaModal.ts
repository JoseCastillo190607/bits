import { Dispatch } from "react"

import { OrganigramaModalTypes } from "../../../context/OrganigramaContext/OrganigramaModalTypes";

export const openOrganigramaModal = ({ _id = '', NombrePuesto = '' , AreaProyecto = '', PuestoSuperior = '', Descripcion = false, showInformacion = false, showEliminar = false, showEdit = false, showAgregaPersona= false, open=false}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: OrganigramaModalTypes.OPEN_ORGANIGRAMA_MODAL,
        payload: {
            _id,
            NombrePuesto,
            AreaProyecto,
            PuestoSuperior,
            Descripcion,
            showInformacion,
            showEliminar,
            showEdit,
            showAgregaPersona,
            open
        }
    });
}

export const deleteOrganigramaModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: OrganigramaModalTypes.CLOSE_ORGANIGRAMA_MODAL
    });
};

export const closeOrganigramaModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: OrganigramaModalTypes.CLOSE_ORGANIGRAMA_MODAL 
    })
}