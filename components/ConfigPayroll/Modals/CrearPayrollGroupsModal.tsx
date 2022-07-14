import {
  Dialog
} from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import {getGroupPayroll} from '../../../services/PayrollGroupService';
import PayrollGroupContext from "../../../context/ConfigPayrollContext/PayrollGroupContext";
import { TabPayrollGroupContext } from '../../../context/ConfigPayrollContext/TabPayrollGroupContext';
import SaveIcon from '@material-ui/icons/Save';
import '../Modals/Modal.css'
import { useMutation, useQuery } from "@apollo/client";
import IOSSwitchPayrollGroup from '../../ConfigPayroll/IOSSwitch/PayrollGroupSwitch';
import { GET_ALL_PAYROLL_GROUP, CREATE_PAYROLL_GROUP, GET_ENTERPRISE_SELECT } from "../../../Querys/querys";
import {useFormik} from "formik";
import * as Yup from "yup";
import { Form } from "semantic-ui-react";
import { closePayrollGroupModal } from '../../Team/Modals/ModalPayrollGroupModal';
import { VerticalAlignBottom } from '@material-ui/icons';
import { maybeDeepFreeze } from '@apollo/client/utilities';

const CreaPayrollGroup = (props: any) => {
  const{data} = useQuery(GET_ENTERPRISE_SELECT,{})
  const company = data?.GET_ENTERPRISE_SELECT
  const [createNewPayrollGroup] = useMutation(CREATE_PAYROLL_GROUP, {
    refetchQueries: [{ query: GET_ALL_PAYROLL_GROUP }],
  });

  const {state, dispatch} = useContext(PayrollGroupContext)
  const [Group, setGroup] = useState([]);
  const [value, setValue] = useState()
  const { addPayrollGroupOpen, setAddPayrollGroupOpen, PayrollGroupDispatch } = useContext(TabPayrollGroupContext);

  useEffect(() => {
    async function fetchData() {
    let Group = await getGroupPayroll();
    setGroup(Group);
    }
    fetchData();
  return () => {
    fetchData();
    setGroup([]);
}
}, [state]);

const handleClose = async () => {
  dispatch({ type: "CLOSE_PAYROLLGROUP_MODAL" });
  setAddPayrollGroupOpen();
}



const initialValues = () =>{
  return{
    GroupName: "",
    PaymentScheme: "",
    CompanyName: "",
    BankAccount: "",
    PayrollPeriod: "",
    PayrollPeriodDays: "",
    SubsidyEmployee: ""
  }
}

const validationSchema = () =>{
  return{
    GroupName: Yup.string().required("El nombre es requerido").max(100,'Maximo 100 caracteres'),
    PaymentScheme: Yup.string().required("Por favor seleccione una opción"),
    CompanyName: Yup.string().required("Por favor seleccione una opción"),
    BankAccount: Yup.string().required("La cuenta es requerida").max(100,'Maximo 100 caracteres'),
    PayrollPeriod: Yup.string().required("Por favor seleccione una opción")
  }
}

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:(formData,reset)=>{
      createNewPayrollGroup({
        variables: {
          input: {
            group_name: formData.GroupName,
            payment_scheme: formData.PaymentScheme,
            company_name: formData.CompanyName,
            bank_account: formData.BankAccount,
            payroll_period: formData.PayrollPeriod,
            period_days: formData.PayrollPeriodDays,
            social_security: state.SocialSecurity,
            monthly_ISR: state.MonthlyISR,
            ISR_with_regulation: state.RegulationISR,
            employee_benefit: formData.SubsidyEmployee
          },
        },
      }).then(()=>{
      SuccessfulAlert({text: "Registro creado con éxito"})
      formik.resetForm();
      handleClose()
      
      });
    }
  });

  return(
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={addPayrollGroupOpen} fullWidth={false} maxWidth={"md"}>
      <Form onSubmit = {formik.handleSubmit}>
        <div className="contenedorTituloModal22">
          <p className="tituloModal22">Crear grupo de nómina</p>
        </div>
        <div className="dialogoContent ">
          <div className="contenedorFila">
            <div className="primeraFila">
              <label htmlFor="GroupName" className="textoModalPayroll filaPrimerElemento">Nombre de grupo de nómina</label>
            </div>
            <div>
              <input
                name="GroupName"
                className="inputCrearPayroll"
                value={formik.values.GroupName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="contenedorError">
                <span className='errorInput'>{formik.touched.GroupName && formik.errors.GroupName}</span>
              </div>
            </div>
          </div>
          <div className="contenedorFila">
            <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Esquema pago de nómina</span>
            </div>
            <div>
              <select
                name="PaymentScheme"
                value={formik.values.PaymentScheme}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="inputSelectModal">
                  <option value="" className="optionSelect" disabled>Selecciona la categoría</option>
                  <option value="Nomina Estandar">Nómina estándar</option>
                </select>
                <div className="contenedorError">
                  <span className='errorInput'>{formik.touched.PaymentScheme && formik.errors.PaymentScheme}</span>
              </div>
            </div>
          </div>
          <div className="contenedorFila">
            <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Razón social</span>
            </div>
            <div>
              <select
                name="CompanyName"
                value={formik.values.CompanyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="inputSelectModal">
                  <option value="" className="optionSelect" disabled>Selecciona una empresa</option>
                    {
                     company?.map((company:any) => <option className="optionSelect" key={company?.id} value={company?.name}>{company?.name}</option>)
                    }
                </select>
                <div className="contenedorError">
                  <span className='errorInput'>{formik.touched.CompanyName && formik.errors.CompanyName}</span>
              </div>
            </div>
          </div>
          <div className="contenedorFila">
          <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Cuenta bancaria</span>
            </div>
            <div>
              <input
                name="BankAccount"
                className="inputCrearPayroll"
                value={formik.values.BankAccount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}/>
                <div className="contenedorError">
                  <span className='errorInput'>{formik.touched.BankAccount && formik.errors.BankAccount}</span>
                </div>
            </div>
          </div>
          <div className="contenedorFila">
          <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Periodo de nómina</span>
            </div>
            <div>
              <select
                name="PayrollPeriod"
                value={formik.values.PayrollPeriod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="inputSelectModal">
                  <option value=""  className="optionSelect" disabled>Selecciona el periodo</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Catorcenal">Catorcenal</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Mensual">Mensual</option>
                </select>
                <div className="contenedorError">
                  <span className='errorInput'>{formik.touched.PayrollPeriod && formik.errors.PayrollPeriod}</span>
                </div>
            </div>
          </div>
          <div className="contenedorFila">
          <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Calcular previsión social mensual</span>
            </div>
            <div>
              <div className="contenedorSwitch">
              <IOSSwitchPayrollGroup 
                    NombreCampo={'SocialSecurity'}
                    Value={state.SocialSecurity}
                  /> 
              </div>
            </div>
          </div>
          <div className="contenedorFila">
          <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Ajuste mensual de ISR</span>
            </div>
            <div>
              <div className="contenedorSwitch">
              <IOSSwitchPayrollGroup 
                    NombreCampo={'MonthlyISR'}
                    Value={state.MonthlyISR}
                  /> 
              </div>
            </div>
          </div>
          <div className="contenedorFila">
          <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Calcular periodo de nómina con base a:</span>
            </div>
            <div>
              <input
                name="PayrollPeriodDays"
                className="inputCrearPayrollMedio containerFilaPayroll"
                value={formik.values.PayrollPeriodDays}
                onChange={formik.handleChange}
               />
            </div>
          </div>
          <div className="contenedorFila">
            <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Calcular periodo de nómina con base a:</span>
            </div>
            <div>
              <select
                name="SubsidyEmployee"
                value={formik.values.SubsidyEmployee}
                onChange={formik.handleChange}
                className="inputSelectModalMedio contenedorSelectMedio">
                  <option value=""  className="optionSelect">Selecciona</option>
                  <option value="Periodica">Periódica</option>
                  <option value="Diaria">Diaria</option>
                    {/* {
                     company?.map(company => <option className="optionSelect" key={company?._id} value={company?.RazonSocial}>{company?.RazonSocial}</option>)
                    } */}
                </select>
            </div>
          </div>
          <div className="contenedorFila">
          <div className="primeraFila">
              <span className="textoModalPayroll filaPrimerElemento">Calcular ISR de aguinaldo aplicando reglamento</span>
            </div>
            <div>
              <div className="contenedorSwitch">
                <IOSSwitchPayrollGroup 
                    NombreCampo={'RegulationISR'}
                    Value={state.RegulationISR}
                  /> 
              </div>
            </div>
          </div> 
          
        </div>
        <div >
          <div className="contenedorBotonesModal">
              <button autoFocus onClick={handleClose} className="botonCancelarModal" type="button">
                  Cancelar
              </button>
              <button className="botonGuardarModal botonDoble" type="submit">
              <div className="contenedorIconoBotonModal">
                <SaveIcon fontSize="small"/>
              </div>
              <div>
                Guardar
              </div>
              </button>
          </div>
          </div>
          </Form>
      </Dialog>
    </div>
  )
}

export default CreaPayrollGroup


