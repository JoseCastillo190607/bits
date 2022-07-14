import {
    Dialog,
    DialogContent,
  } from '@material-ui/core';
  import { Grid, TextField, InputLabel } from "@material-ui/core";
  import { useEffect, useState, useContext } from 'react';
  import { EventualPayrollModal } from '../../../interfaces/TabEventualPayroll.interfaces';
  import { useForm } from '../../../hooks/useForm';
  import { TabEventualPayrollContext } from '../../../context/PayrollContext/TabEventualPayrollContext';
  import '../Payroll.css'
  import "react-date-range/dist/styles.css";
  import "react-date-range/dist/theme/default.css";
  import { addDays } from 'date-fns';
  import { subMonths } from 'date-fns';
  import { es } from 'date-fns/locale';
  import { DateRange } from 'react-date-range'
  import { useMutation, useQuery } from "@apollo/client";
  import { GET_ALL_PAYROLL_GROUP, CREATE_EVENTUALPAYROLL,GET_ALL_EVENTUALPAYROLL } from "../../../Querys/querys";
  import styles from '../PayrollStyles.module.css'
  
  import { SuccessfulAlert } from "../../../alerts/successAlerts";
  import moment from 'moment';
  import EventualPayrollProcessContext from '../../../context/PayrollProcess/EventualPayrollProcessContext';
  import { createEventualnominaModal, clearEventualPayrollProcess } from '../../../context/PayrollProcess/EventualActions';
  import InputAdornment from "@mui/material/InputAdornment";
  
  const CreaEventualPayroll = (props: any) => {
    const {state, dispatch} = useContext(EventualPayrollProcessContext)
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
  
    const [show, setShow] = useState(false);

    const resultPayrollGroup = useQuery(GET_ALL_PAYROLL_GROUP);
    const allPayrollGroup = resultPayrollGroup.data?.GET_ALL_PAYROLL_GROUP;
  
    const [createNewPayroll] = useMutation(CREATE_EVENTUALPAYROLL, {
      refetchQueries: [{ query: GET_ALL_EVENTUALPAYROLL }],
    });
  
    const onSumbit = () => {
      const nuevoEstadoIncial = estadoInicial

      setEstadoInicial(nuevoEstadoIncial)
      console.log('estado Inicial',nuevoEstadoIncial)
      console.log('Foormulario', formulario)

      nuevoEstadoIncial.map((lis: any) => {
        createNewPayroll({
          variables: {
            input: {
              group_name: lis.group_name,
              payroll_type: formulario.payroll_type,
              init_date: stateCalendario[0].startDate,
              end_date: stateCalendario[0].endDate,
              id_group_payroll: parseInt(lis.id),
              AportacionPatronal:  formulario.AportacionPatronal.toString() === "true" ? true:false,
              AnioPTU: formulario.AnioPTU.toString(),
              MontoRepartirPTU: parseInt(formulario.MontoRepartirPTU.toString())
            },
          },
        });
      })

      SuccessfulAlert({
        title: "¡Exito!",
        text: "¡Se ha añadido nómina Eventual!",
      });

      clearEventualPayrollProcess({}, dispatch);
      
    }
  
    const toggleCalendar = () => {
      // if (!payroll_type) {
      //   alert("Debe seleccionar la frecuencia de pago.");
      //   return;
      // }
  
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
      const nuevoSeleccionadas = allPayrollGroup
      setSeleccionadas(nuevoSeleccionadas)
      const nuevoEstadoInicial = allPayrollGroup
      setEstadoInicial([])
    }
  
    const agregaTodas = () => {
      const nuevoSeleccionadas = allPayrollGroup
      setSeleccionadas([])
      const nuevoEstadoInicial = allPayrollGroup
      setEstadoInicial(nuevoEstadoInicial)
    }
  
  
    useEffect(() => {
      initData()
    }, [allPayrollGroup]);
  
    const initData = async () => {
    
      setEstadoInicial(allPayrollGroup)
    };
  
    const {
      payroll_type,
      init_date,
      end_date,
      AportacionPatronal,
      AnioPTU,
      MontoRepartirPTU,
      onChange, formulario, reset, setForm
    } = useForm<EventualPayrollModal>({
      payroll_type: "",
      init_date: "",
      end_date: "",
      AportacionPatronal: false,
      AnioPTU: "",
      MontoRepartirPTU: ""
    });
  
    const { addEventualPayrollOpen, setAddEventualPayrollOpen, EventualPayrollDispatch, } = useContext(TabEventualPayrollContext);
  
    const cerrarModal = () =>{
      console.log('hola')
      clearEventualPayrollProcess({},dispatch)
    }

    const rangeSelection = (selection: any)=>{
      //console.log(selection)
      setStateCalendario(selection);
      setShowCalendario(!showCalendario);
    }

    console.log('EstadoInicial',estadoInicial)
  
    return (
      <Dialog onClose={cerrarModal} aria-labelledby="customized-dialog-title" open={state.createEventual} fullWidth={false} maxWidth={"xl"}>
        <div className={styles.contenedorTitulo}>
          <span className={styles.tituloCrearModal}>Crear Nómina Eventual</span>
        </div>
        <DialogContent>
          <div className={styles.contenedorPrincipal}>
            <div className={styles.contenedorInputs}>
              <div className={styles.columnaUno}>
                <fieldset className={styles.fieldsetInput}>
                  <legend className={styles.tituloFieldset}>Tipo de nómina</legend>
                  <select
                    value={payroll_type}
                    className={styles.selectTipoNomina}
                    onChange={({ target }) =>{
                      onChange(target.value as string, "payroll_type");
                          if (target.value == "PTU") {
                            setShow(false);
                          } else {
                            setShow(true);
                          }
                        }
                    }
                    name="payroll_type"
                  >
                    <option value="" disabled className="optionSelect">
                      Tipo Nomina
                    </option>
                    <option value="Fondo Ahorro">Fondo Ahorro</option>
                    <option value="PTU">PTU</option>
                  </select>
                </fieldset>
              </div>
              {!show ? (   
                 <>
              <div className={styles.columnaDos}>
                  <div>
                    <span className={styles.textoFecha}> Monto Repartir </span>
                  </div>
                  <div>

                    <TextField
                      className={styles.inputFecha}
                      name="Total"
                      type="text"
                      value={MontoRepartirPTU}
                      onChange={({ target }) =>
                      onChange(target.value as string, "MontoRepartirPTU")
                      }
                      InputProps={{
                        type: 'number',
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  </div>
                  <div className={styles.columnaTres}>
                  <div>
                    <span className={styles.textoFecha}> Año </span>
                  </div>
                  <div>

                     <select
                        name="AnioPTU"
                        className={styles.r_select}
                        onChange={({ target }) =>
                        onChange(target.value as string, "AnioPTU")
                      }
                      >
                        <option value="">Selecciona...</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                      </select>
                  </div>
                    </div>
                  </>
                  ) : (
                    <>
                      <div className={styles.fechas}>
                      <div className={styles.radioitem}>
                        <input
                          type="radio"
                          name="tx"
                          id="ritemas"
                          checked={AportacionPatronal}
                          onChange={(e) => {
                            onChange(e.target.checked.toString(), "AportacionPatronal");
                          }}
                        />
                        <label htmlFor="ritemas"> Aportacion Patronal </label>
                      </div>

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
                    </>
                    )}
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
                    })
                  }
                </ul>
              </div>
            </div>
            <div className={styles.contenedorBotones}>
              <div className={styles.botonCancelar} onClick={cerrarModal}>
                <span className={styles.textoBoton}>Cancelar</span>
              </div>
              <div onClick={onSumbit} className={styles.botonCrear}>
                <span className={styles.textoBoton}>Crear</span>
              </div>
            </div>
          </div>
        </DialogContent>
  
      </Dialog>
    )
  }
  
  export default CreaEventualPayroll