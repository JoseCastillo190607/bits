import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { PayrollModal } from '../interfaces/TabPayroll.interfaces';

const serverError = "Ocurrio un error con el servidor.";

export const getAllPayroll = async () => {
    try {
        const Payroll = await axios.get(`/Payroll/`);
        return Payroll.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getAllColaborator = async () => {
    try {
        const Payroll = await axios.get(`/PayrollColaborator/`);
        return Payroll.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getPayroll = async () => {
    let payroll = await axios.get(`/Payroll/`);
    return payroll.data.data || [];
};

export const addPayroll = async (Payroll: PayrollModal) => {
    const res = await axios.post(`/Payroll/`, Payroll)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactivePayroll = async (_id: string) => {

    const result = await axios.delete(`/Payroll/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};
