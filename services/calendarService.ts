import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";
import { StateCalendarModalForm } from '../interfaces/Calendar.interfaces';

const serverError = "Ocurrio un error con el servidor.";

export const getCalendar = async () => {
    let dates = await axios.get(`/calendar`)
        .then(res => res.data.data)
        .catch(() => ErrorAlert({ text: serverError }));

    if (dates.error) return ErrorAlert({ text: dates.error });

    return dates;
};

export const addDate = async (data: StateCalendarModalForm) => {
    try {
        delete data._id;
        await axios.post(`/calendar`, data);
        return SuccessfulAlert({ text: "Evento creado correctamente." });
    } catch {
        return ErrorAlert({ text: serverError });
    }
};

export const updateDate = async (data: StateCalendarModalForm) => {
    try {
        await axios.put(`/calendar/${data._id}`, data);
        return SuccessfulAlert({ text: "Evento actualizado correctamente." });
    } catch {
        return ErrorAlert({ text: serverError });
    }
};

export const deleteDate = async (id: string) => {
    try {
        await axios.delete(`/calendar/${id}`);
        return SuccessfulAlert({ text: "Fecha eliminada correctamente." });
    } catch {
        return ErrorAlert({ text: serverError });
    }
}

export const getDatesByBirthday = async () => {
    try {
        let result = await axios.get(`/calendar/itsmybirthday`);
        return result.data.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
}