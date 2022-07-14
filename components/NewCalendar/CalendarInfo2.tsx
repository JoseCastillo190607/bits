import { Grid } from '@material-ui/core';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { MenuCalendar } from './MenuListCalendar';
import styles from './Calendars.module.css'
import { useQuery } from "@apollo/client";
import { GET_PAYROLL_BY_CALENDAR , GET_ALL_EVENT} from "../../Querys/querys";
import { useHistory } from "react-router-dom";
import { style } from '@mui/system';

export const CalendarInfo2 = ({name, enterprise, _id}:any) => {
    console.log(name.length);
    
    const history = useHistory();
    const {loading: loadingA, error:errorA, data:dataA} = useQuery(GET_ALL_EVENT, {variables:{id:parseInt(_id)}});
    const {loading, error, data} = useQuery(GET_PAYROLL_BY_CALENDAR, {variables:{id:parseInt(_id)}});
    if(loading) return null
    //console.log(data.GET_PAYROLL_BY_CALENDAR)
    const incidentCount = data.GET_PAYROLL_BY_CALENDAR.length
    const eventCount = dataA?.GET_ALL_EVENT.length
    const borderRadius = 'border-radius'
    const marginBottom = 'margin-bottom'
    const margintTop = 'margin-top'
    return (
        <Grid item xs={6} sm={4} >
            <Paper elevation= {4}>
                <Card>
                    <CardContent>
                        <Grid container>  
                            <Grid xs={10} className={styles.conteinerCard}>
                                <Grid container>

                                    <div className={styles.conteinerCalendarName}>
                                        <span 
                                        onClick = {() => history.push(`/Schedule2/${_id}`)} 
                                        className={styles.tituloNombreCard}>
                                            <p>{name}</p>    
                                        </span>
                                    </div>
                                        

                                </Grid>
                                <Grid container>                            
                                    <Grid xs={12} className={styles.centerContainer}>
                                        <span className={styles.tituloRazon}>Razón social</span>
                                    </Grid>
                                </Grid>
                                <Grid container>                            
                                    <Grid xs = {12} className={styles.centerContainer}>
                                        <span className={styles.tituloEnter}>{enterprise}</span>
                                    </Grid>
                                </Grid>
                                <Grid container

                                >                            
                                    <Grid xs={6} >
                                        <div className={styles.centerContainerCount}>
                                            <Grid container>
                                                <Grid xs={12} className={styles.centerContainer}>
                                                    <span className={styles.tituloEvent}>Incidencias activas </span>
                                                </Grid>
                                                <Grid xs={12} className={styles.centerContainer}>
                                                    <span className={styles.tituloEventNumber}>{incidentCount}</span>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid xs = {6} >
                                        <div className={styles.centerContainerCount}>
                                                <Grid container>
                                                    <Grid xs={12} className={styles.centerContainer}>
                                                        <span className={styles.tituloEvent}>Eventos registrados </span>
                                                    </Grid>
                                                    <Grid xs={12} className={styles.centerContainer}>
                                                        <span className={styles.tituloEventNumber}>{eventCount}</span>
                                                    </Grid>
                                                </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={2}  
                            className={
                                styles.conteinerMenu
                            }>
                                <div className={
                                styles.conteinerMenuCalendar
                                }>
                                    <MenuCalendar _id={_id} />
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )
}