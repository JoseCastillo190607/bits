import { Dispatch} from "react";
import { getGroupPayroll } from "../services/PayrollGroupService";
import { PayrollGroup, TabPayrollGroupTypes } from '../interfaces/TabPayrollGroup.interfaces';

export const startPayrollGroup = async (dispatch: Dispatch<any>, payrollgroup: string) => {
    const PayrollGroup = await getGroupPayroll();
    let ArrayFiltrado = PayrollGroup.data.filter((r:any) => payrollgroup.includes(r.payrollgroup))
    dispatch(setPayrollGroup(ArrayFiltrado));
};

export const setPayrollGroups: any = (PayrollGroup: PayrollGroup[]) => ({
    type: TabPayrollGroupTypes.init,
    payload: PayrollGroup
});

export const setPayrollGroup = (PayrollGroup: PayrollGroup) => ({
    type: TabPayrollGroupTypes.setPayrollGroup,
    payload: PayrollGroup
});

export const cleanPayrollGroup = () => ({
    type: TabPayrollGroupTypes.cleanPayrollGroup
});

export const filterPayrollGroup = (PayrollGroup: PayrollGroup[]) => ({
    type: TabPayrollGroupTypes.filter,
    payload: PayrollGroup
});

export const substractPayrollGroup = (id: string) => ({
    type: TabPayrollGroupTypes.substract,
    payload: id
});


export const addNewPayrollGroup = (PayrollGroup: PayrollGroup) => ({
    type: TabPayrollGroupTypes.add,
    payload: PayrollGroup
});