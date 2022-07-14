
import { useContext, useState } from "react";
import CalendarsContext from "../../../../context/NewCalendarContext/CalendarsContext";
import { clearNonWorkingDayModal } from "../../../../context/ScheduleContext/Actions";
import {FormHelperText, Button, Dialog, DialogContent, TextField, DialogActions,Select, InputLabel,FormControl,MenuItem,FormControlLabel,Checkbox  } from "@material-ui/core"
import { Formik, Form} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import styles from '../../../../components/NewCalendar/Calendars.module.css'
import { useFormik} from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { 
    GET_NON_WORKING_MONTH,
    UPDATE_NON_WORKING,
    GET_NON_WORKING
} from "../../../../Querys/querys";
import { SuccessfulAlert } from "../../../../alerts/successAlerts";
import { addDays, format } from 'date-fns';
import { subMonths } from 'date-fns';
import { DateRange } from 'react-date-range'
import moment from 'moment';
import { es } from 'date-fns/locale';
import { style } from "@mui/system";
import { Refresh } from "@material-ui/icons";

const CreateNonWorkingDayEditModal3 = ({setDate, date, setNonWorkingDays, nonWorkingDays}:any) => { 
    //console.log(date.format('YYYY/MM/DD'));
    let Daychange: any

    if(date.format('YYYY/MM/DD') == moment(date).startOf('month').format('YYYY/MM/DD')){
      console.log('primer día del mes')
      Daychange = moment(date).startOf('month').add(1,'day').format('YYYY/MM/DD')

    }else{
      console.log('no es el primer día del mes')
      Daychange = moment(date).startOf('month').format('YYYY/MM/DD')
    }
    

    //const Daychange = moment(date).format('YYYY/MM/DD')
    //console.log(Daychange)
 
    const {state, dispatch} = useContext(CalendarsContext)
    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([
        {
            startDate: subMonths(new Date(1999, 1, 1), 0),
            endDate: addDays(new Date(1999, 1, 1), 0),
            key: "selection"
        }]
      );
    const [upDateNonWorkingDay] = useMutation(UPDATE_NON_WORKING)

    const { loading, error, data } =  useQuery(GET_NON_WORKING, {
        variables: {
            id: parseInt(state._id)
            }
    });

    if(loading) return null
    const nonDay = data?.GET_NON_WORKING

    const initialValues = () => {
        return {
            name:nonDay?.name,
            calendarId: nonDay?.calendarId,
            initDate:nonDay?.initDate,
            endDate: nonDay?.endDate,
        }
    }

    const handleClose = ()=>{
        clearNonWorkingDayModal({},dispatch);
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
        setStateCalendario((current)=>current= selection);
        setShowCalendario(!showCalendario);
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
                    startDate: new Date(nonDay?.initDate),
                    endDate: new Date(nonDay?.endDate),
                    key: "selection"
                }])
                return <div id="hora">
                <span 
                className={styles.textoFecha}
                >{new Date(nonDay?.initDate).toLocaleDateString()} - {new Date(nonDay?.endDate).toLocaleDateString()}</span></div>
            }
                

        })
        //console.log(date)
    return date
}
    const backgroundColor = 'background-color'
    const textTransform = 'text-transform'
  return(
    <Dialog open={state.createNonWorkingDayModal} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
        <div className={styles.dialogContainer}>
            <div className={styles.centerContainer}>
                <h2 id="form-dialog-title" data-testid="TitleModal">Edita día inhábil</h2>
            </div>
            <DialogContent>
            <Formik
            initialValues={initialValues()}
            validationSchema={validationSchema}
            onSubmit={formData => {
                const idNon = Number(state._id)
                upDateNonWorkingDay({
                    variables: {
                        upDateNonWorkingDayId:idNon,
                        input: {
                            name: formData.name,
                            initDate: stateCalendario[0].startDate,
                            endDate: stateCalendario[0].endDate,
                            calendarId: formData.calendarId
                        },
                    },
                }).then(({data})=>{
                  
                    setDate(moment())
                  //setDate(moment(Daychange))
                  //console.log(typeof data.CREATE_NON_WORKING);
                  //console.log(nonWorkingDays);
                  
                  
                  
                  //setNonWorkingDays([...nonWorkingDays, data.CREATE_NON_WORKING])
                  //console.log('modal',nonWorkingDays)
                  SuccessfulAlert({text:"Se edito día inhábil"});
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
                    label="Título*" 
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
        name: Yup.string().required("El título es requerido")
})
// @ts-ignore


export default CreateNonWorkingDayEditModal3