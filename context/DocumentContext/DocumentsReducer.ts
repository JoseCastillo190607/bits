import {Types} from './DocumentsContext'

const ModalReducer = (state:any, action:any) => {
    const {payload, type} = action;
    switch(type){
        case Types.UPDATE_DOCUMENTS:
            return {
                ...state,
                _id:payload._id,
                updateModal:true
            }
        case Types.CREATE_DOCUMENTS:
            return {
                ...state,
                createModal:true
            }
        case Types.DELETE_DOCUMENTS:
            return{
                ...state,
                _id:payload._id,
                deleteModal:true
            }
        case Types.CLEAR_DOCUMENTS:
            return {
                ...state,
                _id:'',
                Documento:payload.Documento,
                createModal:payload.createModal,
                updateModal:payload.updateModal,
                deleteModal:payload.deleteModal

            }
        case Types.UPDATE_DOCUMENTS_DOCUMENT:
            return{
                ...state,
                Documento:payload.Documento
            }

        default:
            return state;
    }
}

export default ModalReducer;