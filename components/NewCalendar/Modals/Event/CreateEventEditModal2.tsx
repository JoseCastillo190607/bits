
import { useContext, useEffect, useState } from "react";
import CalendarsContext from "../../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal, clearEditEventModal } from "../../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import { Formik, Form} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../../../../components/NewCalendar/Calendars.module.css'
import { useFormik} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { 
    GET_ALL_PROJECT, CREATE_EVENT, GET_EVENT, UPDATE_EVENT
} from "../../../../Querys/querys";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { addDays, format } from 'date-fns';
import { subMonths } from 'date-fns';
import { DateRange } from 'react-date-range'
import moment from 'moment';
import { es } from 'date-fns/locale';
import { style } from "@mui/system";
import { Refresh } from "@material-ui/icons";

const CreateEventEditModal2 = ({setDate, date,}:any) => { 
 
    const {state, dispatch} = useContext(CalendarsContext)
    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([
        {
            startDate: subMonths(new Date(1999, 1, 1), 0),
            endDate: addDays(new Date(1999, 1, 1), 0),
            key: "selection"
        }]
      );
    const [upDateNewEvent] = useMutation(UPDATE_EVENT)

    const { data:dataProject }  = useQuery(GET_ALL_PROJECT);
    const allEnterprise = dataProject?.GET_ALL_PROJECT;
    const activos = allEnterprise?.map((enter:any) => enter.status);
    const result = [activos?.filter((status:any) => status?.length === 6)];
    

    const { loading, error, data } =  useQuery(GET_EVENT, {
        variables: {
            id: parseInt(state._id)
            }
    });

    
    const allEvent: any = data?.GET_EVENT;
    console.log(allEvent)
    const [event, setEvent] = useState(allEvent)
    useEffect(()=>{
        if(allEvent){
            setEvent(allEvent)
        }
        
    },[allEvent])

    //if(loading) return null
    



    const initialValues = () => {
        return {
            tipo: event?.eventType,
            titulo: event?.name,
            descripcion: event?.description,
            area: event?.projectId,
            calendarId: event?.calendarId
        }
    }

    const dateText = () =>{

        const date =  stateCalendario.map((home: any) =>{
            //console.log('Anio',moment(home?.startDate).format('YYYY'))
            if( moment(home?.startDate).format('YYYY') != '1999'){
                return <div id="hora">
                <span 
                className={styles.textoFecha}
                >{new Date(home.startDate).toLocaleDateString()} - {new Date(home.endDate).toLocaleDateString()}</span></div>
            }else{
                setStateCalendario([{
                    startDate: new Date(allEvent?.initDate),
                    endDate: new Date(allEvent?.endDate),
                    key: "selection"
                }])
                return <div id="hora">
                <span 
                className={styles.textoFecha}
                >{new Date(allEvent?.initDate).toLocaleDateString()} - {new Date(allEvent?.endDate).toLocaleDateString()}</span></div>
            }
                

        })
        //console.log(date)
        return date
    }

    const handleClose = ()=>{
        clearEditEventModal({},dispatch);
    }
    
    const toggleCalendar = () => {
    
        if(showCalendario === false){
          setShowCalendario(true);
        }
    }
    const rangeSelection = (selection: any)=>{
        //console.log(selection)
        setStateCalendario((current)=>current= selection);
        setShowCalendario(!showCalendario);
    }

    const backgroundColor = 'background-color'
    const textTransform = 'text-transform'
  return(
    <Dialog open={state.createEditEventModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
        <div className={styles.dialogContainer}>
            <div className={styles.centerContainer}>
                <h2 id="form-dialog-title" data-testid="TitleModal">Editar evento</h2>
            </div>
            <DialogContent>
            <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                debugger
                const idEvent = Number(state._id)
                upDateNewEvent({
                    variables: {
                        upDateEventId:idEvent,
                        input: {
                            name: formData.titulo,
                            calendarId: formData.calendarId,
                            description:formData.descripcion,
                            initDate:stateCalendario[0].startDate,
                            endDate:stateCalendario[0].endDate,
                            projectId:parseInt(formData.area),
                            eventType:formData.tipo
                        },
                    },
                }).then(({data})=>{
                  
                    setDate(moment())
                  //setDate(moment(Daychange))
                  //console.log(typeof data.CREATE_NON_WORKING);
                  //console.log(nonWorkingDays);
                  
                  
                  
                  //setNonWorkingDays([...nonWorkingDays, data.CREATE_NON_WORKING])
                  //console.log('modal',nonWorkingDays)
                  SuccessfulAlert({text:"Se edito evento"});
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
                <FormControl
                    fullWidth
                    size="small"
                    variant="outlined"
                    className={styles.dialogFields}
                    error={touched.tipo && Boolean(errors.tipo)}
                >
                    <InputLabel 
                    id="demo-simple-select-label"
                    style={{
                        backgroundColor : "#FFFFFF"
                    }}
                    >Tipo de evento</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="tipo"
                        value={values.tipo}
                        onChange={handleChange}
                    >
                        <MenuItem value="evento">Evento</MenuItem>
                        <MenuItem value="tarea">Tarea</MenuItem>
                    </Select>
                    <FormHelperText>{touched.tipo && errors.tipo}</FormHelperText>
                </FormControl>
                <TextField
                    fullWidth
                    className={styles.dialogFields}
                    name="titulo"
                    label="Titulo"
                    variant="outlined"
                    value={values.titulo}
                    onChange={handleChange}
                    error={touched.titulo && Boolean(errors.titulo)}
                    helperText={touched.titulo && errors.titulo}
                    size="small" />
                <TextField
                    fullWidth
                    className={styles.dialogFields}
                    name="descripcion"
                    label="Descripción"
                    variant="outlined"
                    value={values.descripcion}
                    multiline
                    rows={4}
                    onChange={handleChange}
                    error={touched.descripcion && Boolean(errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    size="small" />
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
                                {dateText()}

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
                <FormControl
                    fullWidth
                    size="small"
                    variant="outlined"
                    className={styles.dialogFields}
                    error={touched.area && Boolean(errors.area)}
                >
                    <InputLabel 
                    id="demo-simple-select-label"
                    style={{
                        backgroundColor : "#FFFFFF"
                    }}
                    >Área</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="area"
                        value={values.area}
                        onChange={handleChange}
                    >
                        {result?.length >= 1 ? (
                            allEnterprise?.map((enter: any) => {
                                return (
                                    enter.status === "Activo" &&
                                    <MenuItem value={enter.id}>{enter.proyectName}</MenuItem>
                                )
                            })
                        )
                            :
                            <MenuItem value="">No tienes empresas </MenuItem>
                        }
                    </Select>
                    <FormHelperText>{touched.area && errors.area}</FormHelperText>
                </FormControl>
                
                <div className={styles.centerContainer}>
                    <Button className={styles.buttonCancelCalendar} onClick={() => handleClose()}>
                        <b className={styles.buttonCancelCalendarText}
                        style={{
                            textTransform: "capitalize"
                        }}
                        >Cancelar</b>
                    </Button>
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
    tipo: Yup.string().required("El tipo de evento es requerido"),
    titulo:Yup.string().required("El titulo es requerido"),
    descripcion : Yup.string().required("La descripcion es requerido"),
    area : Yup.string().required("El area es requerido")  
})
// @ts-ignore


export default CreateEventEditModal2