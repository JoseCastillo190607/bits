import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";

const serverError = "Ocurrio un error con el servidor.";

export const getISNMensual = async () => {
    try {
        const tableISN = await axios.get(`/PeriodicISN/mensual`);
        return tableISN.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getISNSemanal = async () => {
    try {
        const tableISN = await axios.get(`/PeriodicISN/semanal`);
        return tableISN.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getISNCatorcenal = async () => {
    try {
        const tableISN = await axios.get(`/PeriodicISN/catorcenal`);
        return tableISN.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getISNQuincenal = async () => {
    try {
        const tableISN = await axios.get(`/PeriodicISN/quincenal`);
        return tableISN.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};
