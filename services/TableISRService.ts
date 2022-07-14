import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";

const serverError = "Ocurrio un error con el servidor.";

export const getISRMensual = async () => {
    try {
        const tableISR = await axios.get(`/PeriodicISR/mensual`);
        return tableISR.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getISRSemanal = async () => {
    try {
        const tableISR = await axios.get(`/PeriodicISR/semanal`);
        return tableISR.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getISRCatorcenal = async () => {
    try {
        const tableISR = await axios.get(`/PeriodicISR/catorcenal`);
        return tableISR.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getISRQuincenal = async () => {
    try {
        const tableISR = await axios.get(`/PeriodicISR/quincenal`);
        return tableISR.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};
