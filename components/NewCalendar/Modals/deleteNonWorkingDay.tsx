
import React from "react";
import { useContext } from "react";
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal, cleardeleteNonWorkingDayModal } from "../../../context/NewCalendarContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import styles from '../Calendars.module.css'
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CALENDARS, DELETE_CALENDARS, GET_CALENDARS, GET_NON_WORKING, DELETE_NON_WORKING } from "../../../Querys/querys";
import { SuccessfulAlert } from "../../../alerts/successAlerts";
import moment from "moment";


const DeleteNonWorkingDay = ({calendarDate}:any) => {
   const {state, dispatch} = useContext(CalendarsContext)
   const [deleteCalendars] = useMutation(DELETE_NON_WORKING)
   const handleClose = ()=>{
    cleardeleteNonWorkingDayModal({}, dispatch);
   }
   const { loading, error, data } =  useQuery(GET_NON_WORKING, {
       variables: {
               id: state._id,
           }
   });
   console.log(state._id);
   
   if(loading) return null
   //const {name} = data?.GET_NON_WORKING
   const nonWorkingDay = data?.GET_NON_WORKING
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
                deleteNonWorkingDayId:idDoc
               },
           }).then(()=>{
            calendarDate(moment())
            SuccessfulAlert({text:"Día inhábil eliminado con éxito"});
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
           <Dialog open={state.deleteNonWorkingDayModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
               <div className={styles.dialogContainer}>
                   <div className={styles.centerContainer}>
                       <h3 id="form-dialog-title" data-testid="TitleModal">¿Confirmas eliminar el día inhábil?</h3>
                   </div>
                   <div className={styles.centerContainer}>
                       <span className={styles.tituloDatosUpdate}>{nonWorkingDay?.name}</span>
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

export default DeleteNonWorkingDay