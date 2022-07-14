import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";

export const getAllProjects = async () => {
    try {
        const projects = await axios.get(`/projects`);
        return projects.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getProjectByClient = async (client: string) => {
    try {
        const projects = await axios.get(`/projects/${client}`);
        return projects.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const postProject = async (NombreProyecto: string, Cliente: string): Promise<any> => {
    try {
        await axios.post(`/projects`, { NombreProyecto, Cliente });
        return SuccessfulAlert({ text: "El proyecto se ha agregado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const putProject = async (_id: string, NombreProyecto: string, Cliente: string): Promise<any> => {
    try {
        await axios.put(`/projects`, { _id, NombreProyecto, Cliente });
        return SuccessfulAlert({ text: "El proyecto se ha actualizado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};

export const deleteProject = async (_id: string): Promise<any> => {
    try {
        const response = await axios.delete(`/projects/${_id}`);
        if (response.status === 201) {
            return ErrorAlert({ text: "EL proyecto tiene usuarios o clientes ligados." });
        } else return SuccessfulAlert({ text: "La sede se ha eliminado exitosamente." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    };
};