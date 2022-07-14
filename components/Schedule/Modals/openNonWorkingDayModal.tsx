import { Dispatch } from "react"

import { NonWorkingDayTypes } from "../../../context/ScheduleContext/NonWorkingDayTypes";

export const openNonWorkingDayModal = ({ 
        _id = '',
        name = '' , 
        initDate = '', 
        endDate = ''
}: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: NonWorkingDayTypes.OPEN_NONWORKINGDAY_MODAL,
        payload: {
            _id,
            name,
            initDate,
            endDate
        }
    });
}

export const deleteNonWorkingDayModal = ({ _id, value }: any, dispatch: Dispatch<any>): void =>{
    dispatch({
        type: NonWorkingDayTypes.CLOSE_NONWORKINGDAY_MODAL
    });
};

export const closeNonWorkingDayModal = (dispatch: Dispatch<any>): void =>{
    dispatch({
        type: NonWorkingDayTypes.CLOSE_NONWORKINGDAY_MODAL 
    })
}