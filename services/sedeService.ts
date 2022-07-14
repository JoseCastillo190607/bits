import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";
import { ISede } from "../interfaces/Sede";

export const getAllSedes = async (): Promise<Array<ISede>> => {
    try {
        const request = await axios.get(`/sedes`);
        return request.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const postSede = async (sede: string): Promise<any> => {
    try {
        await axios.post(`/sedes`, { sede });
        return SuccessfulAlert({ text: "La sede se ha agregado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const putSede = async (_id: string, sede: string): Promise<any> => {
    try {
        await axios.put(`/sedes`, { _id, sede });
        return SuccessfulAlert({ text: "La sede se ha actualizado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const deleteSede = async (_id: string): Promise<any> => {
    try {
        const response = await axios.delete(`/sedes/${_id}`);
        if (response.status === 201) {
            return ErrorAlert({ text: "La sede tiene usuarios ligados." });
        } else return SuccessfulAlert({ text: "La sede se ha eliminado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};