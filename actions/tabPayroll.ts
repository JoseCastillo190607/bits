import { Dispatch} from "react";
import { getPayroll } from "../services/PayrollService";
import { Payroll, TabPayrollTypes } from '../interfaces/TabPayroll.interfaces';

export const startPayroll = async (dispatch: Dispatch<any>, payroll: string) => {
    const Payroll = await getPayroll();
    let ArrayFiltrado = Payroll.data.filter((r:any) => payroll.includes(r.payroll))
    dispatch(setPayroll(ArrayFiltrado));
};

export const setPayrolls: any = (Payroll: Payroll[]) => ({
    type: TabPayrollTypes.init,
    payload: Payroll
});

export const setPayroll = (Payroll: Payroll) => ({
    type: TabPayrollTypes.setPayroll,
    payload: Payroll
});

export const cleanPayroll = () => ({
    type: TabPayrollTypes.cleanPayroll
});

export const filterPayroll = (Payroll: Payroll[]) => ({
    type: TabPayrollTypes.filter,
    payload: Payroll
});

export const substractPayroll = (id: string) => ({
    type: TabPayrollTypes.substract,
    payload: id
});


export const addNewPayroll = (Payroll: Payroll) => ({
    type: TabPayrollTypes.add,
    payload: Payroll
});