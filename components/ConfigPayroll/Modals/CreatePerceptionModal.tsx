import {
    Theme,
    Dialog,
    Button,
    withStyles,
    Box,
    Select,
    Grid,
    TextField,
    FormControl,
    FormControlLabel
} from '@material-ui/core';
import '../Modal/CrearPayrollGroup.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { OutlinedInput } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { PerceptionModal } from '../../../interfaces/TabPerceptions.interfaces';
import { useForm } from '../../../hooks/useForm';
import { addPerception, getPerceptions } from '../../../services/PerceptionService';
import PerceptionContext from '../../../context/ConfigPayrollContext/PerceptionContext';
import { addNewPerception } from '../../../actions/tabPerception';
import { closePerceptionModal } from "../../Team/Modals/ModalPerceptionModal";

import { ErrorAlert } from '../../../alerts/errorAlert';
import { TabPerceptionContext } from '../../../context/ConfigPayrollContext/TabPerceptionContext';
import '../PayrollGroup.css'
import IOSSwitch from '../../ConfigPayroll/Switch';
import {updatePerception} from '../../../helpers/Nomina/Perceptions';
//import { addPerception, getPerceptions } from '../../../services/PerceptionService';


const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const EditaPerception = (props: any) => {
    
    const {state, dispatch} = useContext(PerceptionContext)
    const [cambio, setCambio] = useState(0)

    const [perceptions, setPerceptions] = useState([]);
    const [value, setValue] = useState()

    useEffect(() => {
        async function fetchData() {
            let result = await getPerceptions();
            setPerceptions(result);
        }
        fetchData();
        return () => {
            fetchData();
            setPerceptions([]);
        }
    }, [state]);
        
    const { addPerceptionOpen, setAddPerceptionOpen, PerceptionDispatch, } = useContext(TabPerceptionContext);

    const onChange = async(e: any) => {
        
            let nuevoValor = e.target.value
            setValue(nuevoValor);
            await updatePerception(e, state, dispatch, e.target.name, nuevoValor)
            console.log(state);
    };

    const onSumbit = async () => {

        if (state.ConceptName !== '' &&state.ConceptType !== ''&&state.AccountingAccount !== ''&&state.SATKey !== ''){
            const res = await addPerception(state);
        if (res.data) {
            SuccessfulAlert({ title: "¡Exito!", text: "¡Se ha actualizado la percepcion correctamente!" })
        };
        } else{
            return ErrorAlert({ text: "Ingrese todos los datos." });
        }
        
        
        dispatch({ type: "CLOSE_PERCEPTION_MODAL" });
        setAddPerceptionOpen();
        
    }
    
    const handleClose = async () => {
        
        dispatch({ type: "CLOSE_PERCEPTION_MODAL" });
        setAddPerceptionOpen();
    }
    
    
    return(
        <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={addPerceptionOpen} fullWidth={true} maxWidth={"md"}>
            <Box>
                <p className="titulo">Crea Percepcion</p>
            </Box>
            <DialogContent>
                <Box display="flex" flexDirection="column">
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Box className="columnaGeneralPuesto">
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>aNombre asdasd</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                                <TextField
                                                    name= "ConceptName"
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    placeholder='Concepto *'
                                                    defaultValue={state.ConceptName}
                                                    onChange={(e) => onChange(e)}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Clave SAT</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                                <TextField
                                                    name="SATKey"
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    placeholder='Clave SAT *'
                                                    defaultValue={state.SATKey}
                                                    onChange={(e) => onChange(e)}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Tipo de concepto</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                                <TextField
                                                    name="ConceptType"
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    placeholder='Tipo concepto *'
                                                    defaultValue={state.ConceptType}
                                                    onChange={(e) => onChange(e)}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Cuenta Contable</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                                <TextField
                                                    name="AccountingAccount"
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    defaultValue={state.AccountingAccount}
                                                    onChange={(e) => onChange(e)}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Tipo de Pago</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                                <TextField
                                                name="PayType"
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    defaultValue={state.PayType}
                                                    onChange={(e) => onChange(e)}/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Grava ISR</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                            <IOSSwitch 
                                                    NombreCampo={'ISRTax'}
                                                    Value={state.ISRTax}
                                                    /> 
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Grava ISN</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                            <IOSSwitch 
                                                    NombreCampo={'ISNTax'}
                                                    Value={state.ISNTax}
                                                    /> 
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Integra IMSS</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                            <IOSSwitch 
                                                    NombreCampo={'IntegratesIMSS'}
                                                    Value={state.IntegratesIMSS}
                                                    /> 
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Prevision social</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                            <IOSSwitch 
                                                    NombreCampo={'SocialSecurity'}
                                                    Value={state.SocialSecurity}
                                                    /> 
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} className="buttonCancel">
                    Cancelar
                </Button>
                <Button autoFocus onClick={onSumbit} className="buttonSave">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}

export default EditaPerception

