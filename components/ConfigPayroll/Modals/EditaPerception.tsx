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
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { editPerception, getPerceptions } from '../../../services/PerceptionService';
import PerceptionContext from '../../../context/ConfigPayrollContext/PerceptionContext';
import { closePerceptionModal } from "../../Team/Modals/ModalPerceptionModal";
import '../PayrollGroup.css'
import './ModalPerceptions.css'
import IOSSwitch from '../../ConfigPayroll/Switch';
import {updatePerception} from '../../../helpers/Nomina/Perceptions';

import { ErrorAlert } from '../../../alerts/errorAlert';
import SaveIcon from '@material-ui/icons/Save';

import { useMutation } from "@apollo/client";
import { GET_ALL_PERCEPTIONS, UPDATE_PERCEPTIONS } from "../../../Querys/querys";

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
   
const [updatePerceptions] = useMutation(UPDATE_PERCEPTIONS, {
  refetchQueries: [{ query: GET_ALL_PERCEPTIONS }],
});
   
  const [perceptions, setPerceptions] = useState([]);
  const [value, setValue] = useState()
  const {state, dispatch} = useContext(PerceptionContext)

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
  }, [state._id]);


  const onChange = async(e: any) => {
      
          let nuevoValor = e.target.value
          setValue(nuevoValor);
          await updatePerception(e, state, dispatch, e.target.name, nuevoValor)
  };



  const onSumbit = async () => {
    if(state.ConceptName.length > 100 || state.ConceptType.length > 100 || state.AccountingAccount.length > 100 || state.PayType.length > 100){
      return ErrorAlert({ text: "Tienes datos con más de 100 caracteres." });
    }
    
      if (state.ConceptName !== '' && state.ConceptType !== '' && state.SATKey !== ''){
        
        updatePerceptions({ 
            variables: {
              updatePerceptionsId: state._id,
              input: {
                ConceptName: state.ConceptName,
                SATKey: state.SATKey,
                Concept_Type: state.ConceptType,
                AccuntingAccount: state.AccountingAccount,
                PayType: state.PayType,
                ISRTax: state.ISRTax,
                ISNTax: state.ISNTax,
                SocialSecurity: state.SocialSecurity,
                IntegratesIMSS: state.IntegratesIMSS,
                TaxBoth: state.TaxBoth,
              },
            },
          });

          SuccessfulAlert({ title: "¡Exito!", text: "¡Se ha actualizado la percepción correctamente!" });

          await closePerceptionModal(dispatch);
          
          dispatch({ type: "CLOSE_PERCEPTION_MODAL" });
          
      } 
      
      else {
          return ErrorAlert({ text: "Ingresa todos los campos" });
      }
  }

  

  const handleClose = async () => {
      await closePerceptionModal(dispatch);
      dispatch({ type: "CLOSE_PERCEPTION_MODAL" });
      
  }
  

  return(
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.showEdit} fullWidth={false} maxWidth={"md"}>
        <div className="contenedorModalPerceptions">
          <p className="tituloModalPerceptions">Edita tu percepción</p>
        </div>
      <DialogContent className="ml32ModalPerceptions mr32ModalPerceptions">
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Nombre</span>
          </div>
          <div>
            <input 
              name= "ConceptName"
              type="text"
              className="Mask"
              placeholder='Concepto *'
              defaultValue={state.ConceptName}
              readOnly
              maxLength={100}
              onChange={(e) => onChange(e)}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Clave SAT</span>
          </div>
          <div>
            <input 
             name= "ConceptName"
             type="text"
             className="Mask"
             placeholder='Clave SAT *'
             defaultValue={state.SATKey}
             readOnly
             disabled
             onChange={(e) => onChange(e)}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Tipo de concepto</span>
          </div>
          <div>
            <input 
                name="ConceptType"
                type="text"
                className="Mask"
                placeholder='Tipo concepto *'
                defaultValue={state.ConceptType}
                readOnly
                maxLength={100}
                onChange={(e) => onChange(e)}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Cuenta Contable</span>
          </div>
          <div>
            <input 
                name="AccountingAccount"
                type="text"
                className="Mask"
                defaultValue={state.AccountingAccount}
                maxLength={100}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => onChange(e)}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Tipo de pago</span>
          </div>
          <div>
            <input 
                name="PayType"
                type="text"
                className="Mask"
                defaultValue={state.PayType}
                maxLength={100}
                onChange={(e) => onChange(e)}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Grava ISR</span>
          </div>
          <div>
          <div className="mr10ModalPerceptions">
            <IOSSwitch 
              NombreCampo={'ISRTax'}
              Value={state.ISRTax}
              /> 
          </div>
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
        <div className="flexModalPerceptions mb26ModalPerceptions">
          <div>
            <span className="textoModal">Grava ISN</span>
          </div>
          <div className="mr10ModalPerceptions">
          <IOSSwitch 
            NombreCampo={'ISNTax'}
            Value={state.ISNTax}
            /> 
          </div>
        </div>
        <div className="flexModalPerceptions mb26ModalPerceptions">
          <div>
            <span className="textoModal">Previsión social</span>
          </div>
          <div className="mr10ModalPerceptions">
          <IOSSwitch 
            NombreCampo={'SocialSecurity'}
            Value={state.SocialSecurity}
            /> 
          </div>
        </div>
        <div className="flexModalPerceptions mb26ModalPerceptions">
          <div>
            <span className="textoModal">Integra IMSS</span>
          </div>
          <div className="mr10ModalPerceptions">
          <IOSSwitch 
          NombreCampo={'IntegratesIMSS'}
          Value={state.IntegratesIMSS}
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

export default EditaPerception
