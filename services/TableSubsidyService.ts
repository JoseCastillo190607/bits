import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";

const serverError = "Ocurrio un error con el servidor.";

export const getSubsidyMensual = async () => {
    try {
        const tableSubsidy = await axios.get(`/PeriodicSubsidy/mensual`);
        return tableSubsidy.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getSubsidySemanal = async () => {
    try {
        const tableSubsidy = await axios.get(`/PeriodicSubsidy/semanal`);
        return tableSubsidy.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getSubsidyCatorcenal = async () => {
    try {
        const tableSubsidy = await axios.get(`/PeriodicSubsidy/catorcenal`);
        return tableSubsidy.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getSubsidyQuincenal = async () => {
    try {
        const tableSubsidy = await axios.get(`/PeriodicSubsidy/quincenal`);
        return tableSubsidy.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};
