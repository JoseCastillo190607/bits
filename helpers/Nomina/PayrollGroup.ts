import { Console } from "console"
import {ChangeEvent, Dispatch} from "react"
import { PayrollGroupModalTypes } from "../../context/ConfigPayrollContext/PayrollGroupModalTypes"

export const updatePayrollGroup = async  (e: ChangeEvent<{ name: string, value: unknown }>, state: any, dispatch: Dispatch<any>, Nombre: string, Value: boolean): Promise<void> => {
    state[Nombre]= Value
    
    updatePayrollGroups(state.PayrollGroups, dispatch)
}

const updatePayrollGroups = (PayrollGroups: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PayrollGroupModalTypes.UPDATE_PAYROLLGROUPS,
        payload:{
            PayrollGroups
        }
    })
}

export { updatePayrollGroups};