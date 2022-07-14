import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { PerceptionModal } from '../interfaces/TabPerceptions.interfaces';

const serverError = "Ocurrio un error con el servidor.";

export const getPerceptions = async () => {
    let Perception = await axios.get(`/Perceptions`);
    return Perception.data.data || [];
};

export const addPerception = async (Perception: PerceptionModal) => {
    const res = await axios.post(`/perceptions`, Perception)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const editPerception = async (Perception: PerceptionModal, _id: string) => {
    
    const res = await axios.put(`/perceptions/?idPercepcion=${_id}`, Perception)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactivePerception = async (_id: string) => {
    const result = await axios.delete(`/perceptions/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};

