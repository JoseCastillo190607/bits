import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";

const serverError = "Ocurrio un error con el servidor.";

export const getTablesValue = async () => {
    try {
        const tableValue = await axios.get(`/ReferenceValue/`);
        return tableValue.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};
