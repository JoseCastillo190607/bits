import react, {useState, useEffect, useContext, useReducer} from "react";
import {
    Grid,
    Dialog,
    DialogContent,
    Box,
    TextField,
} from '@material-ui/core';
//import { closePerceptionsModal } from "./ModalPerceptionsModal";
import { closePerceptionModal } from "../../Team/Modals/ModalPerceptionModal";
import { getUsersDisponiblesPuesto, putUserPuestos, getUsersPuesto } from "../../../services/auth/userService";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PerceptionContext  from "../../../context/ConfigPayrollContext/PerceptionContext"




const InfoPerception = () =>{
    const {state, dispatch} = useContext(PerceptionContext)
    const [cambio, setCambio] = useState(0)
    const [valor, setValor] = useState()

    //const [adminsDisponibles, setUserDisponibles] = useState([])
     
    const handleClose = async () => {
        await closePerceptionModal(dispatch)
    }

    /*const obtenerDatos = async () =>{
        let admins = await getUsersDisponiblesPuesto(state._id);
        setUserDisponibles(admins.data)
    }*/

    
    return(
        <Dialog aria-labelledby='costumized-dialog-title' open={state.showInformacion} fullWidth={true}  onClose={handleClose} maxWidth={"sm"}>
            <Box>
                <p className="titulo">Información de la percepción</p>
            </Box>
            <DialogContent>
            <Box>
            <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box className="columnaGeneralPuesto">
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Nombre</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                                <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value={state.ConceptName}
                                                    />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Clave SAT</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value={state.SATKey}
                                                   />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Tipo de concepto</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value={state.ConceptType}
                                                   />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Cuenta contable</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value={state.AccountingAccount}
                                                   />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Tipo de pago</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value={state.PayType}
                                                   />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Grava ISR</span>
                                            </div>
                                        </Grid> 
                                        {(state.ISRTax === 'true')?
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="Sí"
                                                   />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="No"
                                                   />
                                            </div>
                                        </Grid>
                                        }
                                    </Grid>
                                </Box>
                                
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Grava ISN</span>
                                            </div>
                                        </Grid> 
                                        {(state.ISNTax === 'true')?
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="Sí"
                                                   />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="No"
                                                   />
                                            </div>
                                        </Grid>
                                        }

                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Seguridad social</span>
                                            </div>
                                        </Grid> 
                                        {(state.SocialSecurity === 'true')?
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="Sí"
                                                   />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="No"
                                                   />
                                            </div>
                                        </Grid>
                                        }
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={2} className="filaInput">
                                        <Grid item xs={3}>
                                            <div className="espacioTitulos">
                                                <span>Integra IMSS</span>
                                            </div>
                                        </Grid> 
                                        {(state.IntegratesIMSS === 'true')?
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="Sí"
                                                   />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={8}>
                                            <div className="espacioInputs">
                                            <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="inputInfoPuesto"
                                                    disabled
                                                    value="No"
                                                   />
                                            </div>
                                        </Grid>
                                        }
                                    </Grid>
                                </Box>
                                
                                
                            </Box>
                        </Grid>
                        </Grid>

                    </Box>
            </DialogContent>
            <div className="contenedorBotonCerrarInfo">
                <button className="botonCerrarInfo" onClick={handleClose}>
                    <div className="alignContenedorBoton">
                      <span className="textoBotonCerrar">Cerrar</span>
                    </div>
                </button>
            </div>
        </Dialog>
        
    )
}


export default InfoPerception