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
  import '../../ConfigPayroll/Modal/CrearPayrollGroup.css'

  import MuiDialogContent from '@material-ui/core/DialogContent';
  import MuiDialogActions from '@material-ui/core/DialogActions';
  import { useEffect, useState, useContext, useReducer } from 'react';
  import { SuccessfulAlert } from '../../../alerts/successAlerts';

  import { NonWorkingDayModal } from '../../../interfaces/TabNonWorkingDay.interfaces';

  import { useForm } from '../../../hooks/useForm';
  import { ErrorAlert } from '../../../alerts/errorAlert';

  import {TabNonWorkingDaContext} from "../../../context/ScheduleContext/TabNonWorkingDay"

  import '../../ConfigPayroll/PayrollGroup.css'

  import SaveIcon from '@material-ui/icons/Save';
  import { useMutation } from "@apollo/client";

  import { GET_ALL_DEDUCTIONS, CREATE_DEDUCTIONS, CREATE_NON_WORKING, GET_ALL_NON_WORKING, GET_NON_WORKING_MONTH } 
  from "../../../Querys/querys";

  import styles from '../../../components/Payroll/PayrollStyles.module.css'

  import { addDays, format } from 'date-fns';
  import { subMonths } from 'date-fns';
  import { DateRange } from 'react-date-range'
  import moment from 'moment';
  import { es } from 'date-fns/locale';

  import '../styles.css'
  
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
  
  const CreaNonWorkingDay = (idCalendar: any) => {
    //console.log(idCalendar);
    

    const [showCalendario, setShowCalendario] = useState(false);
    const [stateCalendario, setStateCalendario] = useState([
      {
        startDate: subMonths(new Date(), 0),
        endDate: addDays(new Date(), 0),
        key: "selection"
      }]
    );
    
    

    const [createNewNonWorkingDay] = useMutation(CREATE_NON_WORKING, {
        refetchQueries: [{ query: GET_NON_WORKING_MONTH, variables: { calendarId: parseInt(idCalendar.idCalendar), initDate: moment().format('MM/DD/YYYY h:mm:ss a') } } ],
    });
  
    const {
      name,
        calendarId,
        initDate,
        endDate,
        onChange, formulario, reset, setForm
    } = useForm<NonWorkingDayModal>({
        name : "",
        calendarId: 0,
        initDate: "",
        endDate: "",
    });
  
    
    
    const { addNonWorkingDayOpen, setAddNonWorkingDayOpen, NonWorkingDayDispatch, } = useContext(TabNonWorkingDaContext);
  
    useEffect(() => {
        initData()
    }, []);
  
    const initData = async () => {
    };
  
  
    const handleClose = async () => {
      
        // Clean modal     
        reset();
        // Close modal
        setAddNonWorkingDayOpen();
    }
  
    const handleAdd = async () => {
      //console.log("DATA"+formulario.ConceptName+formulario.SATKey);
      console.log(formulario.name);
      console.log(stateCalendario[0].startDate);
      console.log(stateCalendario[0].endDate);
        if (name !== ''  ) {
  
            
            
            createNewNonWorkingDay({
                variables: {
                  input: {
                    name: formulario.name,
                    calendarId: parseInt(idCalendar.idCalendar),
                    initDate: moment(stateCalendario[0].startDate).format('MM/DD/YYYY h:mm:ss a'),
                    endDate: moment(stateCalendario[0].endDate).format('MM/DD/YYYY h:mm:ss a')
                  },
                },
            });
            
  
            SuccessfulAlert({ title: "??Exito!", text: "??Se ha a??adido el d??a in h??bil correctamente!" })

            handleClose()
            
        } else ErrorAlert({ text: "Favor de completar los campos requeridos (*)." });
        
    };

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
      console.log(selection)
      setStateCalendario(selection);
      setShowCalendario(!showCalendario);
    }
  
    return(
        <div>
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={addNonWorkingDayOpen} fullWidth={false} maxWidth={"md"}>
            <div className="contenedorModalPerceptions">
              <p className="tituloModalPerceptions">Agregar d??a inh??bil </p>
            </div>
            <DialogContent>
              <div >
                <div className='fieldModal'>
                  <TextField
                    error={false}
                    type="text"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    placeholder='T??tulo*'
                    defaultValue={name}
                    onChange={({ target }) => onChange(target.value as string, 'name')}/>
                </div>
              </div>
            </DialogContent>
            <DialogContent >
              <fieldset className={styles.fieldsetInput}>
                <legend className={styles.tituloFieldset}>Fecha*</legend>
                <div className='dateContainerSchedule' onClick={() => toggleCalendar()} 

                >
                  
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
                    <button autoFocus onClick={handleClose} className="botonCancelarModal">
                        Cancelar
                    </button>
                    <button autoFocus onClick={handleAdd} className="botonGuardarModal botonDoble">
                    <div className="contenedorIconoBotonModal">
                      <SaveIcon fontSize="small"/>
                    </div>
                    <div>
                      Guardar
                    </div>
                    </button>
                </div>
            </DialogActions>
          </Dialog>
        </div>
    )
  }
  
  export default CreaNonWorkingDay