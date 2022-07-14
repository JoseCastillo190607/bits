import { Grid } from '@material-ui/core';
import { useQuery } from "@apollo/client";
import { GET_ALL_CALENDARS, GET_ALL_EVENT_NONWORKINGDAY, GET_COUNT_EVENT_NONWORKINGDAY} from "../../Querys/querys";
import {createCalendarsModal, createEventModal} from '../../context/NewCalendarContext/Actions'
import CalendarsContext from '../../context/NewCalendarContext/CalendarsContext';
import {CreateCalendars} from './Modals/createCalendar'
import {UpdateCalendars} from './Modals/updateCalendar'
import {DeleteCalendars} from './Modals/deleteCalendar'
import CreateNonWorkinDay from './Modals/NonWorking/CreateNonWorkingDayModal'
import CreateNonWorkingDayCalendarModal from './Modals/NonWorking/CreateNonWorkingDayCalendarModal'
import styles from './Calendars.module.css'
import { CalendarInfo } from './CalendarInfo';
import { useContext } from 'react';
import { CalendarInfo2 } from './CalendarInfo2';


export const  AllCalendars = () => {

    const resultCalendar = useQuery(GET_ALL_CALENDARS);
    const {state,dispatch} = useContext(CalendarsContext)
    const allCalendar = resultCalendar.data?.GET_ALL_CALENDARS
    const alleventNonWorkingDay = useQuery(GET_COUNT_EVENT_NONWORKINGDAY);
    const eventNonWorkingDay = alleventNonWorkingDay.data?.GET_COUNT_EVENT_NONWORKINGDAY
    //console.log(eventNonWorkingDay)
    const activos = allCalendar?.map((cal:any) => cal.status);
    const result = [activos?.filter((status:any) => status.length === 6)];
    
    const createModal = (id:string, createModal:boolean) => {
        createCalendarsModal({id, createModal},dispatch)
    }
    
    const GetEventNonWorkingDay = (idCalendar: any) =>{
        const result = eventNonWorkingDay?.filter( (e:any) =>{
            if(e.calendarId == idCalendar){
                return e
            }
        } )
        /*
        const {loading: loadingA, error:errorA, data:dataA} = useQuery(GET_ALL_EVENT_NONWORKINGDAY, {variables:{calendarId:parseInt(idCalendar)}});
        const eventCount = dataA?.GET_ALL_EVENT_NONWORKINGDAY?.length
        //console.log(eventCount)
        */
        return result
    }
    
    return (
        <div >
            <Grid container className = {styles.calendarContainerName}
            style={{marginTop:'33px'}}
            >
                <Grid item xs={8}  className="Title" >
                    <span style={{marginLeft : "30px"}}>Calendario</span>
                </Grid>
            </Grid>
            <Grid container className = {styles.calendarContainerName}
            style={{marginTop:'55.5px'}}
            >
                <Grid item xs={8}  className={styles.titleCalendar}>
                    <span style={{marginLeft : "30px", marginTop:'30px'}}>Calendarios activos</span>
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={8}>
                        <div className={styles.conteinerbotonAgregar}>
                            <button
                                className={`${styles.botonAgregar} ${styles.flex}`}
                                onClick={() => createModal('1', true)}
                                >
                                <span className={styles.textoBoton}> Nuevo calendario</span>
                            </button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing = {8} className={styles.calendarContainer}>
                {result?.length >= 1 ? (
                    allCalendar?.map((cal:any) => {
                        return (
                            cal.status === "Activo" &&
                            <CalendarInfo
                                _id = {cal.id}
                                name = {cal.name}
                                enterprise = {cal.enterprise?.name}
                                eventNonworkingday = {GetEventNonWorkingDay(cal.id)}
                            />
                        )
                    })
                ):(
                    <span>Aún no tienes calendarios activos</span> 
                )}
            </Grid>
            {state.createModal ? <CreateCalendars/>: null}
            {state.updateModal ? <UpdateCalendars/>: null}
            {state.deleteModal ? <DeleteCalendars/>: null}
            {/*state.createIncidentModal? <CreateNonWorkinDay/>: null*/}
            {state.createIncidentModal? <CreateNonWorkingDayCalendarModal/>: null}
            
        </div>
    )
}