import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { SuccessfulAlert } from "../alerts/successAlerts";


export const getAllCompany = async () => {
    try {
        const company = await axios.get(`/company`);
        return company.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};