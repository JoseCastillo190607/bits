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
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useEffect, useState, useContext, useReducer } from 'react';
import { SuccessfulAlert } from '../../../../alerts/successAlerts';
import { NonWorkingDayModal } from './TabNonWorkingDay.interfaces';
import { useForm } from './hooks/useForm';
import { ErrorAlert } from '../../../../alerts/errorAlert';
import CalendarsContext from "../../../../context/NewCalendarContext/CalendarsContext";
import { clearCalendarsModal, clearNonWorkingDayModal } from "../../../../context/ScheduleContext/Actions";
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from "@apollo/client";
import { 
    CREATE_NON_WORKING, 
    GET_COUNT_EVENT_NONWORKINGDAY, 
    GET_NON_WORKING_MONTH,
    GET_NON_WORKING,
    UPDATE_NON_WORKING
} 
from "../../../../Querys/querys";
import styles from './PayrollStyles.module.css'
import { addDays, format } from 'date-fns';
import { subMonths } from 'date-fns';
import { DateRange } from 'react-date-range'
import moment from 'moment';
import { es } from 'date-fns/locale';
import { useQuery } from "@apollo/client"
import { Formik, Form} from "formik";
import * as Yup from "yup";
import DateTextNonWorkingDayModal from './DateTextNonWorkingDayModal'

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


const CreateNonWorkingDayEditModal2 = ({calendarDate}:any) => {   

    const {state, dispatch} = useContext(CalendarsContext)
    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([{
        startDate: subMonths(new Date(1999, 1, 1), 0),
        endDate: addDays(new Date(1999, 1, 1), 0),
        key: "selection"
    }]
    );

    const [upDateNonWorkingDay] = useMutation(UPDATE_NON_WORKING);

    const { loading, error, data } =  useQuery(GET_NON_WORKING, {
        variables: {
            id: parseInt(state._id)
            }
    });

    if(loading) return null
    //const {name, calendarId, initDate, endDate} = data?.GET_NON_WORKING
    const nonDay = data?.GET_NON_WORKING

    const initialValues = () => {
        
        return {
            name:nonDay?.name,
            calendarId: nonDay?.calendarId,
            initDate:nonDay?.initDate,
            endDate: nonDay?.endDate, 
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
        //console.log(stateCalendario)
        setShowCalendario(!showCalendario);
    }
    const handleClose = async () => {
        
        clearNonWorkingDayModal({},dispatch);

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
    return (
        <div>
        <Formik
          initialValues={initialValues()}
          validationSchema={validationSchema}
          onSubmit={formData => {
            console.log(formData);
            
            const idNon = Number(state._id) 
            upDateNonWorkingDay({
                variables:{
                    upDateNonWorkingDayId:idNon,
                    input: {
                        name: formData.name,
                        initDate: stateCalendario[0].startDate,
                        endDate: stateCalendario[0].endDate,
                        calendarId: formData.calendarId       
                    },
                },
            }).then(()=>{
                calendarDate(moment())
                SuccessfulAlert({text:" Calendario actualizado con éxito"});
            });
            //console.log(formData.name)
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
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={state.createNonWorkingDayModal} fullWidth={false} maxWidth={"md"}>
            <div className="contenedorModalNonWorkingDay">
                <p className="tituloModalPerceptions">Editar día inhábil </p>
            </div>
            <Form onSubmit={handleSubmit}>
                <DialogContent
                style={{
                    width:"100%"
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
                            placeholder='Título*'
                            defaultValue={values.name}
                            inputProps={{maxLength: 30}}
                            onChange={values.name}/>
                        </div>
                    </div>
                </DialogContent>
                <DialogContent 
                style={{
                    width:"100%"
                }}
                >
                    <fieldset 
                    className={styles.fieldsetInput}
                    >
                    <legend 
                    className={styles.tituloFieldset}
                    >Fecha *</legend>
                    <div className='dateContainerSchedule'  onClick={() => toggleCalendar()}>
                        
                        <div >
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
                                    //console.log('item',item)
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
                </DialogContent>
                <DialogActions>
                    <div className="contenedorBotonesPoliticsModal">
                            <button onClick={handleClose} className="botonCancelarModal">
                                Cancelar
                            </button>
                            <button type="submit" className="botonGuardarModal botonDoble">
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
            
            
            </Dialog>
          )}
        </Formik>
      </div>
        )

    
}

// @ts-ignore
const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido")
})
// @ts-ignore


export default CreateNonWorkingDayEditModal2