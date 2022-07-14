import {Types} from './NonWorkingDayContext'

const ModalReducer = (state:any, action:any) => {
    const {payload, type} = action;
    switch(type){
        case Types.UPDATE_NON_WORKINGDAY:
            return {
                ...state,
                _id:payload._id,
                updateModal:true
            }
        case Types.CREATE_NON_WORKINGDAY:
            return {
                ...state,
                createModal:true
            }
        case Types.DELETE_NON_WORKINGDAY:
            return{
                ...state,
                _id:payload._id,
                deleteModal:true
            }
        default:
            return state;
    }
}

export default ModalReducer;