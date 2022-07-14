import { Dispatch} from "react";
import { getDeducciones } from '../services/payrollServices/DeduccionService';
import { Deduccion, TabDeduccionTypes } from '../interfaces/TabDeduccion.interfaces';

export const startDeduccion = async (dispatch: Dispatch<any>, deduccion: string) => {
    const Deduccion = await getDeducciones();
    let ArrayFiltrado = Deduccion.data.filter((r:any) => deduccion.includes(r.deduccion))
    dispatch(setDeduccion(ArrayFiltrado));
};

export const setDeducciones: any = (Deduccion: Deduccion[]) => ({
    type: TabDeduccionTypes.init,
    payload: Deduccion
});

export const setDeduccion = (Deduccion: Deduccion) => ({
    type: TabDeduccionTypes.setDeduccion,
    payload: Deduccion
});

export const cleanDeduccion = () => ({
    type: TabDeduccionTypes.cleanDeduccion
});

export const filterDeduccion = (Deduccion: Deduccion[]) => ({
    type: TabDeduccionTypes.filter,
    payload: Deduccion
});

export const substractDeduccion = (id: string) => ({
    type: TabDeduccionTypes.substract,
    payload: id
});


export const addNewDeduccion = (Deduccion: Deduccion) => ({
    type: TabDeduccionTypes.add,
    payload: Deduccion
});