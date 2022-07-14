
import {
    useEffect,
    useState,
    useContext,
    SetStateAction,
  } from "react";
  import {
    DialogActions,
  } from "@material-ui/core";
  import { Dialog } from "@material-ui/core";
  import style from "./CrearIncidencias.module.css";
  import {
    CREATE_PAYROLL_INCIDENT,
    GET_ALL_PAYROLL_GROUP,
    GET_PAYROLLCOLLABORATOR,
  } from "../../../Querys/querys";
  import { useMutation, useQuery } from "@apollo/client";
  import { useParams } from "react-router-dom";
  import { SuccessfulAlert } from "../../../alerts/successAlerts";
  import { ErrorAlert } from "../../../alerts/errorAlert";
  import { useForm } from "../../../hooks/useForm";
  import { IncidenciaModal } from "../../../interfaces/TabPayroll.interfaces";
  import { GET_ALL_PERCEPTIONS } from "../../../Querys/querys";
  import { GET_ALL_DEDUCTIONS } from "../../../Querys/querys";
  import DeduccionContext from "../../../context/ConfigPayrollContext/DeduccionContext";
  import IncidenciasContext from "../../../context/IncidenciasContext/IncidenciasContext";
  import SaveIcon from "@material-ui/icons/Save";
 // import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";
  import { clearPayrollProcess,createincidenciaModal } from "../../../context/PayrollProcess/Actions";
  import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
  import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
 

  let fechas = "";
  
  const Incidents = (props: any) => {
    const { state: incidenciasState, dispatch: dispatchState } =
      useContext(IncidenciasContext);
    const { id, tab } = useParams<any>();
    // const {state: payrollState, dispatch: payrollDispatch} = useContext(PayrollProcessContext)
    const {state, dispatch} = useContext(CalendarsContext)

    const [seleccionados, setSeleccionados] = useState<any[]>([]);
    const [seleccionadosdelete, setSeleccionadosdelete] = useState<any[]>([]);
    const [estadoInicial, setEstadoInicial] = useState<any[]>([]);
    const [estadoFiltrado, setEstadoFiltrado] = useState<any[]>([]);
    //const { state, dispatch } = useContext(DeduccionContext);
    const [seleccionadosConcepto, setSeleccionadosConcepto] = useState<any[]>([]);
    const [estadoInicialConcepto, setEstadoInicialConcepto] = useState<any[]>([]);
    const [seleccionadosFecha, setSeleccionadosFecha] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [showC, setShowColaboradores] = useState(false);
    const [showCF, setShowFechas] = useState(false);
    const resultPayrollCollaborator = useQuery(GET_PAYROLLCOLLABORATOR, {
      variables: { getPayrollcollaboratorId: id },
    });
    const allPayrollCollaborator =
      resultPayrollCollaborator.data?.GET_PAYROLLCOLLABORATOR;
  
    const resultDeductions = useQuery(GET_ALL_DEDUCTIONS);
    const resultallDeductions = resultDeductions.data?.GET_ALL_DEDUCTIONS;
  
    const resultPerceptions = useQuery(GET_ALL_PERCEPTIONS);
    const resultallPerceptions = resultPerceptions.data?.GET_ALL_PERCEPTIONS;
    const conceptoagrupado: SetStateAction<any[]> = [];
  
    console.log("estado co", allPayrollCollaborator);
    useEffect(() => {
      initData();
    }, [incidenciasState.createModal]);
  
    const initData = async () => {
      setEstadoInicial(allPayrollCollaborator);
      setEstadoFiltrado(allPayrollCollaborator);
      setEstadoInicialConcepto(conceptoagrupado);
    };
  
    const [createPayRollIncident] = useMutation(CREATE_PAYROLL_INCIDENT, {
      refetchQueries: [{ query: GET_ALL_PAYROLL_GROUP }],
    });
  
    const {
      idPayroll,
      idCollaborator,
      Incident_type,
      InitDate,
      EndDate,
      Total,
      Taxable,
      NotTaxable,
      Mixed,
      TipoIncP,
      TipoIncC,
      idConcept,
      Dias,
      Horas,
      Comentarios,
      typeconcept,
      Periodico,
      FechaPeriodica,
      onChange,
      formulario,
      reset,
      setForm,
    } = useForm<IncidenciaModal>({
      idPayroll: 0,
      idCollaborator: 0,
      Incident_type: "",
      InitDate: "",
      EndDate: "",
      Total: 0,
      Taxable: false,
      NotTaxable: false,
      Mixed: false,
      TipoIncP: false,
      TipoIncC: false,
      idConcept: 0,
      Dias: 0,
      Horas: 0,
      Comentarios: "",
      typeconcept: "",
      Periodico: false,
      FechaPeriodica: ""
    });
  
    const onSumbit = async () => {
      console.log("info", formulario);
      if (id !== 0) {
        {
          if(formulario.Incident_type === "Dinero"){
            seleccionados?.map((lis: any) =>
              createPayRollIncident({
                variables: {
                  input: {
                    idPayroll: parseInt(id),
                    idCollaborator: parseInt(lis.id),
                    Incident_type: formulario.Incident_type,
                    InitDate:  null,
                    Total: parseFloat(formulario.Total.toString()),
                    Taxable: formulario.Taxable.toString() === "true" ? true : false,
                    NotTaxable: formulario.NotTaxable.toString() === "true" ? true : false,
                    Mixed: formulario.Mixed.toString() === "true" ? true : false,
                    idConcept: parseInt(formulario.idConcept.toString()),
                    Horas: 0,
                    Dias: 0,
                    Comentarios: formulario.Comentarios, 
                    TypeConcept: formulario.typeconcept
                  },
                },
              })
          );
          }else
          {
            seleccionados?.map((lis: any) =>
            seleccionadosFecha?.map((fecha: any) =>
              createPayRollIncident({
                variables: {
                  input: {
                    idPayroll: parseInt(id),
                    idCollaborator: parseInt(lis.id),
                    Incident_type: formulario.Incident_type,
                    InitDate: fecha.fecha,
                    Total: parseFloat(formulario.Total.toString()),
                    Taxable: formulario.Taxable.toString() === "true" ? true : false,
                    NotTaxable: formulario.NotTaxable.toString() === "true" ? true : false,
                    Mixed: formulario.Mixed.toString() === "true" ? true : false,
                    idConcept: parseInt(formulario.idConcept.toString()),
                    Horas: parseInt(fecha.Horas.toString()),
                    Dias: parseInt(formulario.Dias.toString()),
                    Comentarios: formulario.Comentarios, 
                    TypeConcept: formulario.typeconcept
                  },
                },
              })
            )
          );
          }
          
  
          SuccessfulAlert({
            title: "¡Exito!",
            text: "¡Se ha añadido la incidencia!",
          });
  
        }
      } else {
        return ErrorAlert({ text: "Ingrese todos los datos." });
      }
    };
  
    const agregaColaborador = (colaborador: any) => {
      setSeleccionados([
        ...seleccionados,
        { id: colaborador.id, nombre: colaborador.colaborator },
      ]);
      const nuevoSeleccionadas = estadoInicial.filter(
        (lis) => lis?.id !== colaborador.id
      );
  
      const filtrados = estadoInicial.filter((lis) => lis?.id !== colaborador.id);
      setEstadoInicial(nuevoSeleccionadas);
      setEstadoFiltrado(filtrados);
    };
  
    const EliminardeListaFechas = () => {
      const checkedBoxes = document.querySelectorAll(
        '#fechas > [type="checkbox"]:checked'
      );
  
      let dateToDelete: { fecha: string; id: string }[] = [];
      checkedBoxes.forEach((checkElement) => {
        dateToDelete.push({
          fecha: checkElement.className,
          id: checkElement.className,
        });
      });
      console.log("chk_1", dateToDelete);
  
      const FechasNuevas = seleccionadosFecha.filter((fecha) => {
        return !dateToDelete
          .map((date) => {
            return date.id;
          })
          .includes(fecha?.id);
      });
  
      console.log("chk_2", seleccionadosFecha);
      console.log("chk_3", FechasNuevas);
  
      setSeleccionadosFecha([...FechasNuevas]);
    };
  
    const EliminardeLista = () => {
      const checkedBoxes = document.querySelectorAll(
        '#colaboladores > [type="checkbox"]:checked'
      );
      let workerToDelete: { id: string; colaborator: string }[] = [];
      console.log("chk_items_seleccionados", checkedBoxes);
  
      checkedBoxes.forEach((checkElement) => {
        workerToDelete.push({
          id: checkElement.id,
          colaborator: checkElement.className,
        });
      });
  
      console.log("chk_workerToDelete", workerToDelete);
  
      setEstadoFiltrado([...estadoFiltrado, ...workerToDelete]);
      setEstadoInicial([...estadoInicial, ...workerToDelete]);
  
      const nuevoSeleccionadas = seleccionados.filter((persona) => {
        return !workerToDelete
          .map((worker) => {
            return worker.id;
          })
          .includes(persona?.id);
      });
      // console.log("chk_workerToDeleteww",nuevoSeleccionadas)
      console.log("chk_nuevoSeleccionadas", nuevoSeleccionadas);
  
      setSeleccionados(nuevoSeleccionadas);
    };
  
    const agregaConcepto = (concepto: any) => {
      setSeleccionadosConcepto([
        ...seleccionadosConcepto,
        { id: concepto[0], nombre: concepto[1], tipo: concepto[3] },
      ]);
  
      console.log("estado", estadoInicial);
      const nuevoSeleccionadasConcepto = estadoInicialConcepto.filter(
        (lis) => lis?.id !== concepto[0] && lis?.__typename !== concepto[3]
      );
      console.log("estado", nuevoSeleccionadasConcepto);
      setEstadoInicialConcepto(nuevoSeleccionadasConcepto);
    };
  
    const agregarFecha = () => {
      let valor = formulario.InitDate;
      console.log("valor", valor.length);
      let horas = formulario.Horas;
      let dias = formulario.Dias;
  
      const fechas_agregadas = seleccionadosFecha.filter(
        (lis) => lis?.fecha === valor
      );
  
      console.log("valor", valor.length > 1,"ltamaño",seleccionadosFecha.length,"dias", dias , "horas", horas, seleccionadosFecha.length <= dias, seleccionadosFecha.map((lis: any) => (!lis.fecha.includes(valor))), seleccionadosFecha);
      if ((valor.length > 1) && (seleccionadosFecha.length < dias) && (fechas_agregadas.length === 0)) {
        setSeleccionadosFecha([
          ...seleccionadosFecha,
          { fecha: formulario.InitDate, id: formulario.InitDate, Horas: horas },
        ]);
  
        console.log(valor);
        fechas = fechas += "Horas:" + horas + "/" + valor + ",";
      }
    };
  
    const onChange2 = (e: any) => {
      let seleccionado = e.nativeEvent.target;
  
      var index = e.nativeEvent.target.selectedIndex;
      let text = e.nativeEvent.target[index].text;
      let tipo = e.nativeEvent.target[index].className;
      const datos = [e.target.value, text, tipo];
      console.log("target", datos, e.nativeEvent.target[index]);
      agregaConcepto(datos);
    };
  
    const filtrarConcepto = (tipo: any) => {
      console.log(tipo);
      if (tipo === "c") {
        formulario.typeconcept = "Percepcion";
        setEstadoInicialConcepto(resultallPerceptions);
        setSeleccionadosConcepto([]);
      } else {
        formulario.typeconcept = "Deduccion";
        setSeleccionadosConcepto([]);
        setEstadoInicialConcepto(resultallDeductions);
      }
    };
  
    const filtrarCollaborator = (colaborador: string) => {
      console.log(colaborador);
  
      let datosfiltrados = estadoInicial?.filter((lis) =>
        lis?.colaborator
          .toUpperCase()
          .includes(colaborador.toString().toUpperCase())
      );
      if (datosfiltrados?.length <= 0) {
        datosfiltrados = estadoInicial;
      }
      console.log("estado inicia", estadoInicial);
      console.log("varr new", datosfiltrados);
      setEstadoFiltrado(datosfiltrados);
    };
    //const concepto =
    const createModal = (id: string, createModal: boolean) => {
      createincidenciaModal({ id, createModal }, dispatch);
    };
    const handleClose = () => {
        clearCalendarsModal({}, dispatch);    
    };
  
    return (
    <div>
        <div className={style.contenedorTitulo}>
          <span className={style.titulo}>Agregar Incidencia</span>
        </div>
        <div className={style.contenedorPrincipal}>
          <fieldset className={style.fieldsetUpdate}>
            <legend className={style.tituloFieldsetNombre}>Consultar</legend>
            <input
              className={style.inputUpdate}
              type="text"
              id="txtFiltro"
              onChange={(e) => filtrarCollaborator(e.target.value)}
            />
          </fieldset>
  
          <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>Nombre *</legend>
            <select
              className={style.selectNombre}
              onChange={({ target }) =>
                onChange(target.value as string, "idCollaborator")
              }
            >
              <option value={"" || ""} disabled>
                Seleccione...
              </option>
              {estadoFiltrado?.map((lis: any) => (
                <option
                  key={lis.id}
                  value={lis?.id}
                  onClick={() => agregaColaborador(lis)}
                >
                  {lis.colaborator}
                </option>
              ))}
            </select>
          </fieldset>
          <div className={style.contenedortotales}>
            <button
              className={style.divtotales}
              onClick={() => {
                setShowColaboradores(!showC);
              }}
            >
              <span className={style.textoDivTotales}>
                {" "}
                Ver Colaboladores ({seleccionados.length}){" "}
              </span>
            </button>
            {showC ? (
              <div className={style.DivSeleccionados}>
                <ul className={style.contenedorLista}>
                  {seleccionados.map((lis: any) => (
                    <li className={style.listaNombres}>
                      <div id="colaboladores" className={style.checkboxitem}>
                        <input
                          id={lis.id}
                          key={lis.id}
                          type="checkbox"
                          value={lis.id}
                          className={lis.nombre}
                        ></input>
                        <label htmlFor={lis.id}> {lis.nombre} </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className={style.botonEliminarList}
                  onClick={EliminardeLista}
                >
                  <img
                    src="/assets/icons/eliminar-lista.svg"
                    alt="Eliminar"
                    className={style.EliminarImg}
                  />
                  Eliminar
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>
              Tipo Incidencia *
            </legend>
            <select
              id="SeleccionarTipoIncidencia"
              className={style.selectNombre}
              name="Incident_type"
              onChange={({ target }) => {
                onChange(target.value as string, "Incident_type");
                setShow(!show);
              }}
            >
              <option value={"" || ""} disabled selected>
                Tipo de incidencia *
              </option>
              <option key="Dinero" value="Dinero">
              Dinero
              </option>
              <option key="Tiempo" value="Tiempo">
              Tiempo
              </option>
            </select>
          </fieldset> */}
          <div className={style.radioitem}>
            <input
              type="radio"
              name="typeconcept"
              id="typeconcepta"
              value="c"
              onChange={(e) => filtrarConcepto(e.target.value)}
            />
            <label htmlFor="typeconcepta"> Percepción</label>
          </div>
          <div className={style.radioitem}>
            <input
              type="radio"
              name="typeconcept"
              id="typeconceptb"
              value="d"
              onChange={(e) => filtrarConcepto(e.target.value)}
            />
            <label htmlFor="typeconceptb"> Deducción </label>
          </div>
            <div>
              <div className={style.fechas}>
                <div>
                  <span className={style.textoFecha}> Días </span>
                </div>
                <div>
                  <input
                    name="Dias"
                    id="Dias"
                    type="number"
                    pattern="[0-9]*"
                    className={style.inputFecha}
                    onChange={({ target }) =>
                      onChange(target.value as string, "Dias")
                    }
                  />
                </div>
                <div>
                  <span className={style.textoFecha}> Horas </span>
                </div>
                <div>
                  <input
                    name="Horas"
                    type="number"
                    step="1"
                    className={style.inputFecha}
                    onChange={({ target }) =>
                      onChange(target.value as string, "Horas")
                    }
                  ></input>
                </div>
                <div>
                  <span className={style.textoFecha}>Fecha *</span>
                </div>
                <div>
                  <input
                    name="InitDate"
                    type="date"
                    className={style.inputFecha}
                    onChange={({ target }) =>
                      onChange(target.value as string, "InitDate")
                    }
                  />
                </div>
                <div className={style.contenedorFlecha}>
                  <button
                    className={style.botonAgregarFecha}
                    onClick={agregarFecha}
                    type="button"
                  >
                    <span className={style.iconoAgregar}>+</span>
                  </button>
                </div>
              </div>
  
              {/* <div className={style.fechasseleccionadas}>
                {seleccionadosFecha.map((lis: any) => (
                  <div className={style.fechaitem}> {lis.fecha} </div>
                ))}
              </div> */}
  
              <div className={style.contenedortotales}>
                <button
                  className={style.divtotales}
                  onClick={() => {
                    setShowFechas(!showCF);
                  }}
                >
                  <span className={style.textoDivTotales}>
                    Ver Fechas ({seleccionadosFecha.length})
                  </span>
                </button>
                {showCF ? (
                  <div className={style.DivSeleccionados}>
                    <ul className={style.contenedorLista}>
                      {seleccionadosFecha?.map((lis: any, index) => (
                        <li className={style.listaNombres}>
                          <div id="fechas" className={style.checkboxitem}>
                            <input
                              id={index.toString()}
                              key={index}
                              type="checkbox"
                              value={index}
                              className={lis.fecha}
                            ></input>
                            <label htmlFor={index.toString()}>
                              {"Horas: "+ lis.Horas + "   Fecha: " + lis.fecha}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={style.botonEliminarList}
                      onClick={EliminardeListaFechas}
                    >
                      <img
                        src="/assets/icons/eliminar-lista.svg"
                        alt="Eliminar"
                        className={style.EliminarImg}
                      />
                      Eliminar
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
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
            <label htmlFor="ritemc"> Total </label>
          </div>
  
          <fieldset className={style.fieldsetNombre}>
            <legend className={style.tituloFieldsetNombre}>Concepto *</legend>
            <select
              className={style.selectNombre}
              onChange={(e) => {
                onChange(e.target.value as string, "idConcept");
                //onChange2(e);
              }}
            >
              <option value={"" || ""}>{""}</option>
              {estadoInicialConcepto?.map((lis: any) => (
                <option
                  className={lis.__typename}
                  key={lis.id + lis.__typename}
                  value={lis?.id}
                >
                  {lis.ConceptName?.length ? lis.ConceptName : lis.concept_type}
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
          <fieldset className={style.fieldsetUpdate}>
            <legend className={style.tituloFieldsetNombre}>Comentarios</legend>
            <input
              className={style.inputUpdate}
              name="Comentarios"
              type="text"
              onChange={({ target }) => onChange(target.value, "Comentarios")}
            />
          </fieldset>
  
          <DialogActions className={style.contenedorAcciones}>
            <div className={style.contenedorBotones}>
              <button className={style.botonCancelar} onClick={handleClose}>
                Cancelar
              </button>
              <button className={style.botonAgregar} onClick={onSumbit}>
                <div className={style.iconoAgregar}>
                  <SaveIcon />
                </div>
                <div>
                  <span className={style.textoAgregar}>Guardar</span>
                </div>
              </button>
            </div>
            <div>
              <button className={style.botonNuevo}>
                <div>
                  <span className={style.iconoAgregar}>+</span>
                </div>
              </button>
            </div>
          </DialogActions>
        </div>
    </div>
    );
  };
  
  export default Incidents;
  