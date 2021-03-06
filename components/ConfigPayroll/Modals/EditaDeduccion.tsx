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
import { editDeduccion, getDeducciones } from '../../../services/DeduccionService';
import DeduccionContext from '../../../context/ConfigPayrollContext/DeduccionContext';
import { closeDeduccionModal } from "../../Team/Modals/ModalDeduccionModal";
import {updateDeduccion} from '../../../helpers/Nomina/Deducciones';
import { ErrorAlert } from '../../../alerts/errorAlert';
import '../PayrollGroup.css'
import { useMutation } from "@apollo/client";
import { GET_ALL_DEDUCTIONS, UPDATE_DEDUCTIONS } from "../../../Querys/querys";
import IOSSwitch from '../../ConfigPayroll/Switch';
import SaveIcon from '@material-ui/icons/Save';

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
    
    const [updateDeductions] = useMutation(UPDATE_DEDUCTIONS, {
        refetchQueries: [{ query: GET_ALL_DEDUCTIONS }],
      });

    const [deducciones, setDeducciones] = useState([]);
    const {state, dispatch} = useContext(DeduccionContext)
    const [cambio, setCambio] = useState(0)
    const [value, setValue] = useState()

    useEffect(() => {
        async function fetchData() {
            let result = await getDeducciones();
            setDeducciones(result);
        }
        fetchData();
        return () => {
            fetchData();
            setDeducciones([]);
        }
    }, [state._id]);
    

    const onChange = async(e: any) => {
            let nuevoValor = e.target.value
            setValue(nuevoValor);
            await updateDeduccion(e, state, dispatch, e.target.name, nuevoValor)
    };

    


    const handleClose = async () => {
        await closeDeduccionModal(dispatch)
        await props.getDatos();
    }
    

    const onSumbit = async () => {
        
        if (state.ConceptName !== '' && state.SATKey !== '' ){
            const idint = Number(state._id) ;
            console.log(typeof idint)
            updateDeductions({ 
                variables: {
                    updateDeductionsId: idint,
                  input: {
                    concept_type: state.ConceptName,
                    SATKey: state.SATKey,
                    ISRTax: state.ISRTax,
                    TaxBoth: state.TaxBoth
                    
                  },
                },
              });
            SuccessfulAlert({ title: "????xito!", text: "??Se ha actualizado la deducci??n correctamente!" })
            await closeDeduccionModal(dispatch);
            await props.getDatos();
            dispatch({ type: "CLOSE_PERCEPTION_MODAL" });
            
        } 
        
        else {
            return ErrorAlert({ text: "Ingresa todos los campos" });
        }
    }

    return(
        <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.open} fullWidth={true} maxWidth={"md"}>
            <div className="contenedorModalPerceptions">
            <p className="tituloModalPerceptions">Edita {state.ConceptName}</p>
          </div>
       <DialogContent className="ml32ModalPerceptions mr32ModalPerceptions">
          <div className="flexModalPerceptions mb24ModalPerceptions">
            <div>
              <span className="textoModal">Nombre</span>
            </div>
            <div>
              <TextField
                error={false}
                type="text"
                variant="outlined"
                size="small"
                className="inputModalPerceptions"
                placeholder=''
                defaultValue={state.ConceptName}
                onChange={(e) => onChange(e)}/>
            </div>
          </div>
          <div className="flexModalPerceptions mb24ModalPerceptions">
            <div>
              <span className="textoModal">Clave SAT</span>
            </div>
            <div>
              <TextField
                error={false}
                type="text"
                variant="outlined"
                size="small"
                className="inputModalPerceptions"
                placeholder=''
                defaultValue={state.SATKey}
                disabled
                onChange={(e) => onChange(e)}/>
            </div>
          </div>
          <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Grava ISR</span>
          </div>
          <div className="mr10ModalPerceptions">
          <IOSSwitch 
            NombreCampo={'ISRTax'}
            Value={state.ISRTax}
            /> 
          </div>
        </div>

        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Grava ambos</span>
          </div>
          <div className="mr10ModalPerceptions">
          <IOSSwitch 
            NombreCampo={'TaxBoth'}
            Value={state.TaxBoth}
            /> 
          </div>
        </div>
        </DialogContent>
            <DialogActions>
                <div className="contenedorBotonesPoliticsModal">
                <button autoFocus onClick={handleClose} className="botonCancelarModal">
                    Cancelar
                </button>
                <button autoFocus onClick={onSumbit} className="botonGuardarModal botonDoble">
                <div className="contenedorIconoBotonModal">
                  <SaveIcon fontSize="small"/>
                </div>
                <div>
                  Guardar
                </div>
                </button>
            </div>
            </DialogActions>
        </Dialog>
    </div>
    )
}

export default EditaDeduccion

