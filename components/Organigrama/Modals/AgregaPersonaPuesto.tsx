import react, {useState, useEffect, useContext} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
  } from '@material-ui/core';
import { Box, Button, Dialog, DialogContent, Grid, Modal } from "@material-ui/core"
import { getUsersDisponiblesPuesto, putUserPuestos } from "../../../services/auth/userService";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { closeOrganigramaModal } from "../../Team/Modals/ModalOrganigramaModal";
import ImagenColaborador from '../ImagenColaborador';
import SaveIcon from '@material-ui/icons/Save';

import '../Organigrama.css'

import OrganigramaContext from "../../../context/OrganigramaContext/OrganigramaContext"

const AgregaPersonaPuesto = (props: any) =>{
    const {state, dispatch} = useContext(OrganigramaContext)
    const [cambio, setCambio] = useState(0)
    const [adminsDisponibles, setUserDisponibles] = useState([])

    const handleClose = async () => {
        await closeOrganigramaModal(dispatch)
        await props.getDatos();
    }

    function UserPuestoLibre(){
        const [adminsDisponibles, setUserDisponibles] = useState([])
        const agregaUsuario = async (idUsuario: any, idPuesto: any, Puesto: any) =>{
            let mensaje = `Usuario agregado a ${state.NombrePuesto}`
            if (idPuesto === 'vacio'){
                let idPuestoActualizado = state._id
                let PuestoActualizado = state.NombrePuesto
                const usuarioActualizado =  await putUserPuestos(idUsuario, idPuestoActualizado, PuestoActualizado, mensaje) 
                setCambio(cambio + 1)
                await closeOrganigramaModal(dispatch)
                await props.getDatos();
            }else{
                let idPuestoActualizado = (`${state._id},${idPuesto}`)  
                let PuestoActualizado = (`${state.NombrePuesto},${Puesto}`)
                const usuarioActualizado =  await putUserPuestos(idUsuario, idPuestoActualizado, PuestoActualizado, mensaje)
                setCambio(cambio + 1)
                await closeOrganigramaModal(dispatch)
                await props.getDatos();
            }
        }

        useEffect(()=>{
            obtenerDatos();
        },[])

        const obtenerDatos = async () =>{
            let admins = await getUsersDisponiblesPuesto(state.NombrePuesto);
            setUserDisponibles(admins.data)
       }

        const sidebar = (
            <Box className="contenedorUsuarios">
                <ul className='ulLista'>
                    {adminsDisponibles?.map((lis:any)=>
                        <li key={lis._id} className="contenedorLista">
                                <div className='alineacionPuesto'>
                                    {(lis.ImagenUsuario === undefined)?
                                        <ImagenColaborador Nombre={lis.NombreUsuario} Apellido={lis.ApellidoUsuario}/>
                                    :
                                    <img
                                        src={lis.ImagenUsuario}
                                        alt="img"
                                        className="imgCollaborator__BITSss"
                                    />
                                    }
                                <div>
                                    <div className='nombrePuesto'>
                                        <span className='textoListaUsuario'>{lis.PrimerNombre} {lis.ApellidoUsuario}</span>
                                    </div>
                                    <div className='nombrePuesto'>
                                        <span className='correoListaUsuario'>{lis.Usuario}</span>  
                                    </div>
                                </div>
                            </div>
                            <Box>
                                <button className='bottonAgregarUsuario' onClick={()=> agregaUsuario(lis._id,lis.Puesto?.idPuesto || 'vacio', lis.Puesto?.Puesto || 'vacio')}>
                                    <div>
                                        <span className='textoBotonAgregaUsuario'>Agregar +</span>
                                    </div>
                                </button>
                            </Box>
                        </li>    
                    )}
                </ul>
            </Box>
        );
        return(
            <div>
                {sidebar}
            </div>
        )
    }



    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.showAgregaPersona} fullWidth={true}  onClose={handleClose} maxWidth={"md"}>
            <Box>
                <p className="titulo">Agregar Personas al puesto</p>
            </Box>
            <DialogContent>
            <Box 
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    className='contenedor'>
                    <Grid item xs={6}>
                        <Box className="tituloAdminProyecto">
                            <p>Colaborador que deseas agregar</p>    
                        </Box>
                        <Box>
                            <UserPuestoLibre />
                        </Box>   
                    </Grid>
                    <Grid item xs={6}>
                        <Box className="tituloAdminProyecto">
                            <p>Colaboradores sin puesto</p>    
                        </Box>
                        <Box>
                            <UserPuestoLibre />
                        </Box>   
                    </Grid>
                    </Box>
            </DialogContent>
            <div className="contenedorBotones">
                <div>
                    <button className="botonCancelarUsuarios" onClick={handleClose}>
                        <div className="textoBotonCancelarUsuariosAmarillo">
                            Cerrar
                        </div>
                    </button>
                        
                </div>
                <div>
                    <button className="BotonCancelarUsuariosAmarillo" onClick={handleClose}>
                        <div className="textoBotonCancelarUsuariosAmarillo">
                            Guardar
                        </div>
                        <div>
                            <SaveIcon />
                        </div>
                    </button>
                </div>
            </div>
        </Dialog>
    )
}

export default AgregaPersonaPuesto