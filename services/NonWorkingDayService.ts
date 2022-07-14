import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { NonWorkingDayModal } from '../interfaces/TabNonWorkingDay.interfaces';

const serverError = "Ocurrio un error con el servidor.";


export const getNonWorkingDay = async () => {
    let NonWorkingDay = await axios.get(`/NonWorkingDay`);
    return NonWorkingDay.data.data || [];
};

export const addNonWorkingDay = async (NonWorkingDay: NonWorkingDayModal) => {
    const res = await axios.post(`/NonWorkingDay`, NonWorkingDay)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const editNonWorkingDay = async (NonWorkingDay: NonWorkingDayModal, _id: string) => {
    const res = await axios.put(`/NonWorkingDay/?idNonWorkingDay=${_id}`, NonWorkingDay)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactiveNonWorkingDay = async (_id: string) => {
    const result = await axios.delete(`/NonWorkingDay/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};
