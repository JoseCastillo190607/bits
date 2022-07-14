import react, {useState, useEffect, useContext} from "react";
import { Box, Button, Dialog, DialogContent, Grid, Modal } from "@material-ui/core"
import { getAllAdmins, getAdminProyectos, putAdminProyectos, getAdminEnProyecto, getAdminsDisponibles} from "../../../services/adminService";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { resourceLimits } from "worker_threads";
import '../../../styles/ProjectsStyles/AdminModal.css'
import ProjectContext from "../../../context/ProjectsContext/ProjectsContext";
import { closeProjectModal } from "./ModalProjectModal";

const AdministradoresProyectos = ()=>{
    const {state, dispatch} = useContext(ProjectContext)
    const [cambio, setCambio] = useState(0)
    const [aviso, setAviso] = useState(true)

    const handleClose = async () => {
        await closeProjectModal(dispatch)
    }

    
    function AdminProyect(){

        const [adminsEnProyecto, setadminsEnProyecto] = useState([])

        useEffect(()=>{
            obtenerDatos();
        },[])

        const obtenerDatos = async () =>{
             let adminsEnProyecto = await getAdminEnProyecto(state._id);
            setadminsEnProyecto(adminsEnProyecto.data)
        }
        

        const eliminaAdministrador =  async(idAdministrador: any, idProyectos: any, Proyectos: any) =>{
            let remplazaridProyecto = new RegExp(state._id,"g")
            let remplazarProyecto = new RegExp(state.value,"g")
            let remplazarComas = /,,/g
            let idProyectosActualizados = idProyectos.replace(remplazaridProyecto,'')
            let ProyectosActualizados = Proyectos.replace(remplazarProyecto,'')
            idProyectosActualizados = idProyectosActualizados.replace(remplazarComas,',')
            ProyectosActualizados = ProyectosActualizados.replace(remplazarComas,',')
            let mensaje = `Administrador eliminado de ${state.value}`
            const adminActualizado = await putAdminProyectos(idAdministrador, idProyectosActualizados, ProyectosActualizados, mensaje)
            setCambio(cambio + 1)
        }

        const sidebar = (
            <ul>
                {adminsEnProyecto.map((lis:any)=>
                    <li key={lis._id} className="contenedorLista">
                            <Box  className={(state.title === 'Update')?"listaAdministradores Update":"listaAdministradores Ver"}>
                                <Box>
                                    <img
                                        src={lis.img ? lis.img : '/assets/svg/user-avatar.svg'}
                                        alt="img"
                                        className="imgCollaborator__BITS"
                                    />
                                </Box>
                                <Box>
                                    <p className="textoLista" title={lis.Usuario}>{lis.Nombre}</p>
                                </Box>
                            </Box>
                            {(state.title === 'Update')?
                                <Box>
                                    <img 
                                        src="/assets/svg/icono-eliminar.svg" 
                                        alt="Eliminar" 
                                        className="botonEliminar"
                                        onClick={()=> eliminaAdministrador(lis._id,lis.Proyectos?.idProyectos || 'vacio', lis.Proyectos?.Proyectos || 'vacio')}
                                     />
                                </Box>
                                : null
                            }
                    </li>    
                )}
            </ul>
        );
        return(
            <div>
                {sidebar}
            </div>
        )
    }

    function AdminProyectLibre(){
        const [adminsDisponibles, setAdminsDisponibles] = useState([])

        const agregaAdministrador = async (idAdministrador: any, idProyectos: any, Proyectos: any) =>{
            let mensaje = `Administrador agregado a ${state.value}`
            if (idProyectos === 'vacio'){
                let idProyectoActualizado = state._id
                let ProyectoActualizado = state.value
                const adminActualizado =  await putAdminProyectos(idAdministrador, idProyectoActualizado, ProyectoActualizado, mensaje) 
                setCambio(cambio + 1)
            }else{
                let idProyectoActualizado = (`${state._id},${idProyectos}`)
                let ProyectoActualizado = (`${state.value},${Proyectos}`)
                const adminActualizado =  await putAdminProyectos(idAdministrador, idProyectoActualizado, ProyectoActualizado, mensaje)
                setCambio(cambio + 1)
            }
        }


        useEffect(()=>{
            obtenerDatos();
        },[])


        const obtenerDatos = async () =>{
            let admins = await getAdminsDisponibles(state._id);
            setAdminsDisponibles(admins.data)
       }


        const sidebar = (
            <ul>
                {adminsDisponibles.map((lis:any)=>
                    <li key={lis._id} className="contenedorLista">
                            <Box className="listaAdministradores">
                                <Box>
                                    <img
                                        src={lis.img ? lis.img : '/assets/svg/user-avatar.svg'}
                                        alt="img"
                                        className="imgCollaborator__BITS"
                                    />
                                </Box>
                                <Box>
                                    <p className="textoLista" title={lis.Usuario}>{lis.Nombre}</p>
                                </Box>
                            </Box>
                            <Box>

                                <AddCircleIcon 
                                    className="botonAgregar"
                                    onClick={()=> agregaAdministrador(lis._id,lis.Proyectos?.idProyectos || 'vacio', lis.Proyectos?.Proyectos || 'vacio')}
                                    />
                            </Box>
                    </li>    
                )}
            </ul>
        );
        return(
            <div>
                {sidebar}
            </div>
        )
    }

    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.open} fullWidth={true} onClose={handleClose} maxWidth={"md"}>
            <Box>
                <p className="titulo">{`Administradores de ${state.value}`}</p>
            </Box>
            <DialogContent >
                {
                    (state.title === 'Update')?
                    <Box 
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    className='contenedor'>
                    <Grid item xs={6}>
                        <Box className="tituloAdminProyecto">
                            <p>{`Administradores en ${state.value}`}</p>    
                        </Box>
                        <Box>
                            <AdminProyect />
                        </Box>   
                    </Grid>
                    <Grid item xs={6}>                 
                        <Box className="tituloAdminProyecto">
                            <p>Administradores Disponibles</p>
                        </Box>
                        <Box>
                            <AdminProyectLibre />
                        </Box>
                    </Grid>

                    </Box>    
                    :
                    <Box 
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    className='contenedor'>
                    <Grid item xs={12}>
                        <Box className="tituloAdminProyecto">
                            <p>{`Administradores en ${state.value}`}</p>    
                        </Box>
                        <Box>
                            <AdminProyect />
                        </Box>   
                        </Grid>
                    </Box>    

                }
            </DialogContent>
            <div className="BotonCerrar">
            <Button className="buttonCancel" onClick={handleClose}>Cerrar</Button>
            </div>
        </Dialog>
    )
}

export default AdministradoresProyectos;