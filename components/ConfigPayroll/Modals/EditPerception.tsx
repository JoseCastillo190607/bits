import {
    Theme,
    Dialog,
    Button,
    withStyles,
    Box,
    Select,
    Grid,
    TextField,
    FormControl
} from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import '../Modal/CrearPayrollGroup.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { OutlinedInput } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { PerceptionModal } from '../../../interfaces/TabPerceptions.interfaces';
import { useForm } from '../../../hooks/useForm';
import { editPerception } from '../../../services/payrollServices/PerceptionService';
import PerceptionContext from '../../../context/ConfigPayrollContext/PerceptionContext';
import { closePerceptionsModal } from "../Modals/ModalPerceptionsModal";
import '../PayrollGroup.css'
import IOSSwitch from '../../ConfigPayroll/Switch';


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
    const [value, setStatusState] = useState(false);
    
    

    const {
        ConceptName,
        SATKey,
        ConceptType,
        AccountingAccount,
        PayType,
        ISRTax,
        ISNTax,
        SocialSecurity,
        IntegratesIMSS,
        TaxBoth,
        onChange, formulario, reset, setForm
    } = useForm<PerceptionModal>({
        ConceptName: state.ConceptName,
        SATKey: state.SATKey,
        ConceptType: state.ConceptType,
        AccountingAccount: state.AccountingAccount,
        PayType: state.PayType,
        ISRTax: state.ISRTax,
        ISNTax: state.ISNTax,
        SocialSecurity: state.SocialSecurity,
        IntegratesIMSS: state.IntegratesIMSS,
        TaxBoth: state.TaxBoth
    });

    /*useEffect(() => {
        initData()
    }, []);*/

    



const handleClose = async () => {
        await closePerceptionsModal(dispatch)
        
        await props.getDatos();
    }
    
    const handleAdd = async () => {
            const res = await editPerception(formulario, state._id);
            if (res.data) {
                SuccessfulAlert({ title: "¡Exito!", text: "¡Se ha actualizado la percepcion correctamente!" })
            };
            await closePerceptionsModal(dispatch)
            
            await props.getDatos();
    };

    
    
    

    return(
        <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.showEdit} fullWidth={true} maxWidth={"md"}>
            <Box>
                <p className="titulo">Edita {state.ConceptName}</p>
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
                                                <span>Nombre</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                                <TextField
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    placeholder='Concepto *'
                                                    defaultValue={state.ConceptName}
                                                    onChange={({ target }) => onChange(target.value as string, 'ConceptName')}/>
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
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    placeholder='Clave SAT *'
                                                    defaultValue={state.SATKey}
                                                    onChange={({ target }) => onChange(target.value as string, 'SATKey')}/>
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
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    placeholder='Tipo concepto *'
                                                    defaultValue={state.ConceptType}
                                                    onChange={({ target }) => onChange(target.value as string, 'ConceptType')}/>
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
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    defaultValue={state.AccountingAccount}
                                                    onChange={({ target }) => onChange(target.value as string, 'AccountingAccount')}/>
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
                                                    error={false}
                                                    type="text"
                                                    variant="outlined"
                                                    size="small"
                                                    className="Mask"
                                                    defaultValue={state.PayType}
                                                    onChange={({ target }) => onChange(target.value as string, 'PayType')}/>
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
                                                    value={state.ISRTax}
                                                    /> 
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className='contenedorizquierdo'>
                                    <Grid container spacing={1} className="filaInput">
                                    <Grid item xs={2}>
                                            <div className="espacioTitulos">
                                                <span>Grava ISN PRUEBA</span>
                                            </div>
                                        </Grid> 
                                        <Grid item xs={9}>
                                            <div className="espacioInputs">
                                            <IOSSwitch 
                                                    NombreCampo={'ISNTax'}
                                                    value={state.ISNTax}
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
                                                    value={state.IntegratesIMSS}
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
                                                    value={state.SocialSecurity}
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
                <Button autoFocus onClick={handleAdd} className="buttonSave">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}

export default EditaPerception

