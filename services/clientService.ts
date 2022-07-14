import axios from "axios";
import { server } from '../global/server';
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";
import { IClient } from "../interfaces/Client";

export const getAllClients = async (): Promise<Array<IClient>> => {
    try {
        const request = await axios.get(`/clients`);
        return request.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    };
};

export const postClient = async (client: string): Promise<any> => {
    try {
        await axios.post(`/clients`, { client });
        return SuccessfulAlert({ text: "El cliente se ha agregado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const putClient = async (_id: string, client: string): Promise<any> => {
    try {
        await axios.put(`/clients`, { _id, client });
        return SuccessfulAlert({ text: "El cliente se ha actualizado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const deleteClient = async (_id: string): Promise<any> => {
    try {
        const response = await axios.delete(`${server}/clients/${_id}`);
        if (response.status === 201) {
            return ErrorAlert({ text: "El cliente tiene usuarios o proyectos ligados." });
        } else return SuccessfulAlert({ text: "El cliente se ha eliminado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};