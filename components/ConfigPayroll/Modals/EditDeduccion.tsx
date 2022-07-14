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
import '../Modal/CrearPayrollGroup.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { OutlinedInput } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { DeduccionModal } from '../../../interfaces/TabDeduccion.interfaces';
import { useForm } from '../../../hooks/useForm';
import { editDeduccion } from '../../../services/payrollServices/DeduccionService';
import DeduccionContext from '../../../context/DeduccionContext/DeduccionContext';
import { closeDeduccionModal } from "../Modals/ModalDeduccionModal";
import '../PayrollGroup.css'

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

const EditaDeduccion = (props: any) => {
    
    const {state, dispatch} = useContext(DeduccionContext)
    const [cambio, setCambio] = useState(0)

    const {
        ConceptName,
        SATKey,
        ISRTax,
        TaxBoth,
        onChange, formulario, reset, setForm
    } = useForm<DeduccionModal>({
        ConceptName: state.ConceptName,
        SATKey: state.SATKey,
        ISRTax: state.ISRTax,
        TaxBoth: state.TaxBoth
    });

    useEffect(() => {
        initData()
    }, []);

    const initData = async () => {
    };


    const handleClose = async () => {
        await closeDeduccionModal(dispatch)
        
        await props.getDatos();
    }
    
    const handleAdd = async () => {
            const res = await editDeduccion(formulario, state._id);
            if (res.data) {
                SuccessfulAlert({ title: "¡Exito!", text: "¡Se ha actualizado la deduccion correctamente!" })
            };
            await closeDeduccionModal(dispatch)
            
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
                                                    disabled
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
                                                    disabled
                                                    onChange={({ target }) => onChange(target.value as string, 'SATKey')}/>
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

export default EditaDeduccion

