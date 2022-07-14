import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { PoliticModal } from '../interfaces/TabPolitic.interfaces';

const serverError = "Ocurrio un error con el servidor.";

export const getAllPolitic = async () => {
    try {
        const politic = await axios.get(`/Politics/report`);
        return politic.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getPolitic = async () => {
    let politic = await axios.get(`/Politics/`);
    return politic.data.data || [];
};

export const addPolitic = async (Politic: PoliticModal) => {
    const res = await axios.post(`/Politics/`, Politic)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const editPolitic = async (Politic: PoliticModal, _id: string) => {
    const res = await axios.put(`/Politics/?idPolitic=${_id}`, Politic)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactivePolitic = async (_id: string) => {
    const result = await axios.delete(`/Politics/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};
