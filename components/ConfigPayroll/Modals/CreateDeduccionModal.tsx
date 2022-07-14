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
import { addDeducciones } from '../../../services/DeduccionService';
import DeduccionContext from '../../../context/ConfigPayrollContext/DeduccionContext';
import { addNewDeduccion } from '../../../actions/tabDeduccion';
import { closeDeduccionModal } from "../../Team/Modals/ModalDeduccionModal";
import { ErrorAlert } from '../../../alerts/errorAlert';
import { TabDeduccionContext } from '../../../context/ConfigPayrollContext/TabDeduccionContext';
import '../PayrollGroup.css'
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from "@apollo/client";
import { GET_ALL_DEDUCTIONS, CREATE_DEDUCTIONS } from "../../../Querys/querys";
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

const CreaDeduccion = (props: any) => {
const [createNewDeductions] = useMutation(CREATE_DEDUCTIONS, {
  refetchQueries: [{ query: GET_ALL_DEDUCTIONS }],
});


const {state, dispatch} = useContext(DeduccionContext)

  const {
      ConceptName,
      SATKey,
      ISRTax,
      TaxBoth,
      onChange, formulario, reset, setForm
  } = useForm<DeduccionModal>({
      ConceptName: "",
      SATKey: "004",
      ISRTax: "",
      TaxBoth: ""
  });

  
  
  const { addDeduccionOpen, setAddDeduccionOpen, DeduccionDispatch, } = useContext(TabDeduccionContext);

  useEffect(() => {
      initData()
  }, []);

  const initData = async () => {
  };


  const handleClose = async () => {
      // Clean modal
      reset();
      // Close modal
      setAddDeduccionOpen();
  }

  const handleAdd = async () => {

      if (ConceptName !== '' && SATKey !== '' ) {

          createNewDeductions({
              variables: {
                input: {
                  SATKey: SATKey,
                  concept_type: ConceptName,
                  ISRTax: state.ISRTax,
                  TaxBoth: state.TaxBoth
                },
              },
          });

          SuccessfulAlert({ title: "¡Exito!", text: "¡Se ha añadido la deduccion correctamente!" })
          
      } else ErrorAlert({ text: "Favor de completar los campos requeridos (*)." });

  };

  return(
      <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={addDeduccionOpen} fullWidth={false} maxWidth={"md"}>
        <div className="contenedorModalPerceptions">
            <p className="tituloModalPerceptions">Crear tu deducción</p>
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
                defaultValue={ConceptName}
                onChange={({ target }) => onChange(target.value as string, 'ConceptName')}/>
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
                defaultValue={SATKey}
                disabled
                onChange={({ target }) => onChange(target.value as string, 'SATKey')}/>
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
                <button autoFocus onClick={handleAdd} className="botonGuardarModal botonDoble">
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

export default CreaDeduccion

