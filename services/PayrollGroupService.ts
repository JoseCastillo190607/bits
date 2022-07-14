import axios from "axios";
import { ErrorAlert } from "../alerts/errorAlert";
import { PayrollGroupModal } from '../interfaces/TabPayrollGroup.interfaces';

const serverError = "Ocurrio un error con el servidor.";

export const getAllGroupPayroll = async () => {
    try {
        const groupPayroll = await axios.get(`/GroupPayroll/`);
        return groupPayroll.data.data;
    } catch {
        ErrorAlert({ text: "Ocurrio un error con el servidor." });
        return [];
    }
};

export const getGroupPayroll = async () => {
    let payrollGroup = await axios.get(`/GroupPayroll/`);
    return payrollGroup.data.data || [];
};

export const addPayrollGroup = async (PayrollGroup: PayrollGroupModal) => {
    const res = await axios.post(`/GroupPayroll/`, PayrollGroup)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const editPayrollGroup = async (PayrollGroup: PayrollGroupModal, _id: string) => {
    const res = await axios.put(`/GroupPayroll/?idGroupPayroll=${_id}`, PayrollGroup)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (res.error) return ErrorAlert({ text: res.error || serverError });
    return res;
};

export const inactivePayrollGroup = async (_id: string) => {
    const result = await axios.delete(`/GroupPayroll/${_id}`)
        .then(res => res.data)
        .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
    if (result.error) return ErrorAlert({ text: "Ocurrio un error con el servidor." });
    return result;
};
