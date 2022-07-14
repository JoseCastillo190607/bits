import {Types} from './CalendarsContext'

const ModalReducer = (state:any, action:any) => {
    const {payload, type} = action;
    switch(type){
        case Types.UPDATE_CALENDARS:
            return {
                ...state,
                _id:payload._id,
                updateModal:true
            }
        case Types.CREATE_CALENDARS:
            return {
                ...state,
                createModal:true
            }
        case Types.DELETE_CALENDARS:
            return{
                ...state,
                _id:payload._id,
                deleteModal:true
            }
        case Types.CREATE_EVENT:
            return{
                ...state,
                createEventModal:true
            }
        case Types.CREATE_INCIDENT:
            
            return{
                ...state,
                _id:payload._id,
                createIncidentModal:true
            }
        case Types.CLEAR_CALENDARS:
            return {
                ...state,
                _id:'',
                createModal:payload.createModal,
                updateModal:payload.updateModal,
                deleteModal:payload.deleteModal,
                createEventModal:payload.createEventModal,
                createIncidentModal:payload.createIncidentModal
            }
            case Types.CREATE_NONWORKINGDAY:
                //console.log('non reduce',payload._id)
                return{
                    ...state,
                    _id:payload._id,
                    createNonWorkingDayModal:true
                }
            case Types.CLEAR_NONWORKINGDAY:
                return{
                    ...state,
                    createNonWorkingDayModal:false
                }
            case Types.DELETE_NONWORKINGDAY:
                return{
                    ...state,
                    _id:payload._id,
                    deleteNonWorkingDayModal:true
                }
            case Types.CLEAR_DELETE_NONWORKINGDAY:
                return{
                    ...state,
                    _id:payload._id,
                    deleteNonWorkingDayModal:false
                }
            case Types.CREATE_EDITEVENT:
                //console.log('non reduce',payload._id)
                return{
                    ...state,
                    _id:payload._id,
                    createEditEventModal:true
                }
            case Types.DELETE_EDITEVENT:
                return{
                    ...state,
                    _id:payload._id,
                    deleteEditEventModal:true
                }
            case Types.CLEAR_EDITEVENT:
                return{
                    ...state,
                    _id:payload._id,
                    createEditEventModal:false
                }
            case Types.CLEAR_DELETE_EDITEVENT:
                return{
                    ...state,
                    _id:payload._id,
                    deleteEditEventModal:false
                }
            default:
            return state;
    }
}

export default ModalReducer;