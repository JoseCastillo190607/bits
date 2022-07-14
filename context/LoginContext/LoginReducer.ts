import {Types} from './LoginContext'

const ModalReducer = (state:any, action:any) => {
    const {payload, type} = action;
    switch(type){
        case Types.CREATE_MESSAGELOGIN:
            return {
                ...state,
                _id:payload._id,
                createMessageLogin:true
            }
        case Types.CLEAR_MESSAGELOGIN:
            return {
                ...state,
                _id:payload._id,
                createMessageLogin:false
            }

        default:
            return state;
    }
}

export default ModalReducer;