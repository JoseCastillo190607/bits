import { PoliticModalTypes } from './PoliticModalTypes';
import {initialState} from './PoliticContext'

const PoliticModalReducer = (state: any, action: any) =>{
    const { payload, type } = action;
    switch (type) {
        case PoliticModalTypes.OPEN_POLITIC_MODAL:
            return {
                ...state,
                open: payload.open,
                _id: payload._id,
                value: payload.value,
                client: payload.client,
                title: payload.title,
                showEdit: payload.showEdit,
                showEliminar: payload.showEliminar,
                PolicyName: payload.PolicyName,
                EconomicDays: payload.EconomicDays,
                AnniversaryVacationPremium: payload.AnniversaryVacationPremium,
                PantryValueType: payload.PantryValueType,
                PantryValueCap: payload.PantryValueCap,
                PantryValue: payload. PantryValue,
                SavingsFundType: payload.SavingsFundType,
                SavingsFundCap: payload.SavingsFundCap,
                SavingsFund: payload. SavingsFund,
                RestaurantValue: payload. RestaurantValue,
                RestaurantValueType: payload. RestaurantValueType,
                RestaurantValueCap: payload. RestaurantValueCap,
                AbsenceDiscount: payload. AbsenceDiscount,
                DisabilityDiscount: payload. DisabilityDiscount,
                VoucherCost: payload. VoucherCost,
                DiscountDay: payload. DiscountDay,
                SeniorityDate: payload. SeniorityDate,
                ContractStartDate: payload. ContractStartDate,

            }
        case PoliticModalTypes.CLOSE_POLITIC_MODAL:
            return initialState;
        case PoliticModalTypes.REACTIVE_POLITIC_COL:
            return {
                ...state,
                _id: payload
            }
        case PoliticModalTypes.UPDATE_POLITICS:
            return {
                ...state,
                [payload.key]: payload.value,
            }
        default:
            return state;
    }
}

export default PoliticModalReducer;