import {
  Dialog,
  DialogContent,
} from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { PayrollModal } from '../../../interfaces/TabPayroll.interfaces';
import { useForm } from '../../../hooks/useForm';
import { TabPayrollContext } from '../../../context/PayrollContext/TabPayrollContext';
import '../Payroll.css'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays } from 'date-fns';
import { subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-date-range'
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PAYROLL_GROUP, CREATE_PAYROLL,GET_ALL_PAYROLL } from "../../../Querys/querys";
import styles from '../PayrollStyles.module.css'
import moment from 'moment';
import PayrollProcessContext from '../../../context/PayrollProcess/PayrollProcessContext';
import { createPrenominaModal } from '../../../context/PayrollProcess/Actions';
import { SuccessfulAlert } from '../../../alerts/successAlerts';


const CreaPayroll = (props: any) => {
  const {state, dispatch} = useContext(PayrollProcessContext)
  const [estadoInicial, setEstadoInicial] = useState<any[]>([])
  const [seleccionadas, setSeleccionadas] = useState<any[]>([])
  const [showCalendario, setShowCalendario] = useState(false);
  const [stateCalendario, setStateCalendario] = useState([
    {
      startDate: subMonths(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: "selection"
    }]
  );

  const resultPayrollGroup = useQuery(GET_ALL_PAYROLL_GROUP);
  const allPayrollGroup = resultPayrollGroup.data?.GET_ALL_PAYROLL_GROUP;

  const [createNewPayroll] = useMutation(CREATE_PAYROLL, {
    refetchQueries: [{ query: GET_ALL_PAYROLL }],
  });

  const guardarInformacion = () => {

    const nuevoEstadoIncial = estadoInicial.filter((lis) => lis?.payroll_period === formulario.PaymentFrecuency)


    setEstadoInicial(nuevoEstadoIncial)

    nuevoEstadoIncial.map((lis: any) => {
      createNewPayroll({
        variables: {
          input: {
            group_name: lis.group_name,
            frecuency_payment: formulario.PaymentFrecuency,
            init_date: stateCalendario[0].startDate,
            end_date: stateCalendario[0].endDate,
            id_group_payroll: parseInt(lis.id)
          },
        },
      });
    })
    
    SuccessfulAlert({text: "Registro creado con éxito"})
    cerrarModal()
  }

  const toggleCalendar = () => {
    if (!PaymentFrecuency) {
      alert("Debe seleccionar la frecuencia de pago.");
      return;
    }

    // setShowCalendario(!showCalendario);
    if(showCalendario === false){
      setShowCalendario(true);
    }
  }

  const eliminaSeleccionada = (objeto: any) => {
    setSeleccionadas([...seleccionadas, { id: objeto.id, group_name: objeto.group_name, payroll_period: objeto.payroll_period }])
    const nuevoSeleccionadas = estadoInicial.filter((lis) => lis?.id !== objeto.id)
    setEstadoInicial(nuevoSeleccionadas)
  }

  const agregaSeleccionadas = (objeto: any) => {
    const agregaSeleccionadas = allPayrollGroup.filter((lis: any) => lis?.id === objeto.id)
    agregaSeleccionadas.map((lis: any) => {
      setEstadoInicial([...estadoInicial, lis])
    })
    const eliminaDisponibles = seleccionadas.filter((lis: any) => lis?.id !== objeto.id)
    setSeleccionadas(eliminaDisponibles)
  }

  const eliminaTodas = () => {
    const nuevoSeleccionadas = allPayrollGroup.filter((lis: any) => lis?.payroll_period === formulario.PaymentFrecuency)
    setSeleccionadas(nuevoSeleccionadas)
    const nuevoEstadoInicial = allPayrollGroup.filter((lis: any) => lis?.payroll_period !== formulario.PaymentFrecuency)
    setEstadoInicial(nuevoEstadoInicial)
  }

  const agregaTodas = () => {
    const nuevoSeleccionadas = allPayrollGroup.filter((lis: any) => lis?.payroll_period !== formulario.PaymentFrecuency)
    setSeleccionadas(nuevoSeleccionadas)
    const nuevoEstadoInicial = allPayrollGroup.filter((lis: any) => lis?.payroll_period === formulario.PaymentFrecuency)
    setEstadoInicial(nuevoEstadoInicial)
  }


  useEffect(() => {
    initData()
  }, [allPayrollGroup]);

  const initData = async () => {
    setEstadoInicial(allPayrollGroup)
  };

  const {
    PayrollType,
    InitDate,
    EndDate,
    PaymentFrecuency,
    PayrollGroups,
    onChange, formulario, reset, setForm
  } = useForm<PayrollModal>({
    PayrollType: "",
    InitDate: "",
    EndDate: "",
    PaymentFrecuency: "",
    PayrollGroups: ""
  });

  const { addPayrollOpen, setAddPayrollOpen, PayrollDispatch, } = useContext(TabPayrollContext);

  const handleClose = () => {
    // Clean modal
    reset();

    // Close modal
    setAddPayrollOpen();
  }

  const cerrarModal = () =>{
    console.log('hola')
    createPrenominaModal({id: '', createPrenomina: false},dispatch)
  }

  const rangeSelection = (selection: any)=>{
    //console.log(selection)
    setStateCalendario(selection);
    setShowCalendario(!showCalendario);
  }

  return (
    <Dialog onClose={cerrarModal} aria-labelledby="customized-dialog-title" open={state.createPrenomina} fullWidth={false} maxWidth={"md"}>
      <div className={styles.contenedorTitulo}>
        <span className={styles.tituloCrearModal}>Crear pre-nómina</span>
      </div>
      <DialogContent>
        <div className={styles.contenedorPrincipal}>
          <div className={styles.contenedorInputs}>

            <div className={styles.columnaUno}>
              <fieldset className={styles.fieldsetInput}>
                <legend className={styles.tituloFieldset}>Tipo de nómina</legend>
                <select
                  value={PayrollType}
                  className={styles.selectTipoNomina}
                  onChange={({ target }) =>
                    onChange(target.value as string, "PayrollType")
                  }
                  name="PayrollType"
                >
                  <option value="" disabled className="optionSelect">
                    Tipo Nomina
                  </option>
                  <option value="Periodica">Periódica</option>
                  <option value="Extraordinaria">Extraordinaria</option>
                </select>
              </fieldset>
            </div>

            <div className={styles.columnaDos}>
            <fieldset className={styles.fieldsetInput}>
            <legend className={styles.tituloFieldset}>Frecuencia de pago</legend>
              <select
                value={PaymentFrecuency}
                onChange={({ target }) =>
                  onChange(target.value as string, "PaymentFrecuency")
                }
                name="PaymentFrecuency"
                className={styles.selectTipoNomina}
              >
                <option value="" disabled className="optionSelect">
                  Frecuencia de pago
                </option>
                <option value="Semanal">Semanal</option>
                <option value="Catorcenal">Catorcenal</option>
                <option value="Quincenal">Quincenal</option>
                <option value="Mensual">Mensual</option>
              </select>
            </fieldset>
            </div>

            <div className={styles.columnaTres} onClick={() => toggleCalendar()}>
              <div className={styles.contenedorFechas}>
                <div >
                  {stateCalendario.map(home => <div id="hora">
                    <span className={styles.textoFecha}>{new Date(home.startDate).toLocaleDateString()} - {new Date(home.endDate).toLocaleDateString()}</span></div>)}

                </div>
                <div className={styles.contenedorCalendario}>
                  <img
                    className={styles.calendario}
                    src="/assets/svg/icono-calendario.svg"
                    onClick={() => toggleCalendar()}
                    alt="Editar" />
                  {
                    (showCalendario ?
                      <DateRange className="Prueba"
                        onChange={(item: any) => {
                          const startDate = moment(item.selection.startDate);
                          const endDate = moment(item.selection.endDate);
                          const dayDiff = endDate.diff(startDate, "days");
                          
                          if (PaymentFrecuency === "Catorcenal" && dayDiff !== 13) {
                            alert("Para la nomina catorcenal debe seleccionar 14 días.");
                            return;
                          } else if (PaymentFrecuency === "Semanal" && dayDiff !== 6) {
                            alert("Para la nomina semanal debe seleccionar 7 días.");
                            return;
                          } else if (PaymentFrecuency === "Mensual" && (moment(endDate).endOf("month").date() !== endDate.date() || moment(startDate).startOf("month").date() !== startDate.date() )) {
                            alert("Para la nomina mensual debe seleccionar todo el mes.");
                            return;
                          }

                          // setStateCalendario([item.selection]);
                          rangeSelection([item.selection])
                        }}
                        moveRangeOnFirstSelection={false}
                        locale={es}
                        ranges={stateCalendario}
                        scroll={{ enabled: true }}
                      /> : null
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={styles.contenedorTitulosColumnas}>
            <div className={styles.contenedorTituloUno}>
              <span className={styles.titulosColumnas}>Todos los grupos de nómina disponibles</span>
            </div>
            <div className={styles.contenedorTituloDos}>
              <span className={styles.titulosColumnas}>Grupos de nóminas seleccionadas</span>
            </div>
          </div>
          <div className={styles.contenedorColumnas}>
            <div>
              <div className={styles.columnaTabla}>
                <ul className='ulDisponibles'>
                  {
                    seleccionadas && seleccionadas.map((item: any) => {
                      //if(item && item.status==='Pending')
                      return (
                        item.payroll_period === formulario.PaymentFrecuency && (
                          <>
                            <li className="listaGruposDisponibles">
                              <div>
                                <span className="textoGrupoDisponibles">
                                  {item.group_name}
                                </span>
                              </div>
                              <div
                                className="botonListaDisponibles"
                                onClick={() => agregaSeleccionadas({ id: item.id, group_name: item.group_name })}>
                                <img className={styles.imagenCursor} src='/assets/icons/icono-flecha-derecha.svg' />
                              </div>
                            </li>
                          </>
                        )
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className={styles.botonIzquierda}>
                <img
                  onClick={() => eliminaTodas()}
                  className={styles.imagenCursor}
                  src='/assets/icons/icono-flecha-izquierda.svg' />
              </div>
              <div className={styles.botonDerecha}>
                <img
                  onClick={() => agregaTodas()}
                  className={styles.imagenCursor}
                  src='/assets/icons/icono-flecha-derecha.svg' />
              </div>
            </div>
            <div className={styles.columnaTabla}>
              <ul className='ulDisponibles'>
                {
                  estadoInicial && estadoInicial.map((item: any) => {
                    //if(item && item.status==='Pending')
                    return (
                      item.payroll_period === formulario.PaymentFrecuency && (
                        <>
                          <li className="listaGruposSeleccionadas">
                            <div
                              className="botonListaSeleccionadas"
                              onClick={() => eliminaSeleccionada({ id: item.id, group_name: item.group_name, payroll_period: item.payroll_period })}>
                              <img className={styles.imagenCursor} src='/assets/icons/icono-flecha-izquierda.svg' />
                            </div>
                            <div>
                              <span className="textoGrupoSeleccionadas">
                                {item.group_name}
                              </span>
                            </div>
                          </li>
                        </>
                      )
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className={styles.contenedorBotones}>
            <div className={styles.botonCancelar} onClick={cerrarModal}>
              <span className={styles.textoBoton}>Cancelar</span>
            </div>
            <div onClick={() => guardarInformacion()} className={styles.botonCrear}>
              <span className={styles.textoBoton}>Crear</span>
            </div>
          </div>
        </div>
      </DialogContent>

    </Dialog>
  )
}

export default CreaPayroll