import {
    useEffect,
    useState,
    useContext,
  } from "react";
  import {
    DialogActions
  } from "@material-ui/core";
  import { Grid, TextField, InputLabel } from "@material-ui/core";
  import {  Dialog } from "@material-ui/core";
  import style from "../Modals/CrearIncidenciasModal/CrearIncidencias.module.css";
  import {
    CREATE_SETTLEMENTPAYROLL,
    GET_ALL_SETTLEMENTPAYROLL,
    GET_ALL_USERS_COLLABORATOR,
    GET_ALL_DEDUCTIONS
  } from "../../../Querys/querys";
  import { useMutation, useQuery } from "@apollo/client";
  import { SuccessfulAlert } from "../../../alerts/successAlerts";
  import { ErrorAlert } from "../../../alerts/errorAlert";
  import { useForm } from "../../../hooks/useForm";
  import { SettlementPayrollModal } from "../../../interfaces/TabSettlementPayroll.interfaces";
  import SaveIcon from "@material-ui/icons/Save";
  import SettlementPayrollProcessContext from "../../../context/PayrollProcess/SettlementPayrollProcessContext";
  import { clearSettlementProcess, createSettlementModal } from "../../../context/PayrollProcess/SettlementActions";
  import { formatter } from "../../../helpers/formatoMoneda";
  import InputAdornment from "@mui/material/InputAdornment";
  import {useFormik} from "formik";
  import * as Yup from "yup";
  import { Form } from "semantic-ui-react";

  let fechas = "";
  
  const CrearIncidencias = (props: any) => {
    const {state: SettlementPayrollState, dispatch: SettlementPayrollDispatch} = useContext(SettlementPayrollProcessContext)
    const [estadoInicial, setEstadoInicial] = useState<any[]>([]);
    const [estadoFiltrado, setEstadoFiltrado] = useState<any[]>([]);
    const [seleccionadosConcepto, setSeleccionadosConcepto] = useState<any[]>([]);

    const resultPayrollCollaborator = useQuery(GET_ALL_USERS_COLLABORATOR);
    const allPayrollCollaborator = resultPayrollCollaborator.data?.GET_ALL_USERS_COLLABORATOR;

    const resultDeductions = useQuery(GET_ALL_DEDUCTIONS);
    const resultallDeductions = resultDeductions.data?.GET_ALL_DEDUCTIONS;
  
    useEffect(() => {
      initData();
    }, [allPayrollCollaborator]);
  
    const initData = async () => {
      setEstadoInicial(allPayrollCollaborator);
      setEstadoFiltrado(allPayrollCollaborator);
    };
  
    const [createSettlementPayRoll] = useMutation(CREATE_SETTLEMENTPAYROLL, {
      refetchQueries: [{ query: GET_ALL_SETTLEMENTPAYROLL }],
    });
  
    const {
      dischargeDate,
      dischargeType,
      reason,
      recessionJob,
      Taxable,
      NotTaxable,
      Mixed,
      Total,
      idConcept,
      idCollaborator,
      Concepts,
      onChange,
      formulario,
      reset,
      setForm,
    } = useForm<SettlementPayrollModal>({
      Total: 0,
      Taxable: false,
      NotTaxable: false,
      Mixed: false,
      idConcept: 0,
      dischargeDate: "",
      dischargeType: "",
      reason: "",
      recessionJob: "",
      idCollaborator: 0,
      Concepts: ""
    });


    const initialValues = () =>{
      return{
        Total: 0,
        Taxable: false,
        NotTaxable: false,
        Mixed: false,
        idConcept: 0,
        dischargeDate: "",
        dischargeType: "",
        reason: "",
        recessionJob: "",
        idCollaborator: 0,
        Concepts: ""
      }
    }

    const validationSchema = () =>{
      return{
        idCollaborator: Yup.string().required("Por favor seleccione una opción"),
        recessionJob: Yup.string().required("Por favor seleccione una opción"),
        dischargeType: Yup.string().required("Por favor seleccione una opción"),
        idConcept: Yup.string().required("Por favor seleccione una opción")
      }
    }


    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: Yup.object(validationSchema()),
      onSubmit:(formData,reset)=>{
        createSettlementPayRoll({
          variables: {
            input: {
              dischargeDate: formData.dischargeDate,
              dischargeType: formData.dischargeType,
              reason: formData.reason,
              recessionJob: formData.recessionJob,
              Taxable: formulario.Taxable.toString() === "true" ? true : false,
              NotTaxable: formulario.NotTaxable.toString() === "true" ? true : false,
              Mixed: formulario.Mixed.toString() === "true" ? true : false,
              idConcept: parseInt(formData.idConcept.toString()),
              Total: parseFloat(formData.Total.toString()),
              idCollaborator: parseInt(formData.idCollaborator.toString())
            },
          },
        }).then(()=>{
        SuccessfulAlert({text: "Registro creado con éxito"})
        formik.resetForm();
        clearSettlementProcess({}, SettlementPayrollDispatch);
        });
      }
    });

  
    // const onSumbit = async () => {
    //   if (formulario.dischargeType !== '' && formulario.dischargeDate !== '') {
    //     {
    //           createSettlementPayRoll({
    //             variables: {
    //               input: {
    //                 dischargeDate: formulario.dischargeDate,
    //                 dischargeType: formulario.dischargeType,
    //                 reason: formulario.reason,
    //                 recessionJob: formulario.recessionJob,
    //                 Taxable: formulario.Taxable.toString() === "true" ? true : false,
    //                 NotTaxable: formulario.NotTaxable.toString() === "true" ? true : false,
    //                 Mixed: formulario.Mixed.toString() === "true" ? true : false,
    //                 idConcept: parseInt(formulario.idConcept.toString()),
    //                 Total: parseFloat(formulario.Total.toString()),
    //                 idCollaborator: parseInt(formulario.idCollaborator.toString())
    //               },
    //             },
    //           })

    //       SuccessfulAlert({
    //         title: "¡Exito!",
    //         text: "¡Se ha añadido la solicitud de baja!",
    //       });

    //       clearSettlementProcess({}, SettlementPayrollDispatch);
    //     }
    //   } else {
    //     return ErrorAlert({ text: "Ingrese todos los datos." });
    //   }
    // };
  
  
    const filtrarCollaborator = (colaborador: string) => {
      console.log(colaborador);
  
      let datosfiltrados = estadoInicial.filter((lis) =>
        lis?.colaborator
          .toUpperCase()
          .includes(colaborador.toString().toUpperCase())
      );
      if (datosfiltrados.length <= 0) {
        datosfiltrados = estadoInicial;
      }
      setEstadoFiltrado(datosfiltrados);
    };
    
    const cerrarModal = () =>{
      // console.log('hola')
      clearSettlementProcess({}, SettlementPayrollDispatch);
    }
  
  
    return (
      <Dialog
        open={SettlementPayrollState.createSettlement}
        fullWidth={false}
        onClose={cerrarModal}
        maxWidth={"sm"}
      >
        <Form onSubmit = {formik.handleSubmit}>
        <div className={style.contenedorTitulo}>
          <span className={style.titulo}>Solicitud de baja</span>
        </div>
        <div className={style.contenedorPrincipal}>
          <fieldset className={style.fieldsetUpdate}>
            <legend className={style.tituloFieldsetNombre}>Consultar Colaborador</legend>
            <input
              className={style.inputUpdate}
              type="text"
              id="txtFiltro"
              onChange={(e) => filtrarCollaborator(e.target.value)}
            />
          </fieldset>
  
          <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>Colaborador *</legend>
            <select
              className={style.selectNombre}
              value={formik.values.idCollaborator}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="idCollaborator"
            >
              <option value={"" || ""} disabled>
                Seleccione...
              </option>
              {estadoFiltrado?.map((lis: any) => (
                <option
                  key={lis.id}
                  value={lis?.id}
                >
                  {lis.bussinesName}
                </option>
              ))}
            </select>
          </fieldset>
          <div  className={style.contenedorError}>
                <span  className={style.errorInput}>{formik.touched.idCollaborator && formik.errors.idCollaborator}</span>
              </div>
            <div>
              <div className={style.fechas}>
                <div>
                  <span className={style.textoFecha}>Fecha *</span>
                </div>
                <div>
                  <input
                    name="dischargeDate"
                    type="date"
                    className={style.inputFecha}
                    value={formik.values.dischargeDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>

            <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>Tipo de baja *</legend>
            <select
              className={style.selectNombre}
              value={formik.values.dischargeType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="dischargeType"
            >
              <option value={"" || ""} disabled>
                Seleccione...
              </option>
              <option value="Voluntaria Planeada">Voluntaria Planeada</option>
              <option value="Voluntaria no planeada">Voluntaria no planeada</option>
              <option value="Involuntaria planeada">Involuntaria planeada</option>
              <option value="Involuntaria no planeada">Involuntaria no planeada</option>
            </select>
          </fieldset>
          <div  className={style.contenedorError}>
            <span  className={style.errorInput}>{formik.touched.dischargeType && formik.errors.dischargeType}</span>
          </div>

            <fieldset className={style.fieldsetUpdate}>
            <legend className={style.tituloFieldsetNombre}>Razón</legend>
            <input
              className={style.inputUpdate}
              name="reason"
              type="text"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </fieldset>


          <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>Tipo de recisión para cálculo *</legend>
            <select
              className={style.selectNombre}
              value={formik.values.recessionJob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="recessionJob"
            >
              <option value={"" || ""} disabled>
                Seleccione...
              </option>
              <option value="Finiquito">Finiquito</option>
              <option value="Liquidación">Liquidación</option>
            </select>
          </fieldset>
          <div  className={style.contenedorError}>
            <span  className={style.errorInput}>{formik.touched.recessionJob && formik.errors.recessionJob}</span>
          </div>


          <div className={style.radioitem}>
            <input
              type="radio"
              name="tx"
              id="ritema"
              onChange={(e) => onChange(e.target.checked.toString(), "Taxable")}
            />
            <label htmlFor="ritema"> Gravable </label>
          </div>
          <div className={style.radioitem}>
            <input
              type="radio"
              name="tx"
              id="ritemb"
              onChange={(e) =>
                onChange(e.target.checked.toString(), "NotTaxable")
              }
            />
            <label htmlFor="ritemb"> No Gravable </label>
          </div>
          <div className={style.radioitem}>
            <input
              type="radio"
              name="tx"
              id="ritemc"
              onChange={(e) => onChange(e.target.checked.toString(), "Mixed")}
            />
            <label htmlFor="ritemc"> Ambas </label>
          </div>

          <fieldset className={style.fieldsetUpdate}>
              <legend className={style.tituloFieldsetNombre}>Importe de incidencias</legend>
              <TextField
                className={style.inputUpdate}
                name="Total"
                type="text"
                value={formik.values.Total}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  type: 'number',
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </fieldset>

          <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>Concepto *</legend>
            <select
              className={style.selectNombre}
              value={formik.values.idConcept}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="idConcept"
            >
              <option value={"" || ""}>{""}</option>
              {resultallDeductions?.map((lis: any) => (
                <option
                  key={lis?.id}
                  value={lis?.id}
                >
                  {lis.concept_type}
                </option>
              ))}
            </select>
          </fieldset>    
          <div>
            <ul className={style.contenedorLista}>
              {seleccionadosConcepto.map((lis: any) => (
                <li className={style.listaNombres}>
                  <div className={style.nombre}> {lis.nombre} </div>
                </li>
              ))}
            </ul>
          </div>
          <div  className={style.contenedorError}>
            <span  className={style.errorInput}>{formik.touched.idConcept && formik.errors.idConcept}</span>
          </div>
          <DialogActions className={style.contenedorAcciones}>
            <div className={style.contenedorBotones}>
              <button className={style.botonCancelar} onClick={cerrarModal}>
                Cancelar
              </button>
              <button className={style.botonAgregar}  type="submit">
                <div className={style.iconoAgregar}>
                  <SaveIcon />
                </div>
                <div>
                  <span className={style.textoAgregar}>+ Solicitar</span>
                </div>
              </button>
            </div>
          </DialogActions>
        </div>
        </Form>
      </Dialog>
    );
  };
  
  export default CrearIncidencias;
  