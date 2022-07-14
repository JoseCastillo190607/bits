
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearNonWorkingDayModal} from '../../../context/ScheduleContext/Actions'
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { GET_ALL_PROJECT, CREATE_EVENT} from "../../../Querys/querys";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

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
  import '../../ConfigPayroll/Modal/CrearPayrollGroup.css'

  import MuiDialogContent from '@material-ui/core/DialogContent';
  import MuiDialogActions from '@material-ui/core/DialogActions';
  import { useEffect, useState, useContext, useReducer } from 'react';
  import { SuccessfulAlert } from '../../../alerts/successAlerts';

  import { NonWorkingDayModal } from '../../../interfaces/TabNonWorkingDay.interfaces';

  import { useForm } from '../../../hooks/useForm';
  import { ErrorAlert } from '../../../alerts/errorAlert';

  import {TabNonWorkingDaContext} from "../../../context/ScheduleContext/TabNonWorkingDay"

  import '../../ConfigPayroll/PayrollGroup.css'

  import SaveIcon from '@material-ui/icons/Save';
  import { useMutation } from "@apollo/client";

  import { GET_ALL_DEDUCTIONS, CREATE_DEDUCTIONS, CREATE_NON_WORKING, GET_ALL_NON_WORKING } 
  from "../../../Querys/querys";

  import styles from '../../../components/Payroll/PayrollStyles.module.css'

  import { addDays, format } from 'date-fns';
  import { subMonths } from 'date-fns';
  import { DateRange } from 'react-date-range'
  import moment from 'moment';
  import { es } from 'date-fns/locale';

  import '../styles.css'

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


export const EditNonWorkingDayModal = (idCalendar: any) => {

    const {
        name,
          calendarId,
          initDate,
          endDate,
          onChange, formulario, reset, setForm
      } = useForm<NonWorkingDayModal>({
          name : "",
          calendarId: 0,
          initDate: "",
          endDate: "",
      });


      const rangeSelection = (selection: any)=>{
        console.log(selection)
        setStateCalendario(selection);
        setShowCalendario(!showCalendario);
      }


    const {state, dispatch} = useContext(CalendarsContext)
    
    const handleClose = ()=>{
        //console.log(state)
        clearNonWorkingDayModal({},dispatch);
    }
    
    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([
        {
          startDate: subMonths(new Date(), 0),
          endDate: addDays(new Date(), 0),
          key: "selection"
        }]
      );
      const [createNewEvent] = useMutation(CREATE_EVENT)
    const toggleCalendar = () => {    
    setShowCalendario(!showCalendario);
    }
    
    const initialValues = () => {
        return {
            tipo: "",
            titulo: "",
            descripcion:"",
            area:""
        }
    }
    const backgroundColor = 'background-color'
    return (
        <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                createNewEvent({
                    variables: {
                        input: {
                            name: formData.titulo,
                            calendarId: parseInt(idCalendar.idCalendar),
                            description:formData.descripcion,
                            initDate:stateCalendario[0].startDate,
                            endDate:stateCalendario[0].endDate,
                            projectId:parseInt(formData.area),
                            eventType:formData.tipo
                        },
                    },
                });
                //console.log(formData)
                //console.log(stateCalendario[0].startDate)
                handleClose();
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="contenedorModalPerceptions">
                        <p className="tituloModalPerceptions">Agregar día inhábil </p>
                    </div>
                    <DialogContent
                    style={{
                        "width": "100%"
                    }}
                    >
                        <div >
                            <div className='fieldModal'>
                                <TextField
                                error={false}
                                type="text"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                placeholder='Título'
                                defaultValue={name}
                                onChange={({ target }) => onChange(target.value as string, 'name')}/>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogContent
                     style={{
                        "width": "100%"
                    }}
                    >
                        <fieldset className={styles.fieldsetInput}>
                            <legend className={styles.tituloFieldset}>Fecha *</legend>
                            <div className='dateContainerSchedule'  onClick={() => toggleCalendar()}>
                                
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
                                    <DateRange className="dateRangeSchedule"
                                        onChange={(item: any) => {
                                        const startDate = moment(item.selection.startDate);
                                        const endDate = moment(item.selection.endDate);
                                        const dayDiff = endDate.diff(startDate, "days");

                                        //modificaFechas([item.selection])
                                        //setStateCalendario([item.selection]);
                                        rangeSelection([item.selection])
                                        }}
                                        moveRangeOnFirstSelection={false}
                                        locale={es}
                                        ranges={stateCalendario}
                                    /> : null
                                    )
                                }
                                </div>
                            </div>
                        </fieldset>
                    </DialogContent>
                    <DialogActions
                     style={{
                        "width": "100%"
                    }}
                    >
                    <div className="contenedorBotonesPoliticsModal">
                            <button autoFocus onClick={handleClose} className="botonCancelarModal">
                                Cancelar
                            </button>
                            <button autoFocus className="botonGuardarModal botonDoble">
                            <div className="contenedorIconoBotonModal">
                                <SaveIcon fontSize="small"/>
                            </div>
                            <div>
                                Guardar
                            </div>
                            </button>
                        </div>
                    </DialogActions>

                </Form>
            )}
        </Formik>
    )
}


// @ts-ignore
const validationSchema =  Yup.object().shape({
        tipo: Yup.string().required("El tipo de evento es requerido"),
        titulo:Yup.string().required("El titulo es requerido"),
        descripcion : Yup.string().required("La descripcion es requerido"),
        area : Yup.string().required("El area es requerido")  
})
// @ts-ignore
