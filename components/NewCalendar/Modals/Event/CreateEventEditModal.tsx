
import { ChangeEvent,useContext, useState } from "react";
import CalendarsContext from "../../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal, clearEditEventModal } from "../../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, TextField,Select, InputLabel,FormControl,MenuItem, Dialog } from "@material-ui/core"
import { Formik, Form} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../../Calendars.module.css'
import * as Yup from "yup";
import { GET_ALL_PROJECT, CREATE_EVENT, GET_EVENT, UPDATE_EVENT} from "../../../../Querys/querys";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useMutation, useQuery } from "@apollo/client";
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { subMonths } from 'date-fns';
import "../../../../components/Schedule/styles.css"
import moment from "moment";
import { SuccessfulAlert } from '../../../../alerts/successAlerts';

const CreateEventEditModal = ({calendarDate}:any) => {
    const {state, dispatch} = useContext(CalendarsContext)
    //console.log("id evento", state._id)
    
    const handleClose = ()=>{
        clearEditEventModal({}, dispatch);
    }
    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([
        {
          startDate: new Date(1999, 1, 1),
          endDate: new Date(1999, 1, 1),
          key: "selection"
        }]
      );
      const [createNewEvent] = useMutation(UPDATE_EVENT)
    const toggleCalendar = () => {    
    setShowCalendario(!showCalendario);
    }

    const { data:dataProject }  = useQuery(GET_ALL_PROJECT);
    const allEnterprise = dataProject?.GET_ALL_PROJECT;
    const activos = allEnterprise?.map((enter:any) => enter.status);
    const result = [activos?.filter((status:any) => status?.length === 6)];

    const { loading, error, data }  = useQuery(GET_EVENT, {
        variables: {
            id: parseInt(state._id)
            }
    });
    
    if(loading) return null
    
    const allEvent = data?.GET_EVENT;
    console.log('evento',allEvent)
    
    const initialValues = () => {
        return {
            tipo: allEvent?.eventType,
            titulo: allEvent?.name,
            descripcion: allEvent?.description,
            area: allEvent?.projectId
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
    const backgroundColor = 'background-color'
    return (<div>
        <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                const idEvent = Number(state._id)
                createNewEvent({
                    variables: {
                        upDateEventId:idEvent,
                        input: {
                            name: formData.titulo,
                            calendarId: parseInt(state._id),
                            description:formData.descripcion,
                            initDate:stateCalendario[0].startDate,
                            endDate:stateCalendario[0].endDate,
                            projectId:parseInt(formData.area),
                            eventType:formData.tipo
                        },
                    },
                }).then(()=>{
                    calendarDate(moment())
                    SuccessfulAlert({text:" Evento actualizado con éxito"});
                });
                console.log(formData)
                console.log(stateCalendario[0].startDate)
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
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.createEditEventModal} fullWidth={false} maxWidth={"md"}>
                    <Form onSubmit={handleSubmit}>
                        <div className={styles.centerContainer}>
                            <h2 id="form-dialog-title" data-testid="TitleModal">Editar evento</h2>
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
                                    {dateText()}

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
                                                    setStateCalendario([item.selection]);
                                                }}
                                                moveRangeOnFirstSelection={false}
                                                locale={es}
                                                ranges={stateCalendario}
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
                            <Button className="buttonCancel" onClick={() => handleClose()}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="buttonSave" style={{ marginLeft: "20px" }}>
                                <PlaylistAddIcon />Crear
                            </Button>
                        </div>

                    </Form>
                </Dialog>
            )}
        </Formik>
    </div>
        
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

export default CreateEventEditModal