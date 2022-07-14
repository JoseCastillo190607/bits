import { Dispatch } from "react"

import { PoliticModalTypes } from "../../../context/ConfigPayrollContext/PoliticModalTypes";

export const openPoliticModal = ({ 
        _id = '',
        PolicyName= '',
        EconomicDays= 0,
        AnniversaryVacationPremium= '',
        PantryValueType= '',
        PantryValueCap= '',
        PantryValue= '',
        SavingsFundType= '',
        SavingsFundCap= '',
        SavingsFund= '',
        RestaurantValue= '',
        RestaurantValueType= '',
        RestaurantValueCap= '',
        AbsenceDiscount= false,
        DisabilityDiscount= '',
        VoucherCost= '',
        DiscountDay= '',
        SeniorityDate= '',
        ContractStartDate= '',
        showEliminar = false, 
        showEdit = false
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PoliticModalTypes.OPEN_POLITIC_MODAL,
        payload: {
            _id,
            PolicyName,
            EconomicDays,
            AnniversaryVacationPremium,
            PantryValueType,
            PantryValueCap,
            PantryValue,
            SavingsFundType,
            SavingsFundCap,
            SavingsFund,
            RestaurantValue,
            RestaurantValueType,
            RestaurantValueCap,
            AbsenceDiscount,
            DisabilityDiscount,
            VoucherCost,
            DiscountDay,
            SeniorityDate,
            ContractStartDate,
            showEliminar,
            showEdit,
        }
    });
}

export const deletePoliticModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PoliticModalTypes.CLOSE_POLITIC_MODAL
    });
};

export const closePoliticModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: PoliticModalTypes.CLOSE_POLITIC_MODAL 
    })
}