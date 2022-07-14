import {
  Theme,
  Dialog,
  withStyles,
  Grid,
} from '@material-ui/core';
import '../Modal/CrearPayrollGroup.css';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useEffect, useState, useContext } from 'react';
import { SuccessfulAlert } from '../../../alerts/successAlerts';
import { ICompany } from '../../../interfaces/Company';
import { getGroupPayroll} from '../../../services/PayrollGroupService';
import PayrollGroupContext from "../../../context/ConfigPayrollContext/PayrollGroupContext";
import SaveIcon from '@material-ui/icons/Save';
import { getAllCompany } from '../../../services/CompanyService';
import { closePayrollGroupModal } from '../../Team/Modals/ModalPayrollGroupModal';
import '../PayrollGroup.css'
import {updatePayrollGroup} from '../../../helpers/Nomina/PayrollGroup'
import IOSSwitchPayrollGroup from '../../ConfigPayroll/IOSSwitch/PayrollGroupSwitch';
import { ErrorAlert } from '../../../alerts/errorAlert';
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PAYROLL_GROUP, UPDATE_PAYROLL_GROUP, GET_ENTERPRISE_SELECT, GET_PAYROLL_GROUP } from "../../../Querys/querys";
import { Formik, Form} from "formik";
import * as Yup from "yup";

const CreatePayrollGroup = (props: any) => {
  const{data} = useQuery(GET_ENTERPRISE_SELECT,{})
  const company = data?.GET_ENTERPRISE_SELECT
  const {state, dispatch} = useContext(PayrollGroupContext)
  const [updatePayroll] = useMutation(UPDATE_PAYROLL_GROUP, {
      refetchQueries: [{ query: GET_ALL_PAYROLL_GROUP },{query:GET_PAYROLL_GROUP, variables:{getPayrollGroupId: state._id}}],
  });

  const {loading, error, data:dataGroup, refetch} = useQuery(GET_PAYROLL_GROUP,{
    variables:{
      getPayrollGroupId: state._id
    }
  });

  useEffect(()=>{
    refetch({
      getPayrollGroupId: state._id
    })
  },[state._id])

  console.log("Esta entrando", state._id)

  if(loading) return null

  const initialValues = () =>{
    return{
      GroupName: dataGroup?.GET_PAYROLL_GROUP?.group_name,
      PaymentScheme: dataGroup?.GET_PAYROLL_GROUP?.payment_scheme,
      CompanyName: dataGroup?.GET_PAYROLL_GROUP?.company_name,
      BankAccount:dataGroup?.GET_PAYROLL_GROUP?. bank_account,
      PayrollPeriod: dataGroup?.GET_PAYROLL_GROUP?.payroll_period,
      PayrollPeriodDays: dataGroup?.GET_PAYROLL_GROUP?.period_days,
      SubsidyEmployee: dataGroup?.GET_PAYROLL_GROUP?.employee_benefit,
      social_security: dataGroup?.GET_PAYROLL_GROUP?.social_security,
      monthly_ISR: dataGroup?.GET_PAYROLL_GROUP?.monthly_ISR,
      ISR_with_regulation: dataGroup?.GET_PAYROLL_GROUP?.ISR_with_regulation
    }
  }

  const handleClose = async () => {
    console.log("Hola no")
      await closePayrollGroupModal(dispatch);
      dispatch({ type: "CLOSE_PAYROLLGROUP_MODAL" });
  }

  const validationSchema = Yup.object().shape({
      GroupName: Yup.string().required("El nombre es requerido").max(100,'Maximo 100 caracteres'),
      PaymentScheme: Yup.string().required("Por favor seleccione una opción"),
      CompanyName: Yup.string().required("Por favor seleccione una opción"),
      BankAccount: Yup.string().required("La cuenta es requerida").max(100,'Maximo 100 caracteres'),
      PayrollPeriod: Yup.string().required("Por favor seleccione una opción")
  })
  return(
    <div>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={formData =>{
          const iDoc = Number(state._id)
          updatePayroll({
            variables:{
              updatePayrollGroupId:iDoc,
              input:{
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
              }
            }
          }).then(()=>{
            console.log("Estamos entrando")
            SuccessfulAlert({text: "Registro creado con éxito"})
          });
          handleClose();
        }}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur
      }) => (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.showCreate} fullWidth={false} maxWidth={"md"}>
      <Form onSubmit = {handleSubmit}>
        <div className="contenedorTituloModal">
          <p className="tituloModal">Crear grupo de nómina</p>
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
                value={values.GroupName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="contenedorError">
                <span className='errorInput'>{touched.GroupName && Boolean(errors.GroupName) && errors.GroupName}</span>
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
                value={values.PaymentScheme}
                onChange={handleChange}
                onBlur={handleBlur}
                className="inputSelectModal">
                  <option value="" className="optionSelect" disabled>Selecciona la categoría</option>
                  <option value="Nomina Estandar">Nómina estándar</option>
                  <option value="Nomina Mixta">Nómina Mixta</option>
                </select>
                <div className="contenedorError">
                  <span className='errorInput'>{touched.PaymentScheme && errors.PaymentScheme}</span>
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
                value={values.CompanyName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="inputSelectModal">
                  <option value="" className="optionSelect" disabled>Selecciona una empresa</option>
                    {
                     company?.map((company:any) => <option className="optionSelect" key={company?.id} value={company?.name}>{company?.name}</option>)
                    }
                </select>
                <div className="contenedorError">
                  <span className='errorInput'>{touched.CompanyName && errors.CompanyName}</span>
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
                value={values.BankAccount}
                onChange={handleChange}
                onBlur={handleBlur}/>
                <div className="contenedorError">
                  <span className='errorInput'>{touched.BankAccount && errors.BankAccount}</span>
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
                value={values.PayrollPeriod}
                onChange={handleChange}
                onBlur={handleBlur}
                className="inputSelectModal">
                  <option value=""  className="optionSelect" disabled>Selecciona el periodo</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Catorcenal">Catorcenal</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Mensual">Mensual</option>
                </select>
                <div className="contenedorError">
                  <span className='errorInput'>{touched.PayrollPeriod && errors.PayrollPeriod}</span>
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
                value={values.PayrollPeriodDays}
                onChange={handleChange}
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
                value={values.SubsidyEmployee}
                onChange={handleChange}
                className="inputSelectModalMedio contenedorSelectMedio">
                  <option value=""  className="optionSelect">Selecciona</option>
                  <option value="Periodica">Periódica</option>
                  <option value="Diaria">Diaria</option>
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
              <button autoFocus onClick={()=> handleClose()} className="botonCancelarModal" type="button" >
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
            )}
      </Formik>
    </div>
  )
}

export default CreatePayrollGroup

function resetForm(arg0: {}) {
  throw new Error('Function not implemented.');
}

