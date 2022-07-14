import { Dispatch} from "react";
import { getPuestos } from "../services/PuestoService";
import { Puesto, TabPuestoTypes } from '../interfaces/TabPuesto.interfaces';

export const startPuestos = async (dispatch: Dispatch<any>, puestos: string) => {
    const Puestos = await getPuestos();
    let ArrayFiltrado = Puestos.data.filter((r:any) => puestos.includes(r.puestos))
    dispatch(setPuestos(ArrayFiltrado));
};

export const setPuestos: any = (Puestos: Puesto[]) => ({
    type: TabPuestoTypes.init,
    payload: Puestos
});

export const setPuesto = (Puesto: Puesto) => ({
    type: TabPuestoTypes.setPuesto,
    payload: Puesto
});

export const cleanPuesto = () => ({
    type: TabPuestoTypes.cleanPuesto
});

export const filterPuestos = (Puestos: Puesto[]) => ({
    type: TabPuestoTypes.filter,
    payload: Puestos
});

export const substractPuesto = (id: string) => ({
    type: TabPuestoTypes.substract,
    payload: id
});


export const addNewPuesto = (Puesto: Puesto) => ({
    type: TabPuestoTypes.add,
    payload: Puesto
});