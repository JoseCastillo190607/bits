import {Types} from "../../context/NewCalendarContext/CalendarsContext";

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
        default:
            return state;
    }
}

export default ModalReducer;