import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { DeduccionModal } from '../interfaces/TabDeduccion.interfaces';

const serverError = "Ocurrio un error con el servidor.";


export const getDeducciones = async () => {
    let Deduccion = await axios.get(`/Deductions`);
    return Deduccion.data.data || [];
};

export const addDeducciones = async (Deduccion: DeduccionModal) => {
    const res = await axios.post(`/Deductions`, Deduccion)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const editDeduccion = async (Deduccion: DeduccionModal, _id: string) => {
    const res = await axios.put(`/Deductions/?idDeduccion=${_id}`, Deduccion)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactiveDeduccion = async (_id: string) => {
    const result = await axios.delete(`/Deductions/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};

