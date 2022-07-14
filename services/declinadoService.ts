import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";

export const getAllDeclinados = async () => {
    try {
        let declined = await axios.get(`/declined`);
        return declined.data.data;
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    }

};