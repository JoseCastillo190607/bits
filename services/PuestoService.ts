import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { PuestoModal } from '../interfaces/TabPuesto.interfaces';

const serverError = "Ocurrio un error con el servidor.";

export const getAllPuestosSuperior = async () => {
    try {
        const puesto = await axios.get(`/puestos/superior`);
        return puesto.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getPuestos = async () => {
    let Puesto = await axios.get(`/puestos/prueba`);
    return Puesto.data.data || [];
};

export const addPuesto = async (Puesto: PuestoModal) => {
    const res = await axios.post(`/puestos`, Puesto)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const editPuesto = async (Puesto: PuestoModal, _id: string) => {
    const res = await axios.put(`/puestos/?idPuesto=${_id}`, Puesto)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactivePuesto = async (_id: string) => {
    const result = await axios.delete(`/puestos/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};



export const getHistorialPuesto = async(id: string) =>{
    const res = await axios.get(`/historial/?_id=${id}`)
    .then(res => res.data.data)
    .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;

}