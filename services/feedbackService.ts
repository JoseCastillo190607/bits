import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";

export const getFeedback = async () => {
    try {
        let feedback = await axios.get(`/feedback`);
        return feedback.data.data;
    } catch {
        return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    }
};