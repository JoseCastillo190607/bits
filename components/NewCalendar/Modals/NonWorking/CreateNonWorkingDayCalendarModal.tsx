import { useContext, useState } from "react";
import CalendarsContext from "../../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal } from "../../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import { Formik, Form} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../../../../components/NewCalendar/Calendars.module.css'
import { useFormik} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { 
    GET_ALL_CALENDARS, 
    CREATE_CALENDARS, 
    GET_ALL_CALENDARS_SCHEME, 
    GET_ALL_ENTERPRISE,
    CREATE_NON_WORKING,
    GET_COUNT_EVENT_NONWORKINGDAY
} from "../../../../Querys/querys";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { addDays, format } from 'date-fns';
import { subMonths } from 'date-fns';
import { DateRange } from 'react-date-range'
import moment from 'moment';
import { es } from 'date-fns/locale';
import { style } from "@mui/system";

const CreateNonWorkingDayCalendarModal = () => {

    const {state, dispatch} = useContext(CalendarsContext)
    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([
        {
          startDate: subMonths(new Date(), 0),
          endDate: addDays(new Date(), 0),
          key: "selection"
        }]
      );
    const [createNewNonWorkingDay] = useMutation(CREATE_NON_WORKING, {
        refetchQueries:[{query:GET_COUNT_EVENT_NONWORKINGDAY}],
    })
    const {loading:loadingCal, error:errorCal, data:dataCal} = useQuery(GET_ALL_CALENDARS_SCHEME);
    const allCalendarScheme = dataCal?.GET_ALL_CALENDARS_SCHEME
    
    const {loading, error, data} = useQuery(GET_ALL_ENTERPRISE);
    if(loading) return null

    const allEnterprise = data?.GET_ALL_ENTERPRISE;
    const activos = allEnterprise?.map((enter:any) => enter.status);
    const result = [activos?.filter((status:any) => status.length === 6)];

    const handleClose = ()=>{
        clearCalendarsModal({}, dispatch);
    }
    const initialValues = () => {
        return {
            name: ""
        }
    }
    const toggleCalendar = () => {
        /*
        if (!PaymentFrecuency) {
          alert("Debe seleccionar la frecuencia de pago.");
          return;
        }
        */
    
        if(showCalendario === false){
          setShowCalendario(true);
        }
    }
    const rangeSelection = (selection: any)=>{
        //console.log(selection)
        setStateCalendario(selection);
        setShowCalendario(!showCalendario);
    }
    const backgroundColor = 'background-color'
    const textTransform = 'text-transform'
  return(
    <Dialog open={state.createIncidentModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
        <div className={styles.dialogContainer}>
            <div className={styles.centerContainer}>
                <h2 id="form-dialog-title" data-testid="TitleModal">Agregar d??a inh??bil</h2>
            </div>
            <DialogContent>
            <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                createNewNonWorkingDay({
                    variables: {
                        input: {
                            name: formData.name,
                            calendarId: parseInt(state._id),
                            initDate: stateCalendario[0].startDate,
                            endDate: stateCalendario[0].endDate
                        },
                    },
                }).then(()=>{
                    SuccessfulAlert({text:"Se agreg?? d??a inh??bil"});
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
            }) => (
            <Form onSubmit = {handleSubmit}>
                <TextField 
                    fullWidth 
                    className={styles.dialogFields} 
                    name="name" 
                    label="T??tulo*" 
                    variant="outlined" 
                    value = {values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText = {touched.name && errors.name}
                    size="small" 
                    inputProps={{maxLength: 30}}
                    />
                <div
                className={styles.conteinerCalendarFields}
                >
                <fieldset
                className={styles.fieldsetInputCalendarFields}
                >
                    <legend 
                    className={styles.fieldsetTitleCalendarFields}
                    >Fecha *</legend>
                    <div className={styles.dateContainerCalendar}  onClick={() => toggleCalendar()}>
                        
                        <div className={styles.dateCalendar} >
                        {stateCalendario.map(home => <div id="hora">
                            <span 
                            className={styles.textoFecha}
                            >{new Date(home.startDate).toLocaleDateString()} - {new Date(home.endDate).toLocaleDateString()}</span></div>)}

                        </div>
                        <div 
                        className={styles.contenedorCalendario}
                        
                        >
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
                                scroll={{ enabled: true }}
                            /> : null
                            )
                        }
                        </div>
                    </div>
                    </fieldset>
                </div>
                    
                
                <div className={styles.centerContainer}>
                    <button className={styles.buttonCancelCalendar} onClick={() => handleClose()}>
                        <b className={styles.buttonCancelCalendarText}
                        style={{
                            textTransform: "capitalize"
                        }}
                        >Cancelar</b>
                    </button>
                    <div className={styles.conteinerSave}>
                        <button type="submit" className={styles.buttonSaveCalendar2}>
                        <b className={styles.buttonSaveCalendarText}
                        style={{
                            textTransform: "capitalize"
                        }}
                        >Crear
                        </b>
                        </button>
                    </div>
                        
                </div>

                </Form>
            )}
            </Formik>
            </DialogContent>
        </div>
    </Dialog>
  )
}


// @ts-ignore
const validationSchema = Yup.object().shape({
        name: Yup.string().required("El t??tulo es requerido")
})
// @ts-ignore


export default CreateNonWorkingDayCalendarModal