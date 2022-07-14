import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";

export const getInactiveCollaborators = async () => {
    try {
        let collaborators = await axios.get(`/inactive`);
        return collaborators.data.data;
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    }
};

export const putInactiveCollaborator = async (_id: string, date: string) => {
    try {
        const result = await axios.put(`/inactive/active/${_id}`, { FechaIngreso: date });
        if(result.data.data){
            return SuccessfulAlert({ text: "El colaborador se ha reactivado exitosamente." });
        }else return ErrorAlert({ text: "La fecha debe se mayor o igual a la fecha actual." });
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    }
}