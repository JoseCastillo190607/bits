import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import ColumnaCorreo from "./ColumnaCorreo"
import ColumnaPermisos from "./ColumnaPermisos"
import  AdminPermisosContext  from "../../../context/AdminContext/AdminPermisosContext/AdminPermisosContext";
import { getPermisosAdmin } from '../../../services/auth/authService';
import { updateAdminPermisos } from "../../../helpers/Administradores/Administradores";
import LoadingPrueba from "./LoaginPrueba";

import {Box, Button, Grid} from '@material-ui/core'
import '../../../styles/AdministratorPermissions/Styles.css'
import { postPermisos } from "../../../services/adminService"

const AdminPermisos = (props: any) =>{
    const params = useParams<any>();
    const {state, dispatch} = useContext(AdminPermisosContext)
    const history = useHistory();
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
      async function fetchData(){
        let result: any = {new: true};
        if(params.id !=='id' && params.id !== 'new' &&!('register' in params)){
          result = await getPermisosAdmin(params.id)
        }
        await updateAdminPermisos(result, dispatch)
        setLoading(false);
      }
      
      return() =>{
        fetchData();
        updateAdminPermisos({}, dispatch)
      }
      
    },[dispatch, params, history])

    
    
    const updatePermisos = async () =>{
      let result = await postPermisos(params.id,state.Permisos)
    }

    
    return(
      <>
      { (loading === true)?
        <LoadingPrueba />
        :
        <Box display="flex" flexDirection="column" p={2}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          className='contenedor_Principal'>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              className='contenedor_Principal'>                        
                <Grid item xs={5}>
                  <ColumnaCorreo back={props.back}/>
                </Grid>
                <Grid item xs={7}>
                  <ColumnaPermisos />
                  <Box className="ContenedorBoton">
                    <Button onClick={updatePermisos} className="buttonSave correoButton botonGuardaPermisos" >
                      Guardar Permisos
                   </Button>
                  </Box>       
                </Grid>         
            </Box>
        </Box>
      </Box>
      }
  </>
    )
}

export default AdminPermisos;