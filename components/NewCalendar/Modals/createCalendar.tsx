import { useContext, useState } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import { Formik, Form} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../Calendars.module.css'
import { useFormik} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { GET_ALL_CALENDARS, CREATE_CALENDARS, GET_ALL_CALENDARS_SCHEME, GET_ALL_ENTERPRISE, GET_COUNT_EVENT_NONWORKINGDAY} from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";


export const CreateCalendars = () => {
    const {state, dispatch} = useContext(CalendarsContext)
    
    const [createNewCalendar] = useMutation(CREATE_CALENDARS, {
        refetchQueries:[{query:GET_ALL_CALENDARS},{query:GET_COUNT_EVENT_NONWORKINGDAY}],
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
            nombre: "",
            razon: "",
            base:""
        }
    }
    const backgroundColor = 'background-color'
    const textTransform = 'text-transform'
  return(
    <Dialog open={state.createModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
        <div className={styles.dialogContainer}>
            <div className={styles.centerContainer}>
                <h2 id="form-dialog-title" data-testid="TitleModal">Nuevo calendario</h2>
            </div>
            <DialogContent>
            <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                createNewCalendar({
                    variables: {
                        input: {
                            name: formData.nombre,
                            enterpriseId: parseInt(formData.razon),
                            calendarScheme:parseInt(formData.base)
                        },
                    },
                }).then(()=>{
                    SuccessfulAlert({text:"Calendario creado con éxito"});
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
                    name="nombre" 
                    label="Nombre del calendario*" 
                    variant="outlined" 
                    value = {values.nombre}
                    onChange={handleChange}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText = {touched.nombre && errors.nombre}
                    size="small" 
                    inputProps={{maxLength: 30}}
                    />
                <FormControl 
                    fullWidth 
                    size="small"
                    variant="outlined" 
                    className={styles.dialogFields} 
                    error={touched.razon && Boolean(errors.razon)}
                >
                    <InputLabel id="demo-simple-select-label"
                    style={{
                        backgroundColor: "#FFFFFF"
                    }}
                    >Razón social*</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name = "razon"
                        value = {values.razon}
                        onChange={handleChange}
                    >
                        {result?.length >= 1 ? (
                            allEnterprise.map((enter:any) => {
                                return (
                                    enter.status === "Activo"  &&
                                    <MenuItem value={enter.id}>{enter.name}</MenuItem>
                                )
                            })
                        )
                        :
                        <MenuItem value="">No tienes empresas </MenuItem>
                        }
                    </Select>
                    <FormHelperText>{touched.razon && errors.razon}</FormHelperText>
                </FormControl>
                <FormControl 
                    fullWidth 
                    size="small"
                    variant="outlined" 
                    className={styles.dialogFields} 
                    error={touched.razon && Boolean(errors.razon)}
                >
                    <InputLabel id="demo-simple-select-label"
                    style={{
                        backgroundColor: "#FFFFFF"
                    }}
                    >Calendario base*</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name = "base"
                        value = {values.base}
                        onChange={handleChange}
                    >
                        {
                            allCalendarScheme.map((cal:any) => {
                                return (
                                    <MenuItem value={cal.id}>{cal.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText>{touched.razon && errors.razon}</FormHelperText>
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
                        <button type="submit" className={styles.buttonSaveCalendar}>
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
        nombre: Yup.string().required("El nombre es requerido"),
        razon:Yup.string().required("La razón social es requerido"),
        base : Yup.string().required("El calendario base es requerido")  
})
// @ts-ignore

