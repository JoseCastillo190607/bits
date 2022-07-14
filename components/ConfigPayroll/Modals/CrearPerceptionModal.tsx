import {
  Theme,
  Dialog,
  withStyles,
} from '@material-ui/core';
import '../Modal/CrearPayrollGroup.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useEffect, useState, useContext } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import {  getPerceptions } from '../../../services/PerceptionService';
import PerceptionContext from '../../../context/ConfigPayrollContext/PerceptionContext';
import { PerceptionModal } from '../../../interfaces/TabPerceptions.interfaces';
import { useForm } from '../../../hooks/useForm';
import SaveIcon from '@material-ui/icons/Save';
import { ErrorAlert } from '../../../alerts/errorAlert';
import { TabPerceptionContext } from '../../../context/ConfigPayrollContext/TabPerceptionContext';
import '../PayrollGroup.css'
import './ModalPerceptions.css'
import IOSSwitch from '../../ConfigPayroll/Switch';
import {updatePerception} from '../../../helpers/Nomina/Perceptions';

import { useMutation } from "@apollo/client";
import { GET_ALL_PERCEPTIONS, CREATE_PERCEPTIONS } from "../../../Querys/querys";

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

const CreaPerception = (props: any) => {

const [createNewPerceptions] = useMutation(CREATE_PERCEPTIONS, {
  refetchQueries: [{ query: GET_ALL_PERCEPTIONS }],
});

const {state, dispatch} = useContext(PerceptionContext)
const [cambio, setCambio] = useState(0)
const [perceptions, setPerceptions] = useState([]);
const [value, setValue] = useState()
const { addPerceptionOpen, setAddPerceptionOpen, PerceptionDispatch, } = useContext(TabPerceptionContext);

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
  ConceptName: "",
  SATKey: "016",
  ConceptType: "",
  AccountingAccount: "",
  PayType: "",
  ISRTax: "",
  ISNTax: "",
  SocialSecurity: "",
  TaxBoth: "",
  IntegratesIMSS: "",
});

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

  const onChanges = async(e: any) => {
          let nuevoValor = e.target.value
          setValue(nuevoValor);
          await updatePerception(e, state, dispatch, e.target.name, nuevoValor)
          console.log(state);
  };

  const onSumbit = async () => {
    if(formulario.ConceptName.length > 100 || formulario.ConceptType.length > 100 || formulario.AccountingAccount.length > 100 || formulario.PayType.length > 100){
      return ErrorAlert({ text: "Tienes datos con más de 100 caracteres." });
    }
    
    
    if (formulario.ConceptName !== '' &&formulario.ConceptType !== '' &&formulario.SATKey !== ''){
      
      debugger
        console.log("formulario", formulario)
        console.log("estado", state)
        createNewPerceptions({
          variables: {
            input: {
              ConceptName: formulario.ConceptName,
              SATKey: formulario.SATKey,
              Concept_Type: formulario.ConceptType,
              AccuntingAccount: formulario.AccountingAccount,     
              PayType: formulario.PayType,
              ISRTax: state.ISRTax,
              ISNTax: state.ISNTax,
              SocialSecurity: state.SocialSecurity,
              IntegratesIMSS: state.IntegratesIMSS,
              TaxBoth: state.TaxBoth,
            },
          },
        });

          SuccessfulAlert({ title: "¡Éxito!", text: "¡Se ha creado la percepción correctamente!" })
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
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={addPerceptionOpen} fullWidth={false} maxWidth={"md"}>
        <div className="contenedorModalPerceptions">
          <p className="tituloModalPerceptions">Crea tu percepción</p>
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
              defaultValue={ConceptName}
              maxLength={100}
              onChange={({ target }) => onChange(target.value as string, 'ConceptName')}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Clave SAT</span>
          </div>
          <div>
            <input 
             name= "SATKey"
             type="text"
             className="Mask"
             placeholder='Clave SAT *'
             defaultValue={SATKey}
             readOnly
             disabled
             onChange={({ target }) => onChange(target.value as string, 'SATKey')}/>
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
                defaultValue={ConceptType}
                maxLength={100}
                onChange={({ target }) => onChange(target.value as string, 'ConceptType')}/>
          </div>
        </div>
        <div className="flexModalPerceptions mb24ModalPerceptions">
          <div>
            <span className="textoModal">Cuenta contable</span>
          </div>
          <div>
            <input 
                name="AccountingAccount"
                type="text"
                className="Mask"
                defaultValue={AccountingAccount}
                maxLength={100}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={({ target }) => onChange(target.value as string, 'AccountingAccount')}/>
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
                defaultValue={PayType}
                maxLength={100}
                onChange={({ target }) => onChange(target.value as string, 'PayType')}/>
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

export default CreaPerception

