import { ChangeEvent,useContext, useState } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, TextField,Select, InputLabel,FormControl,MenuItem } from "@material-ui/core"
import { Formik, Form} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../Calendars.module.css'
import * as Yup from "yup";
import { GET_ALL_PROJECT, CREATE_EVENT} from "../../../Querys/querys";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useMutation, useQuery } from "@apollo/client";
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { subMonths } from 'date-fns';
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import moment from 'moment';

export const Events = ({idCalendar, setDate}:any) => {

    const {state, dispatch} = useContext(CalendarsContext)
    const handleClose = ()=>{
        clearCalendarsModal({}, dispatch);
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
        if(showCalendario === false){
            setShowCalendario(!showCalendario);
        }
    }
    const { loading, error, data }  = useQuery(GET_ALL_PROJECT);
    
    if(loading) return null
    //console.log(data)
    const allEnterprise = data?.GET_ALL_PROJECT;
    //console.log('Proyectos',allEnterprise)
    const activos = allEnterprise?.map((enter:any) => enter.status);
    const result = [activos?.filter((status:any) => status?.length === 6)];
    //console.log('result', result);
    
    const initialValues = () => {
        return {
            tipo: "",
            titulo: "",
            descripcion:"",
            area:""
        }
    }

    const rangeSelection = (selection: any)=>{
        //console.log(selection)
        setStateCalendario(selection);
        setShowCalendario(!showCalendario);
    }

    const backgroundColor = 'background-color'
    return (
        <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                createNewEvent
                ({
                    variables: {
                        input: {
                            name: formData.titulo,
                            calendarId: parseInt(idCalendar), 
                            description:formData.descripcion,
                            initDate:stateCalendario[0].startDate,
                            endDate:stateCalendario[0].endDate,
                            projectId:parseInt(formData.area),
                            eventType:formData.tipo
                        },
                    },
                }).then(()=>{
                    setDate(moment())
                    SuccessfulAlert({text:"Evento creado con éxito"});
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
                    <div className={styles.centerContainer}>
                        <h2 id="form-dialog-title" data-testid="TitleModal">Agregar evento</h2>
                    </div>
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
                                        <DateRange className="dateRangeSchedule"
                                            onChange={(item: any) => {
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
                                allEnterprise.map((enter: any) => {
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
