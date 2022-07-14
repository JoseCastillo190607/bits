import React from "react";
import { useContext } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal } from "../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import styles from '../Calendars.module.css'
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CALENDARS, DELETE_CALENDARS, GET_CALENDARS } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";


export const DeleteCalendars = () => {
   const {state, dispatch} = useContext(CalendarsContext)
   const [deleteCalendars] = useMutation(DELETE_CALENDARS, {
       refetchQueries:[{query:GET_ALL_CALENDARS}, {query:GET_CALENDARS, variables:{id:state._id}}],
   })
   const handleClose = ()=>{
       clearCalendarsModal({}, dispatch);
   }
   const { loading, error, data } =  useQuery(GET_CALENDARS, {
       variables: {
               id: state._id,
           }
   });

   if(loading) return null
   const {name} = data.GET_CALENDARS
   const initialValues = () => {
       return {
           mensaje: ""
       }
   }

   return (
       <div>
       <Formik
         initialValues={initialValues()}
         validationSchema={validationSchema}
         onSubmit={formData => {
           const idDoc = Number(state._id) 
           deleteCalendars({
               variables:{
                deleteCalendarId:idDoc
               },
           }).then(()=>{
            SuccessfulAlert({text:"Calendario eliminado con éxito"});
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
           <Dialog open={state.deleteModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
               <div className={styles.dialogContainer}>
                   <div className={styles.centerContainer}>
                       <h3 id="form-dialog-title" data-testid="TitleModal">¿Confirmas eliminar el calendario?</h3>
                   </div>
                   <div className={styles.centerContainer}>
                       <span className={styles.tituloDatosUpdate}>{name}</span>
                   </div>
                   <div className={styles.centerContainer}>
                       <span className={styles.tituloNombreUpdate}>Una vez eliminado no podrás recuperar la información</span>
                   </div>
                   <div className={styles.centerContainer}>
                       <span className={styles.tituloNombreUpdate}>Escribe ELIMINAR en mayúsculas para confirmar</span>
                   </div>
                   <DialogContent>
                   <Form onSubmit = {handleSubmit}>
                       <TextField 
                           fullWidth 
                           className={styles.dialogFields} 
                           name="mensaje" 
                           label="Mensaje" 
                           variant="outlined" 
                           value = {values.mensaje}
                           onChange={handleChange}
                           error={touched.mensaje && Boolean(errors.mensaje)}
                           helperText = {touched.mensaje && errors.mensaje}
                           size="small" />
                       <div className={styles.centerContainer}>
                           <Button className="buttonCancel" onClick={() => handleClose()}>
                                   Cancelar
                           </Button>
                           <Button type="submit" className={styles.botonEliminar} style={{marginLeft: "20px", fontWeight:"bold"}}>
                               <span>Confirmar</span> 
                           </Button>
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


const validationSchema = Yup.object().shape({
   mensaje: Yup.string().required("El  mensaje de confirmacion es requerido").oneOf(['ELIMINAR'], "El mensaje debe coincidir")
})