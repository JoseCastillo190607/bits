import { useContext } from "react";
import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { CollaboratorModal } from '../interfaces/TabCollaborator.interfaces';
import {AdminContext} from '../context/AdminContext/AdminContext'


const serverError = "Ocurrio un error con el servidor.";

export const getCollaborators = async () => {
    let collaborator = await axios.get(`/collaborator/general`);
    return collaborator.data || [];
};

export const addCollaborator = async (collaborator: CollaboratorModal) => {
    const res = await axios.post(`/collaborator/general`, collaborator)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactiveCollaborator = async (data: any, id: string) => {
    const result = await axios.delete(`/collaborator/${id}`, { data: data })
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};