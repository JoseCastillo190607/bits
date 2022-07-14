import {useReducer} from 'react'
import AdminPermisosContext,{initialState} from './AdminPermisosContext'
import AdminPermisosReducer from './AdminPermisosReducer'

const AdminPermisosState = (props: any) =>{
    const [state, dispatch] = useReducer(AdminPermisosReducer, initialState)
    return( 
        <AdminPermisosContext.Provider value={{state, dispatch}}>
            {props.children}
        </AdminPermisosContext.Provider>
    )
}

export default AdminPermisosState