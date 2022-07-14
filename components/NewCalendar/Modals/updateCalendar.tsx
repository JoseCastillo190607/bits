import React from "react";
import { useContext } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import styles from '../Calendars.module.css'
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {GET_ALL_CALENDARS_SCHEME, GET_ALL_ENTERPRISE, GET_ALL_CALENDARS, UPDATE_CALENDARS, GET_CALENDARS } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";


export const UpdateCalendars = () => {
    const {state, dispatch} = useContext(CalendarsContext)
    const [updateCalendars] = useMutation(UPDATE_CALENDARS, {
        refetchQueries:[{query:GET_ALL_CALENDARS}, {query:GET_CALENDARS, variables:{id:state._id}}],
    })
    const handleClose = ()=>{
        clearCalendarsModal({}, dispatch);
    }
    const resultCalendarScheme = useQuery(GET_ALL_CALENDARS_SCHEME);
    const allCalendarScheme = resultCalendarScheme.data?.GET_ALL_CALENDARS_SCHEME
    
    const resultEnterprise = useQuery(GET_ALL_ENTERPRISE);
    const allEnterprise = resultEnterprise.data?.GET_ALL_ENTERPRISE;
    const activos = allEnterprise?.map((enter:any) => enter.status);
    const result = [activos?.filter((status:any) => status.length === 6)];


    const { loading, error, data } =  useQuery(GET_CALENDARS, {
        variables: {
                id: state._id,
            }
    });

    if(loading) return null
    const {calendarScheme ,enterpriseId, name} = data.GET_CALENDARS
    const initialValues = () => {
        return {
            nombre:name,
            razon:enterpriseId,
            base:calendarScheme   
        }
    }
    return (
        <div>
        <Formik
          initialValues={initialValues()}
          validationSchema={validationSchema}
          onSubmit={formData => {
            const idCal = Number(state._id) 
            updateCalendars({
                variables:{
                    updateCalendarsId:idCal,
                    input: {
                        name: formData.nombre,
                        enterpriseId: parseInt(formData.razon),
                        calendarScheme:parseInt(formData.base)                    
                    },
                },
            }).then(()=>{
                SuccessfulAlert({text:" Calendario actualizado con éxito"});
            });
            //console.log(formData.nombre + " g " + parseInt(formData.razon) + parseInt(formData.base))
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
                    <Dialog open={state.updateModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
                        <div className={styles.dialogContainer}>
                            <div className={styles.centerContainer}>
                                <h2 id="form-dialog-title" data-testid="TitleModal">Editar calendario</h2>
                            </div>
                            <DialogContent>
                                <Form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        className={styles.dialogFields}
                                        name="nombre"
                                        label="Nombre del calendario*"
                                        variant="outlined"
                                        value={values.nombre}
                                        onChange={handleChange}
                                        error={touched.nombre && Boolean(errors.nombre)}
                                        helperText={touched.nombre && errors.nombre}
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
                                            name="razon"
                                            value={values.razon}
                                            onChange={handleChange}
                                        >
                                            {result?.length >= 1 ? (
                                                allEnterprise.map((enter: any) => {
                                                    return (
                                                        enter.status === "Activo" &&
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
                                            name="base"
                                            value={values.base}
                                            onChange={handleChange}
                                        >
                                            {
                                                allCalendarScheme.map((cal: any) => {
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
                                            >Guardar
                                            </b>
                                            </button>
                                        </div>
                                            
                                    </div>

                                </Form>
                            </DialogContent>
                        </div>
                    </Dialog>
          )}
        </Formik>
      </div>
        )

    
}

// @ts-ignore
const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    razon:Yup.string().required("La razón social es requerido"),
    base : Yup.string().required("El calendario base es requerido")
})
// @ts-ignore


