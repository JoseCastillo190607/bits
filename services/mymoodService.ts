import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
const serverError = "Ocurrio un error con el servidor.";

export const getMyMood = async () => {
    try {
        let result = await axios.get(`/mymood`);
        return result.data.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
};

export const getMyMoodToday = async () => {
    try {
        let result = await axios.get(`/mymood/currentStates`);
        return result.data.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
};

export const getMyMoodProjects = async (type: string = 'all,') => {
    try {
        let result = await axios.get(`/mymood/projects/${type}`);
        return result.data;
    } catch {
        return ErrorAlert({ text: serverError });
    }
};
