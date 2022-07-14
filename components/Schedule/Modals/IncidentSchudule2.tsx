import { SetStateAction, useEffect, ChangeEvent, useContext, useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { 
    GET_ALL_PROJECT, 
    CREATE_EVENT, 
    GET_PAYROLLCOLLABORATOR, 
    GET_ALL_PERCEPTIONS,
    GET_ALL_PERCEPTIONS_CALENDAR,
    GET_ALL_DEDUCTIONS,
    GET_DEDUCTIONS_CALENDAR,
    CREATE_PAYROLL_INCIDENT,
    CREATE_PAYROLL_INCIDENT_CALENDAR,
    CREATE_ARCHIVE_INCIDENT
} from "../../../Querys/querys";
import { subMonths } from 'date-fns';
import { addDays } from 'date-fns';
import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import {
    FormHelperText, 
    Button, 
    TextField,
    Select, 
    InputLabel,
    FormControl,
    MenuItem,
    DialogActions
} from "@material-ui/core"
import style from "../../../components/Payroll/Modals/CrearIncidenciasModal/CrearIncidencias.module.css";
import styles from '../Calendars.module.css'
import { useParams } from "react-router-dom";
import PayrollProcessContext from "../../../context/PayrollProcess/PayrollProcessContext";
import { useForm } from "../../../hooks/useForm";
import { IncidenciaModal } from "../../../interfaces/TabPayroll.interfaces";
import { formatter } from "../../../helpers/formatoMoneda";
import File_Helper from "../../../components/Collaborator/Expedient/Fields/File_Helper";
import File_Helper_Incident from "../../../components/Collaborator/Expedient/Fields/File_Helper_Incident";
import SaveIcon from "@material-ui/icons/Save";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import { ErrorAlert } from "../../../alerts/errorAlert";
import {
clearPayrollProcess,
createincidenciaModal,
} from "../../../context/PayrollProcess/Actions";
import IncidenciasContext from "../../../context/IncidenciasContext/IncidenciasContext";
import DeduccionContext from "../../../context/ConfigPayrollContext/DeduccionContext";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import moment from 'moment';
import {
postFileIncidentAWS,
} from "../../../services/candidateService";
import RemoveFile from "../../../assets/svg/remove_file.svg";
import { updateObjectLiteral } from "typescript";
let fechas = "";
interface TabCalendar {
    children?: React.ReactNode;
    idCalendar: any;
    setDate: any
  };

export const IncidentSchudule2 = (props: TabCalendar) => {
    const { children, idCalendar, setDate } = props;
    //console.log(idCalendar);
    
    const { state: incidenciasState, dispatch: dispatchState } = useContext(IncidenciasContext);
    const { id, tab } = useParams<any>();
    const { state: payrollState, dispatch: payrollDispatch } = useContext(
        PayrollProcessContext
    );
    const [seleccionados, setSeleccionados] = useState<any[]>([]);
    const [seleccionadosdelete, setSeleccionadosdelete] = useState<any[]>([]);
    const [estadoInicial, setEstadoInicial] = useState<any[]>([]);
    const [estadoFiltrado, setEstadoFiltrado] = useState<any[]>([]);
    const { state, dispatch } = useContext(CalendarsContext);
    const [seleccionadosConcepto, setSeleccionadosConcepto] = useState<any[]>([]);
    const [estadoInicialConcepto, setEstadoInicialConcepto] = useState<any[]>([]);
    //console.log(estadoInicialConcepto)
    const [seleccionadosFecha, setSeleccionadosFecha] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const [showC, setShowColaboradores] = useState(false);
    const [showSeleccionados, setShowColaboradoresSeleccionado] = useState(false);
    const [showCF, setShowFechas] = useState(false);
    const resultPayrollCollaborator = useQuery(GET_PAYROLLCOLLABORATOR, {
        variables: { getPayrollcollaboratorId: id },
    });
    const allPayrollCollaborator = resultPayrollCollaborator.data?.GET_PAYROLLCOLLABORATOR;
    const resultDeductions = useQuery(GET_DEDUCTIONS_CALENDAR);
    const resultallDeductions = resultDeductions.data?.GET_DEDUCTIONS_CALENDAR;
    //console.log('resultallDeductions',resultallDeductions)
    const resultPerceptions = useQuery(GET_ALL_PERCEPTIONS_CALENDAR);
    const resultallPerceptions = resultPerceptions.data?.GET_ALL_PERCEPTIONS_CALENDAR;
    //console.log('resultallPerceptions',resultallPerceptions)
    const [isCheck, setIsCheck] = useState<any[]>([]);
    const [isCheckE, setIsCheckE] = useState<any[]>([]);
    const [checkAll, setcheckAll] = useState(false);
    const [archives, setArchives] = useState<any>();
    const [inputComent, setInputComent] = useState("")
    //console.log('Archivo',archives)
    const [totalCantidad, setTotalCantidad] = useState("$");
    useEffect(() => {
        initData();
    }, [payrollState]);

    const initData = async () => {
        setEstadoInicial(allPayrollCollaborator);
        setEstadoFiltrado(allPayrollCollaborator);
    };

    const [createPayRollIncident] = useMutation(CREATE_PAYROLL_INCIDENT_CALENDAR, {
        refetchQueries: [
          {
            query: GET_PAYROLLCOLLABORATOR,
            variables: { getPayrollcollaboratorId: id },
          },
        ],
    });

    const [createArchiveIncident] = useMutation(CREATE_ARCHIVE_INCIDENT);

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

    

    const AllSelect = () => {
        const nuevoSeleccionadas: SetStateAction<any[]> = [];
        setSeleccionados(nuevoSeleccionadas);
        setEstadoFiltrado(nuevoSeleccionadas);
        setSeleccionados(allPayrollCollaborator);
        setIsCheck([]);
        //console.log("asi", estadoInicial, isCheck );
    };

    const AllDelete = () => {
        const nuevoSeleccionadas: SetStateAction<any[]> = [];
        setSeleccionados(nuevoSeleccionadas);
        setEstadoFiltrado(allPayrollCollaborator);
        setIsCheck([]);
    };

    const agregaColaborador = (persona: any) => {
        //setEstadoFiltrado([...estadoFiltrado, ...seleccionadosEliminar]);
        //console.log("al inicio", seleccionados);
    
        setSeleccionados([...seleccionados, persona]);
    
        //console.log("al concatenar", seleccionados);
        const nuevoSeleccionadas = estadoInicial.filter(
          (lis) => lis?.id !== persona.id
        );
        //console.log("al nuevoSeleccionadas", nuevoSeleccionadas);
    
        const filtrados = estadoInicial.filter((lis) => lis?.id !== persona.id);
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
        //console.log("chk_1", dateToDelete);
    
        const FechasNuevas = seleccionadosFecha.filter((fecha) => {
          return !dateToDelete
            .map((date) => {
              return date.id;
            })
            .includes(fecha?.id);
        });
    
        //console.log("chk_2", seleccionadosFecha);
        //console.log("chk_3", FechasNuevas);
    
        setSeleccionadosFecha([...FechasNuevas]);
    };

    const EliminardeLista = () => {
        const checkedBoxes = document.querySelectorAll(
          '#colaboladores > [type="checkbox"]:checked'
        );
        let workerToDelete: { id: string; colaborator: string }[] = [];
        checkedBoxes.forEach((checkElement) => {
          workerToDelete.push({
            id: checkElement.id,
            colaborator: checkElement.className,
          });
        });
    
        const seleccionadosEliminar = seleccionados.filter((persona) => {
          return workerToDelete
            .map((worker) => {
              return worker.id;
            })
            .includes(persona?.id);
        });
    
        setEstadoFiltrado([...estadoFiltrado, ...seleccionadosEliminar]);
        setEstadoInicial([...estadoInicial, ...seleccionadosEliminar]);
    
        const nuevoSeleccionadas = seleccionados.filter((persona) => {
          return !workerToDelete
            .map((worker) => {
              return worker.id;
            })
            .includes(persona?.id);
        });
      
        setSeleccionados(nuevoSeleccionadas);
        setIsCheck([]);
        setIsCheckE([]);
    
    };

    const AgregarLista = () => {
        const checkedBoxes = document.querySelectorAll(
          '#Universo > [type="checkbox"]:checked'
        );
        let workerToAdd: { id: string }[] = [];
    
        checkedBoxes.forEach((checkElement) => {
          workerToAdd.push({
            id: checkElement.id,
          });
        });
    
        //console.log("chk_nuevoSeleccionadas", workerToAdd);
    
        const seleccionadosSeleccionar = estadoInicial.filter((persona) => {
          return workerToAdd
            .map((worker) => {
              return worker.id;
            })
            .includes(persona?.id);
        });
    
        setSeleccionados([...seleccionados, ...seleccionadosSeleccionar]);
        //console.log("chk_nuevoSeleccionadas", seleccionados);
    
        const nuevoUniverso = estadoInicial.filter((persona) => {
          return !workerToAdd
            .map((worker) => {
              return worker.id;
            })
            .includes(persona?.id);
        });
      
        setEstadoFiltrado([...nuevoUniverso]);
        setEstadoInicial([...nuevoUniverso]);
        setIsCheck([]);
        setIsCheckE([]);
    };

    const agregaConcepto = (concepto: any) => {
        setSeleccionadosConcepto([
          ...seleccionadosConcepto,
          { id: concepto[0], nombre: concepto[1], tipo: concepto[3] },
        ]);
    
        //console.log("estado", estadoInicial);
        const nuevoSeleccionadasConcepto = estadoInicialConcepto.filter(
          (lis) => lis?.id !== concepto[0] && lis?.__typename !== concepto[3]
        );
        //console.log("estado", nuevoSeleccionadasConcepto);
        setEstadoInicialConcepto(nuevoSeleccionadasConcepto);
    };

    const agregarFecha = () => {
        let valor = formulario.InitDate;
        //console.log("valor", valor.length);
        let horas = formulario.Horas;
        let dias = formulario.Dias;
    
        const fechas_agregadas = seleccionadosFecha.filter(
          (lis) => lis?.fecha === valor
        );
    
        if (
          valor?.length > 1 &&
          seleccionadosFecha?.length < dias &&
          fechas_agregadas?.length === 0
        ) {
          setSeleccionadosFecha([
            ...seleccionadosFecha,
            { fecha: formulario.InitDate, id: formulario.InitDate, Horas: horas },
          ]);
    
          //console.log(valor);
          fechas = fechas += "Horas:" + horas + "/" + valor + ",";
        }
    };

    const onChange2 = (e: any) => {
        let seleccionado = e.nativeEvent.target;
    
        var index = e.nativeEvent.target.selectedIndex;
        let text = e.nativeEvent.target[index].text;
        let tipo = e.nativeEvent.target[index].className;
        const datos = [e.target.value, text, tipo];
        //console.log("target", datos, e.nativeEvent.target[index]);
        agregaConcepto(datos);
    };

    const filtrarConcepto = (tipo: any) => {
        //console.log(tipo);
        if (tipo === "Percepcion") {
          formulario.typeconcept = "Percepcion";
          setEstadoInicialConcepto(resultallPerceptions);
        } else {
          formulario.typeconcept = "Deduccion";
          setEstadoInicialConcepto(resultallDeductions);
        }
        //console.log('cambio de tipo', formulario.typeconcept);
        //console.log('datos tipo', estadoInicialConcepto);
        
    };

    const filtrarConceptoPercepcionDeduccion = (tipo: any) => {
        let concepto_tipo: SetStateAction<any[]> = [];

        if (tipo === "Percepcion") {
            formulario.TipoIncC = false
            formulario.TipoIncP = true
            formulario.typeconcept = "Percepcion";
            if(formulario.Incident_type === "Tiempo"){
                concepto_tipo = resultallPerceptions.filter(
                    (lis: { time: any }) => lis?.time
                );
                setEstadoInicialConcepto(concepto_tipo);
            }else{
                setEstadoInicialConcepto(resultallPerceptions);
            }
            
        } 

        if (tipo === "Deduccion") {
            formulario.TipoIncP = false
            formulario.TipoIncC = true
            formulario.typeconcept = "Deduccion";
            setEstadoInicialConcepto(resultallDeductions);
            if(formulario.Incident_type === "Tiempo"){
                concepto_tipo = resultallDeductions.filter(
                    (lis: { time: any }) => lis?.time
                );
                setEstadoInicialConcepto(concepto_tipo);
            }else{
                setEstadoInicialConcepto(resultallDeductions);
            }
        }

    };

    const filtrarTipoInc = (tipo: string) => {
        
        let concepto_tipo: SetStateAction<any[]> = [];
        formulario.Incident_type = tipo;
        filtrarConcepto(formulario.typeconcept);
        console.log(
          "entra 1",
          tipo === "Tiempo" && formulario.typeconcept === "Percepcion"
        );
        if (tipo === "Tiempo" && formulario.typeconcept === "Percepcion") {
          concepto_tipo = resultallPerceptions.filter(
            (lis: { time: any }) => lis?.time
          );
          //console.log('all',resultallPerceptions)
          //console.log('filtro',concepto_tipo)

          setEstadoInicialConcepto(concepto_tipo);
          console.log("entra 1");
        }
        if (tipo === "Tiempo" && formulario.typeconcept === "Deduccion") {
          concepto_tipo = resultallDeductions.filter(
            (lis: { time: any }) => lis?.time
          );
          setEstadoInicialConcepto(concepto_tipo);
          console.log("entra 2");
        }
    
        console.log("Tiempo2", formulario.Incident_type, estadoInicialConcepto);
    };

    const filtrarTipo2 = (tipo: any) => {
        let concepto_tipo: SetStateAction<any[]> = [];
        console.log(formulario.typeconcept)
        filtrarConceptoPercepcionDeduccion(formulario.typeconcept);

        //console.log("entra 2", estadoInicialConcepto, tipo);
        if (tipo === "Taxable") {
            
            formulario.NotTaxable = false
            formulario.Mixed = false
            formulario.Periodico = false
            formulario.Taxable = true

            concepto_tipo = estadoInicialConcepto.filter(
            (lis: { ISRTax: any }) => lis?.ISRTax
            );
            console.log("Taxable", concepto_tipo)
            setEstadoInicialConcepto(concepto_tipo);
        }

        if (tipo === "NotTaxable") {

            formulario.Mixed = false
            formulario.Periodico = false
            formulario.Taxable = false
            formulario.NotTaxable = true
            console.log("NotTaxable", concepto_tipo)
            concepto_tipo = estadoInicialConcepto.filter(
                (lis: { ISRTax: any }) => !lis?.ISRTax
            );

            setEstadoInicialConcepto(concepto_tipo);
        }

        if (tipo === "Mixed") {

            formulario.Periodico = false
            formulario.Taxable = false
            formulario.NotTaxable = false
            formulario.Mixed = true
            console.log("Mixed", concepto_tipo)
            concepto_tipo = estadoInicialConcepto.filter(
                (lis: { TaxBoth: any }) => lis?.TaxBoth
            );

            setEstadoInicialConcepto(concepto_tipo);
        }

        if (tipo === "Periodico") {

            formulario.Taxable = false
            formulario.NotTaxable = false
            formulario.Mixed = false
            formulario.Periodico = true

        }

        
    };

    const filtrarTipo = (tipo: any) => {
        let concepto_tipo: SetStateAction<any[]> = [];
        filtrarConcepto(formulario.typeconcept);
        console.log("entra 2", estadoInicialConcepto, tipo);
        if (tipo === "Taxable") {
          concepto_tipo = estadoInicialConcepto.filter(
            (lis: { ISRTax: any }) => lis?.ISRTax
          );
        }
        if (tipo === "NotTaxable") {
          concepto_tipo = estadoInicialConcepto.filter(
            (lis: { ISRTax: any }) => !lis?.ISRTax
          );
        }
        if (tipo === "Mixed") {
          concepto_tipo = estadoInicialConcepto.filter(
            (lis: { TaxBoth: any }) => lis?.TaxBoth
          );
        }
        setEstadoInicialConcepto(concepto_tipo);
    };

    const filtrarCollaborator = (colaborador: string) => {
        //console.log(colaborador);
    
        let datosfiltrados = estadoInicial.filter((lis) =>
          lis?.colaborator
            .toUpperCase()
            .includes(colaborador.toString().toUpperCase())
        );
        if (datosfiltrados?.length <= 0) {
          datosfiltrados = estadoInicial;
        }
        //console.log("estado inicia", estadoInicial);
        //console.log("varr new", datosfiltrados);
        setEstadoFiltrado(datosfiltrados);
    };

    const createModal = (id: string, createModal: boolean) => {
        createincidenciaModal({ id, createModal }, dispatch);
    };

    const handleClose = () => {
        reset();
        formulario.Taxable = false;
        formulario.NotTaxable = false;
        formulario.Mixed = false;
        formulario.TipoIncC = false;
        formulario.TipoIncP = false;
        formulario.Periodico = false;
        setSeleccionados([]);
        setEstadoInicial(allPayrollCollaborator);
        setEstadoFiltrado(allPayrollCollaborator);
        setSeleccionadosConcepto([]);
        setSeleccionadosFecha([]);
        setArchives(undefined)
        clearCalendarsModal({}, dispatch);
    };

    const handleCancel = () => {
        reset();
        formulario.Taxable = false;
        formulario.NotTaxable = false;
        formulario.Mixed = false;
        formulario.TipoIncC = false;
        formulario.TipoIncP = false;
        formulario.Periodico = false;
        setSeleccionados([]);
        setEstadoInicial(allPayrollCollaborator);
        setEstadoFiltrado(allPayrollCollaborator);
        setSeleccionadosConcepto([]);
        setSeleccionadosFecha([]);
        setArchives(undefined)
    };

    const handleSelectAll = (e: any) => {
        setIsCheck([]);
        setIsCheckE([]);
        //console.log("seleccioneeliminar", estadoInicial);
      
        let filtradoSeleccionado = estadoFiltrado
          .filter((lis: any) => {
            return e.target.checked && !isCheck.includes(lis.id);
          })
          .map((lis: any) => lis.id);
    
        //console.log("filtradoSeleccionado", filtradoSeleccionado);
    
        setIsCheck(filtradoSeleccionado);
    };
    
    const handleSelectEliminar = (e: any) => {

        
        setIsCheck([]);
        setIsCheckE([]);
        //console.log("seleccioneeliminar", estadoInicial);
        //console.log("estadoInicial", estadoInicial);
        //console.log("estadoF", estadoFiltrado);
        //console.log(isCheck, isCheckE)
    
     
        //console.log(isCheck, isCheckE)
        let filtradoSeleccionado = seleccionados
          .filter((lis: any) => {
            return e.target.checked && !isCheckE.includes(lis.id);
          })
          .map((lis: any) => lis.id);
    
        //console.log("filtradoSeleccionado", filtradoSeleccionado);
        //setIsCheck([]);
        setIsCheckE(filtradoSeleccionado);
    };

    const handleClick = (e: any) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
          setIsCheck(isCheck.filter((lis: any) => lis !== id));
        }
    };

    const handleClickE = (e: any) => {
        const { id, checked } = e.target;
        setIsCheckE([...isCheckE, id]);
        if (!checked) {
          setIsCheckE(isCheckE.filter((lis: any) => lis !== id));
        }
    };

    const insertArchive = async (idIncident: any) =>{

        const restult = await postFileIncidentAWS(archives, idIncident, "ArchivoIncidencias","ArchivoIncidencias",false);
        //console.log(restult)

        setDate(moment())
        handleClose();

        await SuccessfulAlert({
            title: "¡Exito!",
            text: "¡Se ha añadido la incidencia!",
        });
    }

    const validate = (name:any) =>{
        if(name === 'Comentarios'){
            const inputComentarios = document.querySelector('comentarioFieldset')
            console.log(inputComentarios)
        }

    }

    const onSumbit = async () => {
        //console.log("info", formulario);
        if(formulario.Comentarios != '' && formulario.Comentarios.replace(/([0-9])/g, '') == ''){
            validate('comentarioFieldset')
            return ErrorAlert({
                text: "Comentario no debe llevar solo numeros.",
            });
        }else{
            if (id !== 0 && seleccionados?.length > 0) {
                { 
                    console.log(
                    "formulario.Dias",
                    formulario.Dias,
                    seleccionadosFecha?.length,
                    formulario.Dias === seleccionadosFecha?.length
                    );
                    if (
                        parseInt(formulario.Dias.toString()) === seleccionadosFecha?.length
                    ) {
                        if (formulario.Incident_type === "Dinero") {
                            seleccionados?.map((lis: any) =>
                            createPayRollIncident({
                                variables: {
                                    input: {
                                        idPayroll: parseInt(id),
                                        idCollaborator: parseInt(lis.id),
                                        Incident_type: formulario.Incident_type,
                                        InitDate: null,
                                        Total: parseFloat(formulario.Total.toString()),
                                        Taxable:
                                            formulario.Taxable.toString() === "true" ? true : false,
                                        NotTaxable:
                                            formulario.NotTaxable.toString() === "true"
                                            ? true
                                            : false,
                                        Mixed:
                                            formulario.Mixed.toString() === "true" ? true : false,
                                        idConcept: parseInt(formulario.idConcept.toString()),
                                        Horas: 0,
                                        Dias: 0,
                                        Comentarios: formulario.Comentarios,
                                        TypeConcept: formulario.typeconcept,
                                        idCalendar: parseInt(idCalendar),
                                        Periodico:
                                        formulario.Periodico.toString() === "true" ? true : false,
                                        FechaPeriodica: formulario.FechaPeriodica
                                    },
                                },
                            }).then((data)=>{
    
                                //console.log(data)
                                if(archives !== undefined){
                                    insertArchive(data?.data.CREATE_PAYROLL_INCIDENT_CALENDAR.id)
    
                                }else{
                                    setDate(moment())
                                    handleClose();
                                    SuccessfulAlert({
                                        title: "¡Exito!",
                                        text: "¡Se ha añadido la incidencia!",
                                    });
                                }
                            })
                        );
                    } else {
                        seleccionados?.map((lis: any) =>
                            seleccionadosFecha?.map((fecha: any) =>
                                createPayRollIncident({
                                    variables: {
                                        input: {
                                            idPayroll: parseInt(id),
                                            idCollaborator: parseInt(lis.id),
                                            Incident_type: formulario.Incident_type,
                                            InitDate: moment(fecha.fecha).format(),
                                            Total: parseFloat(formulario.Total.toString()),
                                            Taxable:
                                                formulario.Taxable.toString() === "true" ? true : false,
                                            NotTaxable:
                                                formulario.NotTaxable.toString() === "true"
                                                ? true
                                                : false,
                                            Mixed:
                                                formulario.Mixed.toString() === "true" ? true : false,
                                            idConcept: parseInt(formulario.idConcept.toString()),
                                            Horas: parseInt(fecha.Horas.toString()),
                                            Dias: parseInt(formulario.Dias.toString()),
                                            Comentarios: formulario.Comentarios,
                                            TypeConcept: formulario.typeconcept,
                                            idCalendar: parseInt(idCalendar),
                                            Periodico:
                                            formulario.Periodico.toString() === "true" ? true : false,
                                            FechaPeriodica: formulario.FechaPeriodica
                                        },
                                    },
                                }).then((data)=>{
    
                                    //console.log(data)
                                    if(archives !== undefined){
                                        insertArchive(data?.data.CREATE_PAYROLL_INCIDENT_CALENDAR.id)
    
                                    }else{
                                        setDate(moment())
                                        handleClose();
                                        SuccessfulAlert({
                                            title: "¡Exito!",
                                            text: "¡Se ha añadido la incidencia!",
                                        });
                                    }
                                    
                                })
                            )
                        );
                    }
                    
                } else {
                    return ErrorAlert({
                        text: "Las fechas seleccionadas no corresponden a los días.",
                    });
                }
            }
            } else {
              return ErrorAlert({ text: "Ingrese todos los datos." });
            }
        }
        
    };

    const inputFile = () => {

        if(archives === undefined){
            return <div className={style.inputFileCalendar}>
                <File_Helper_Incident
                name="ArchivoIncidencias"
                parametrofrom="ArchivoIncidencias"
                className="image-file"
                setArchives={setArchives}
                archives={archives}
                idIncident="0"
                />
            </div>
        }else{
            return <div className={style.inputFileCalendar}
            style={{bottom: "37px"}}
            >
                <File_Helper_Incident
                    name="ArchivoIncidencias"
                    parametrofrom="ArchivoIncidencias"
                    className="image-file"
                    setArchives={setArchives}
                    archives={archives}
                    idIncident="0"
                    image={RemoveFile}
                />
            </div>
        }

        
    }

    const upDateTotal = ((total:any)=>{
        const totalWithout = total.replace("$", "")
        const totalWith = "$"+totalWithout
        .replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1.$2')  
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")

        setTotalCantidad(totalWith)
    })
    
    return (
        <>
            <div className={style.contenedorTitulo}>
                <span className={style.titulo}>Agregar Incidencia</span>
            </div>

            <div className={style.contenedorPrincipal}
                style={{
                    width:"auto"
                }}
            >
                <div className={style.contenedortotales}>
                    <button
                        className={style.divtotalesUniverso}
                        onClick={() => {
                        setShowColaboradores(!showC);
                        }}
                    >
                        <span className={style.textoDivTotales}>
            
                        Seleccionar Colaboladores ({estadoFiltrado?.length})
                        </span>
                    </button>
                    {showC && estadoFiltrado?.length > 0 ? (
                        <div className={style.DivSeleccionadosUniverso}>
                            <fieldset className={style.fieldsetUpdateFiltro}>
                                <div className={style.checkboxitem}>
                                    <input
                                        type="checkbox"
                                        id="erer"
                                    
                                        onChange={(e) => handleSelectAll(e)}
                                    ></input>
                                    <label htmlFor="erer"> </label>
                                </div>

                                <input
                                className={style.inputUpdate}
                                type="text"
                                id="txtFiltro"
                                placeholder="Colaboradores"
                                onChange={(e) => filtrarCollaborator(e.target.value)}
                                />
                                <img src={`/assets/svg/find.svg`} alt="Buscar" />
                            </fieldset>
                            <ul className={style.contenedorLista}>
                                {estadoFiltrado.map((lis: any) => (
                                <li className={style.listaNombres}>
                                    <div id="Universo" className={style.checkboxitem}>
                                    <input
                                        id={lis.id}
                                        key={lis.id}
                                        type="checkbox"
                                        value={lis.id}
                                        checked={isCheck.includes(lis.id)}
                                        className={lis.colaborador}
                                        onClick={(e) => handleClick(e)}
                                    ></input>
                                    <label htmlFor={lis.id}> {lis.colaborator}</label>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <br></br>
                            <button className={style.botonAgregar} onClick={AgregarLista}>
                                <div className={style.pc_iconoAgregarDos}></div>
                                <span className={style.textoAgregar}>Agregar</span>
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className={style.contenedortotales}>
                <button className={style.divtotalesyellow} onClick={AllSelect}>
                    {" "}
                    +{" "}
                </button>
                <button
                    className={style.divtotales}
                    onClick={() => {
                    setShowColaboradoresSeleccionado(!showSeleccionados);
                    }}
                >
                    <span className={style.textoDivTotales}>
                    {" "}
                    Ver Seleccionados ({seleccionados?.length}){" "}
                    </span>
                </button>
                <button className={style.divtotalesyellowl} onClick={AllDelete}>
                    {" "}
                    -{" "}
                </button>
                {showSeleccionados ? (
                    <div className={style.DivSeleccionados}>
                        {seleccionados?.length > 0 ? (
                            <div className={style.checkboxitem}>
                            <input
                                type="checkbox"
                                id="eliminarTodos"
                            
                                onChange={(e) => handleSelectEliminar(e)}
                            ></input>
                            <label htmlFor="eliminarTodos"> Seleccionar Todos </label>
                            </div>
                        ) : (
                            ""
                        )}

                        <ul className={style.contenedorLista}>
                            {seleccionados.map((lis: any) => (
                            <li className={style.listaNombres}>
                                <div id="colaboladores" className={style.checkboxitem}>
                                <input
                                    id={lis.id}
                                    key={lis.id}
                                    checked={isCheckE.includes(lis.id)}
                                    type="checkbox"
                                    value={lis.id}
                                    onClick={(e) => handleClickE(e)}
                                    className={lis.colaborador}
                                ></input>
                                <label htmlFor={lis.id}> {lis.colaborator}</label>
                                </div>
                            </li>
                            ))}
                        </ul>
                        {seleccionados?.length > 0 ? (
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
                        ) : (
                            <label className={style.textognral}> Agregar Colaboladores </label> 
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className={style.radioitem}>
                <input
                    type="radio"
                    name="concepto"
                    id="typeconcepta"
                    checked={TipoIncP}
                    onChange={(e) => {
                    filtrarConceptoPercepcionDeduccion("Percepcion")
                    /*filtrarConcepto("Percepcion");*/
                    onChange(e.target.checked.toString(), "TipoIncP");
                    
                    }}
                />
                <label htmlFor="typeconcepta"> Percepción</label>
            </div>
            <div className={style.radioitem}>
                <input
                    type="radio"
                    name="concepto"
                    id="typeconceptb"
                    checked={TipoIncC}
                    onChange={(e) => {
                        filtrarConceptoPercepcionDeduccion("Deduccion")
                        /*filtrarConcepto("Deduccion");*/
                        onChange(e.target.checked.toString(), "TipoIncC");
                        
                    }}
                />
                <label htmlFor="typeconceptb"> Deducción </label>
            </div>
            <fieldset className={style.fieldsetNombre}>
                <legend className={style.tituloFieldsetNombre}>
                    Tipo Incidencia *
                </legend>
                <select
                    id="SeleccionarTipoIncidencia"
                    className={style.selectNombre}
                    name="Incident_type"
                    value={Incident_type}
                    onChange={({ target }) => {
                    filtrarTipoInc(target.value);
                    if (target.value == "Tiempo") {
                        setShow(false);
                    } else {
                        setShow(true);
                    }
                    }}
                >
                    <option value={"0"} disabled selected>
                    Tipo de incidencia *
                    </option>
                    
                    <option key="Tiempo" value="Tiempo">
                    Tiempo
                    </option>
                    <option key="Dinero" value="Dinero">
                    Dinero
                    </option>
                </select>
            </fieldset>
            {!show ? (
                <div>
                    <div className={style.fechas}>
                    <div>
                        <span className={style.textoFechaIncident}> Días </span>
                    </div>
                    <div>
                        <input
                        name="Dias"
                        id="Dias"
                        type="number"
                        pattern="[0-9]*"
                        value={Dias}
                        min={1}
                        className={style.inputFecha}
                        onChange={({ target }) =>
                            onChange(target.value as string, "Dias")
                        }
                        />
                    </div>
                    <div>
                        <span className={style.textoFechaIncident}> Horas </span>
                    </div>
                    <div>
                        <input
                        name="Horas"
                        type="number"
                        step="1"
                        min={1}
                        value={Horas}
                        className={style.inputFecha}
                        onChange={({ target }) =>
                            onChange(target.value as string, "Horas")
                        }
                        ></input>
                    </div>
                    <div>
                        <span className={style.textoFechaIncident}>Fecha *</span>
                    </div>
                    <div>
                        <input
                        name="InitDate"
                        type="date"
                        value={InitDate}
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
                        Ver Fechas ({seleccionadosFecha?.length})
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
                                            {"Horas: " + lis.Horas + "   Fecha: " + lis.fecha}
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
            ) : (
                <fieldset className={style.fieldsetUpdate}>
                    <legend className={style.tituloFieldsetNombre}>Cantidad</legend>
                    <input
                    className={style.inputUpdate}
                    value={totalCantidad}
                    name="Total"
                    type="text"
                    onChange={({ target }) => upDateTotal(target.value)}
                    />
                </fieldset>
            )}
            <div className={style.radioitem}>
                <input
                    type="radio"
                    name="tx"
                    id="ritema"
                    checked={Taxable}
                    onChange={(e) => {
                        filtrarTipo2("Taxable");
                        onChange(e.target.checked.toString(), "Taxable");
                    }}
                />
                <label htmlFor="ritema"> Gravable </label>
            </div>
            <div className={style.radioitem}>
                <input
                    type="radio"
                    name="tx"
                    id="ritemb"
                    checked={NotTaxable}
                    onChange={(e) => {
                        filtrarTipo2("NotTaxable");
                        onChange(e.target.checked.toString(), "NotTaxable");
                    }}
                />
                <label htmlFor="ritemb"> No Gravable </label>
            </div>
            <div className={style.radioitem}>
                <input
                    type="radio"
                    name="tx"
                    id="ritemc"
                    checked={Mixed}
                    onChange={(e) => {
                        filtrarTipo2("Mixed");
                        onChange(e.target.checked.toString(), "Mixed");
                    }}
                />
                <label htmlFor="ritemc"> Total </label>
            </div>
            <div className={style.radioitem}>
                <input
                    type="radio"
                    name="tx"
                    id="ritemas"
                    checked={Periodico}
                    onChange={(e) => {
                        filtrarTipo2("Periodico")
                        onChange(e.target.checked.toString(), "Periodico");
                    }}
                />
                <label htmlFor="ritemas"> Periódica </label>
            </div>
            <div className={style.fechas}>
                <div>
                    <span className={style.textoFechaIncident}>Fecha Fin</span>
                </div>
                <div>
                    <input
                    name="FechaPeriodica"
                    value={FechaPeriodica}
                    type="date"
                    className={style.inputFecha}
                    onChange={({ target }) =>
                        onChange(target.value as string, "FechaPeriodica")
                    }
                    />
                </div>
            </div>
            <fieldset className={style.fieldsetNombre}>
                <legend className={style.tituloFieldsetNombre}>Concepto *</legend>
                <select
                    className={style.selectNombre}
                    value={idConcept}
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
            <div className={style.conteinerFile}>
                <fieldset className={style.fieldsetUpdate}
                style={{
                    width:"100%"
                }}
                >
                    <legend className={style.tituloFieldsetNombre}>Archivo</legend>
                        <input
                            className={style.inputUpdateFile}
                            
                            name="Archivo"
                            type="text"
                            //value={Archivo}
                            //onChange={({ target }) => onChange(target.value, "Archivo")}
                            readOnly={true}
                        />
                        {inputFile()}
                    
                </fieldset>
            </div>
            <fieldset className={style.fieldsetUpdate} name="comentarioFieldset" >
                <legend className={style.tituloFieldsetNombre}>Comentarios</legend>
                <input
                    className={style.inputUpdate}
                    name="Comentarios"
                    type="text"
                    value={Comentarios}
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
                    <button className={style.botonNuevo} onClick={handleCancel}>
                    <div>
                        <span className={style.iconoAgregar}>+</span>
                    </div>
                    </button>
                </div>
            </DialogActions>
        </>
    )
    
}
