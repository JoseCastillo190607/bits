import React, {useState, useEffect, useContext} from "react";
import { Box, Menu, MenuItem, Tooltip, Select } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import ModalState from '../../context/ModalContext/ModalState'
import buildCalendar from "./build"
import "./styles.css"
import styles from './Calendars.module.css'
import dayStyles from "./styles"
import moment from "moment";
import WeekStyles from "./WeekStyles"
import IncidentClass from "./IncidentClass"
import {
    GET_ALL_EVENT_CALENDAR,
    GET_NON_WORKING_MONTH,
    GET_PAYROLL_BY_CALENDAR_BY_DATE,
    GET_ALL_PERCEPTIONS_CALENDAR,
    GET_DEDUCTIONS_CALENDAR,
    GET_ALL_EVENT_CALENDAR_BY_DATE,
    GET_NON_WORKING_BY_DATE
} from "../../Querys/querys"
import { useQuery } from "@apollo/client"
import { CreateEvent } from './Modals/createEvent';
import {createIncidentModal, createEventModal, createNonWorkingDayModal, deleteNonWorkingDayModal} from '../../context/ScheduleContext/Actions'
import CalendarsContext from "../../context/NewCalendarContext/CalendarsContext";
import NonWorkingDayEditModal from "./Modals/NonWorkingDayEditModal"
import EventEditModal from "./Modals/EventEditModal"
import IncidentNameText from "./IncidentNameText"
import NonWorkingDayTab from "./Tab/nonWorkingDayTab2"
import CreateNonWorkinDay from '../../components/NewCalendar/Modals/NonWorking/CreateNonWorkingDayModal'
import {EditNonWorkingDay} from "../../components/Schedule/Modals/EditNonWorkingDay"
import CreateNonWorkingDayEditModal from '../../components/NewCalendar/Modals/NonWorking/CreateNonWorkingDayEditModal'
import CreateNonWorkingDayEditModal2 from '../../components/NewCalendar/Modals/NonWorking/CreateNonWorkingDayEditModal2'
import CreateNonWorkingDayEditModal3 from '../../components/NewCalendar/Modals/NonWorking/CreateNonWorkingDayEditModal3'
import DeleteNonWorkingDay from '../../components/NewCalendar/Modals/deleteNonWorkingDay'
import DeleteEvent from '../../components/NewCalendar/Modals/DeleteEvent'
import CreateEventEditModal from '../../components/NewCalendar/Modals/Event/CreateEventEditModal'
import CreateEventEditModal2 from '../../components/NewCalendar/Modals/Event/CreateEventEditModal2'
interface TabCalendar {
    children?: React.ReactNode;
    idCalendar: any;
    nameCalendar: any;
  };

export default function Calendar(props: TabCalendar){
    const { children, idCalendar, nameCalendar } = props;

    let numberWeek : any
    const [value, setValue] = useState(moment())
    const [daySelectedMonth, setdaySelectedMonth] = useState(value)  
    const [selectedfiltto, setselectedfiltto] = useState(false)  
    const [filtrado, setFiltrado] =  useState([])
    //console.log(filtrado)
    const [nonWorkingDays, setNonWorkingDays] =  useState([])
    const [calendar, setCalendar] = useState<Array<any>>([])

    
    const startDayOfMonth = value.clone().startOf("month")
    const endDayOfMonth = value.clone().endOf("month")

    const resultPerceptions = useQuery(GET_ALL_PERCEPTIONS_CALENDAR);
    const allPerceptions = resultPerceptions.data?.GET_ALL_PERCEPTIONS_CALENDAR;
    
    const resultDeductions = useQuery(GET_DEDUCTIONS_CALENDAR);
    const allDeductions = resultDeductions.data?.GET_DEDUCTIONS_CALENDAR;
    
    let incidentName: any[] = []

    allPerceptions?.forEach((Perception: any) => {
        const NewPerception = {
            Name: Perception.ConceptName,
            Description:Perception.descriptionPerception
        }
        //console.log(Perception.ConceptName)
        //console.log(Perception.descriptionPerception)
        //console.log(NewPerception);
        incidentName.push(NewPerception)
    });

    allDeductions?.forEach((Deductions: any) => {
        const NewDeductions = {
            Name: Deductions.concept_type,
            Description:Deductions.descriptiondeductions
        }
        //console.log(Perception.ConceptName)
        //console.log(Perception.descriptionPerception)
        //console.log(NewPerception);
        incidentName.push(NewDeductions)
    });
    
    const resultIncident2 = useQuery(GET_PAYROLL_BY_CALENDAR_BY_DATE, {variables:{idCalendar:parseInt(idCalendar), dateFilter: value}});
    const allIncident2 = resultIncident2.data?.GET_PAYROLL_BY_CALENDAR_BY_DATE;    
    console.log('Incidencias', allIncident2, idCalendar)
    
    /*
    const resultEvent = useQuery(GET_ALL_EVENT_CALENDAR, {
        variables: { calendarId: parseInt(idCalendar), initDate: value },
    });
    const allEvent = resultEvent.data?.GET_ALL_EVENT_CALENDAR;
    */
    
    const resultEvent = useQuery(GET_ALL_EVENT_CALENDAR_BY_DATE, {
        variables: { calendarId: parseInt(idCalendar), initDate: value },
    });
    const allEvent = resultEvent.data?.GET_ALL_EVENT_CALENDAR_BY_DATE;

    /*
    const {data:resultNon_Working}= useQuery(GET_NON_WORKING_MONTH, {
        variables: { calendarId: parseInt(idCalendar), initDate: value },
    });
    const allNon_Working = resultNon_Working?.GET_NON_WORKING_MONTH
    */
    const {data:resultNon_Working}= useQuery(GET_NON_WORKING_BY_DATE, {
        variables: { calendarId: parseInt(idCalendar), initDate: value },
    });
    const allNon_Working = resultNon_Working?.GET_NON_WORKING_BY_DATE
    //console.log(allNon_Working)
    
    const {state,dispatch} = useContext(CalendarsContext)
    //console.log(state)

    const createModalEvent = (id:string, createModal:boolean) => {
        //console.log('inicio',state)
        createEventModal({id, createModal},dispatch)
        //console.log('accion',state)
    }


    let incidentNameMonth: any[] =[]
    let incidentNameMonthNotRepeated: any[] =[]
    let found: any ={}

    incidentName?.forEach((name: any) => {
        
        filtrado?.forEach((incident: any) =>{
            if(selectedfiltto){
                if(name.Name == incident.incident_type_Name ){
                    incidentNameMonth.push(name.Name)
                }
            }else{
                if(name.Name == incident.incident_type_Name && moment(incident.date_Incident).format('DD') === daySelectedMonth.format('DD') ){
                    incidentNameMonth.push(name.Name)
                }
            }

            
            
        })
    });
    incidentNameMonthNotRepeated = incidentNameMonth.filter( (element: any) =>{
        return found.hasOwnProperty(element)? false : (found[element]=true);
    })
    
    let incidentNameDate: any[] = []
    filtrado?.forEach((incident: any) =>{
        const nameDate = {
            Incident: incident.incident_type_Name,
            Date: incident.date_Incident
        }
        incidentNameDate.push(nameDate) 
    })

    const incidentNameDateNotRepeated = incidentNameDate.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.Incident === current.Incident && moment(item.Date).format() === moment(current.Date).format() );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
    }, []);   
    

    const classDayBox = () =>{

        document.querySelectorAll(".daySelected")?.forEach((selected: any)=>{
            selected.className="dayBox"
            
        })
    }

    const datosFiltrados = (e:any) =>{
        
        if(e !== '') {
            setselectedfiltto(true)
            let expresion = new RegExp(`${e}.*`, "i")

            const nuevoFiltrado = filtrado.filter((lis:any) =>expresion.test(lis.collaboratorName))
            setFiltrado(nuevoFiltrado)
        }else{
            setselectedfiltto(false)
            obtenerDatos()
        }
        
    }
        
    const datosOrder = (e:any) =>{
        const incidents = [...filtrado]
        
        if(e !== "") {
            if(e === "Mayor"){
                const resultado = incidents?.sort((a:any, b:any) => (a.collaboratorName >= b.collaboratorName) ? 1 : -1)
                setFiltrado(resultado)
            }else{
                const resultado = incidents?.sort((a:any, b:any) => (a.collaboratorName <= b.collaboratorName) ? 1 : -1)
                setFiltrado(resultado)
            }
            
        }else{
            obtenerDatos()
        }
        //console.log(filtrado)
    }

    const obtenerDatos = async () => {
        setFiltrado(allIncident2)
        
    };
    
    useEffect(() =>{
        setCalendar((current)=>current=buildCalendar(value))
        setFiltrado(allIncident2)
        //console.log('valor actual',value)
    },[value, allIncident2])

    useEffect(() =>{
        
        if(allNon_Working){
            setNonWorkingDays(allNon_Working)
        }
        //console.log('showschedule',nonWorkingDays)
    },[allNon_Working])

    const currMonthName = () =>{
        return value.locale('es').format("MMMM")
    }

    const currYear = () =>{
        return value.format("YYYY")
    }

    const prevMonth = () =>{
        classDayBox()
        return value.clone().subtract(1,"month")
    }

    const nextMonth = () =>{
        classDayBox()
        return value.clone().add(1,"month")
    }

    const IncidentInDay = (day: any, incident: any, type_Name: any) =>{

        
        if (day.isSame(incident, "day")){            
            
            return  <div className={IncidentClass(type_Name)}></div>
            
        }
    }

    const clickDay = (day: any, dayOfMonth: any, endDayOfMonth: any, e: any) =>{
        //console.log('cambio dia', day);
        
        classDayBox()
        
        if( (day.isBefore(dayOfMonth, "day")) || (day.isAfter(endDayOfMonth, "day")) ){
            setValue(day)
            
        }else{
            if (e.target.parentNode.className === "dayBox" ){
                e.target.parentNode.className="daySelected"
                setdaySelectedMonth(day)
            }
            if ( e.target.parentNode.parentNode.className === "dayBox"){
                //console.log(e.target.parentNode.parentNode);
                e.target.parentNode.parentNode.className="daySelected"
                setdaySelectedMonth(day)
            }
        }
    }
    
    const dayNumber = (value: any) =>{
        let day = value.format("D").toString()
    
        if (day.length === 1){
            day = "0"+day
        }

        numberWeek = value.format('w')
        //console.log(numberWeek)
        

        return day
    }

    const incidentDetail = (incidentName: any) =>(
        
        filtrado?.map((incident: any) =>{
            //console.log(incident.date_Incident);
            //console.log(value);
            
            if (selectedfiltto){
                if(incidentName == incident.incident_type_Name ){
                    return <div className="collaboratorDayIncident" ><b>{moment(incident.date_Incident).format('DD')}</b> {incident.collaboratorName}</div>
    
                }
            }else{
                if(incidentName == incident.incident_type_Name && moment(incident.date_Incident).format('DD') === (daySelectedMonth.format('DD'))){
                    return <div className="collaboratorDayIncident" ><b>{moment(incident.date_Incident).format('DD')}</b> {incident.collaboratorName}</div>
    
                }
            }
            
        })

    )

    const titleIncident = (name: any) =>{
        let color = ""

        if(name === "Incapacidad"){
            color = "#ED88C2"
        }
        if(name === "Vacaciones"){
            color = "#277DA1"
        }
        if(name === "Faltas"){
            color = "#43AA9E"
        }
        if(name === "Cumpleaños"){
            color = "#FF6863"
        }
        if(name === "Aniversarios"){
            color = "#F48B52"
        }
        if(name === "Horas extra"){
            color = "#C57CCB"
        }
        if(name === "PCG"){
            color = "#90BE6D"
        }
        if(name === "PSG"){
            color = "#F9C74F"
        }

        return <div 
        className="titleIncident"
        style={
            {
                background: color
            }
        }
        >{name}</div>
    }

    const showEvent = (eventDay: any, eventDayEnd: any, name: any, idEvent: any) =>{
        const dayEvent = moment(eventDay)
        const dayEndEvent = moment(eventDayEnd)
        let eventWidth = ""
        let eventLeft = ""
        let varWidthStart = 0
        let varWidthEnd = 0
        let varWidth = 0
        let varLeft = 0

        if (numberWeek === dayEvent.format('w')){

            if (numberWeek === dayEndEvent.format('w')){
                if (dayEndEvent.format('dddd') === 'domingo'){
                    varWidthEnd = 1
                }
        
                if (dayEndEvent.format('dddd') === 'lunes'){
                    varWidthEnd = 2
                }
        
                if (dayEndEvent.format('dddd') === 'martes'){
                    varWidthEnd = 3
                }
        
                if (dayEndEvent.format('dddd') === 'miércoles'){
                    varWidthEnd = 4
                }
        
                if (dayEndEvent.format('dddd') === 'jueves'){
                    varWidthEnd = 5
                }
        
                if (dayEndEvent.format('dddd') === 'viernes'){
                    varWidthEnd = 6
                }
        
                if (dayEndEvent.format('dddd') === 'sábado'){
                    varWidthEnd = 7
                }
            }else{
                varWidthEnd = 7
            }
            
            if (dayEndEvent.format('dddd') === 'domingo'){
                varLeft = 0
                varWidthStart = 0
            }

            if (dayEvent.format('dddd') === 'lunes'){
                varLeft = 1
                varWidthStart = 1
            }

            if (dayEvent.format('dddd') === 'martes'){
                varLeft = 2
                varWidthStart = 2
            }

            if (dayEvent.format('dddd') === 'miércoles'){
                varLeft = 3
                varWidthStart = 3
            }

            if (dayEvent.format('dddd') === 'jueves'){
                varLeft = 4
                varWidthStart = 4
            }

            if (dayEvent.format('dddd') === 'viernes'){
                varLeft = 5
                varWidthStart = 5
            }

            if (dayEvent.format('dddd') === 'sábado'){
                varLeft = 6
                varWidthStart = 6
            }

            varWidth = varWidthEnd - varWidthStart
            eventWidth = "calc((100%/7)*"+varWidth.toString()+")"
            eventLeft = "calc((100%/7)*"+varLeft.toString()+")"
            
            const measuresEvent = {
                width: eventWidth,
                left: eventLeft
            }
            //console.log(measuresEvent)
            return <EventEditModal measures={measuresEvent} EventName={name} idEvent={idEvent} calendar ={idCalendar} /> 
            /*<div 
                    className="pruebasEvento" 
                    style={
                        {
                            width: eventWidth,
                            left: eventLeft
                        }
                    }
                    >{name}
                    </div>
            */

        }else{

            if (numberWeek === dayEndEvent.format('w')){
                if (dayEndEvent.format('dddd') === 'domingo'){
                    varWidthEnd = 1
                }
        
                if (dayEndEvent.format('dddd') === 'lunes'){
                    varWidthEnd = 2
                }
        
                if (dayEndEvent.format('dddd') === 'martes'){
                    varWidthEnd = 3
                }
        
                if (dayEndEvent.format('dddd') === 'miércoles'){
                    varWidthEnd = 4
                }
        
                if (dayEndEvent.format('dddd') === 'jueves'){
                    varWidthEnd = 5
                }
        
                if (dayEndEvent.format('dddd') === 'viernes'){
                    varWidthEnd = 6
                }
        
                if (dayEndEvent.format('dddd') === 'sábado'){
                    varWidthEnd = 7
                }

                varWidth = varWidthEnd - varWidthStart
                eventWidth = "calc((100%/7)*"+varWidth.toString()+")"
                eventLeft = "calc((100%/7)*"+varLeft.toString()+")"

                const measuresEvent = {
                    width: eventWidth,
                    left: eventLeft
                }

                return <EventEditModal measures={measuresEvent} EventName={name} idEvent={idEvent} calendar ={idCalendar} />
                /*
                <div 
                    className="pruebasEvento" 
                    style={
                        {
                            width: eventWidth,
                            left: eventLeft
                        }
                    }
                    >{name}
                    </div>
                */
            
            }else{
                return ""
            }

        }
        
    }
    const createModalNonWorkinDay = (id:string, createModal:boolean) => {
        createIncidentModal(id, createModal, dispatch)
    }
    

    const showNonWorking = (nonWorkingDay: any, nonWorkingEnd: any, name: any, idNonWorkingDay: any) =>{
        const daynonWorking = moment(nonWorkingDay)
        const dayEndnonWorking = moment(nonWorkingEnd)
        let nonWorkingWidth = ""
        let nonWorkingLeft = ""
        let varWidthStart = 0
        let varWidthEnd = 0
        let varWidth = 0
        let varLeft = 0

        if (numberWeek === daynonWorking.format('w')){

            if (numberWeek === dayEndnonWorking.format('w')){
                if (dayEndnonWorking.format('dddd') === 'domingo'){
                    varWidthEnd = 1
                }
        
                if (dayEndnonWorking.format('dddd') === 'lunes'){
                    varWidthEnd = 2
                }
        
                if (dayEndnonWorking.format('dddd') === 'martes'){
                    varWidthEnd = 3
                }
        
                if (dayEndnonWorking.format('dddd') === 'miércoles'){
                    varWidthEnd = 4
                }
        
                if (dayEndnonWorking.format('dddd') === 'jueves'){
                    varWidthEnd = 5
                }
        
                if (dayEndnonWorking.format('dddd') === 'viernes'){
                    varWidthEnd = 6
                }
        
                if (dayEndnonWorking.format('dddd') === 'sábado'){
                    varWidthEnd = 7
                }
            }else{
                varWidthEnd = 7
            }
            
            if (dayEndnonWorking.format('dddd') === 'domingo'){
                varLeft = 0
                varWidthStart = 0
            }

            if (daynonWorking.format('dddd') === 'lunes'){
                varLeft = 1
                varWidthStart = 1
            }

            if (daynonWorking.format('dddd') === 'martes'){
                varLeft = 2
                varWidthStart = 2
            }

            if (daynonWorking.format('dddd') === 'miércoles'){
                varLeft = 3
                varWidthStart = 3
            }

            if (daynonWorking.format('dddd') === 'jueves'){
                varLeft = 4
                varWidthStart = 4
            }

            if (daynonWorking.format('dddd') === 'viernes'){
                varLeft = 5
                varWidthStart = 5
            }

            if (daynonWorking.format('dddd') === 'sábado'){
                varLeft = 6
                varWidthStart = 6
            }

            varWidth = varWidthEnd - varWidthStart
            nonWorkingWidth = "calc((100%/7)*"+varWidth.toString()+")"
            nonWorkingLeft = "calc((100%/7)*"+varLeft.toString()+")"
            
            const measuresnonWorkingDay = {
                width: nonWorkingWidth,
                left: nonWorkingLeft
            }

            return <NonWorkingDayEditModal measures={measuresnonWorkingDay} NonWorkingDayName={name} idNonWorkingDay={idNonWorkingDay} calendar={idCalendar} />
                

        }else{

            if (numberWeek === dayEndnonWorking.format('w')){
                if (dayEndnonWorking.format('dddd') === 'domingo'){
                    varWidthEnd = 1
                }
        
                if (dayEndnonWorking.format('dddd') === 'lunes'){
                    varWidthEnd = 2
                }
        
                if (dayEndnonWorking.format('dddd') === 'martes'){
                    varWidthEnd = 3
                }
        
                if (dayEndnonWorking.format('dddd') === 'miércoles'){
                    varWidthEnd = 4
                }
        
                if (dayEndnonWorking.format('dddd') === 'jueves'){
                    varWidthEnd = 5
                }
        
                if (dayEndnonWorking.format('dddd') === 'viernes'){
                    varWidthEnd = 6
                }
        
                if (dayEndnonWorking.format('dddd') === 'sábado'){
                    varWidthEnd = 7
                }

                varWidth = varWidthEnd - varWidthStart
                nonWorkingWidth = "calc((100%/7)*"+varWidth.toString()+")"
                nonWorkingLeft = "calc((100%/7)*"+varLeft.toString()+")"

                const measuresnonWorkingDay = {
                    width: nonWorkingWidth,
                    left: nonWorkingLeft
                }

                return <NonWorkingDayEditModal measures={measuresnonWorkingDay} NonWorkingDayName={name} idNonWorkingDay={idNonWorkingDay} calendar ={idCalendar} />

            }else{
                return ""
            }

        }
        
    }

    const containerDayMonth = () =>{

        if(selectedfiltto){
            return <div className="containerDayMonth">
            <div className="dayMonth" ><b>{daySelectedMonth.format('MMMM')}</b></div>
        </div>
        } else{
            return <div className="containerDayMonth">
                <div className="dayMonth" ><b>{daySelectedMonth.format('dddd')}</b></div>
                <div className="dayMonth"><b>{daySelectedMonth.format('DD')} de {daySelectedMonth.format('MMMM')} {daySelectedMonth.format('YYYY')}</b></div>
            </div>
        }
        
    }
    
    return  <>
        <Box mt={3} ml={5} >
            <Grid container direction="row">
                <Grid xs={8}>
                    <p
                    className="nameCalendar"
                    >{nameCalendar}</p>
                </Grid>
                <Grid xs={3}>
                    <div className="conteinerbotonDiaInhabil">
                        <div className="conteinerbotonAgregarDiaInhabil">
                            <button
                                className="botonAgregarDiaInhabil"
                                onClick={() => createModalNonWorkinDay(idCalendar, true)}
                                >
                                <p className="textoBotonDiaInhabil"> Agregar día inhábil</p>
                            </button>
                        </div>
                    </div>
                    {state.createIncidentModal? <CreateNonWorkinDay setDate={setValue} date={value} setNonWorkingDays={setNonWorkingDays} nonWorkingDays={nonWorkingDays} />: null}
                    {state.deleteNonWorkingDayModal? <DeleteNonWorkingDay calendarDate={setValue} />: null}
                </Grid>
                
            </Grid>
        </Box>
        <Box mt={3} ml={5}>
            <Grid container direction="row">
                <Grid xs={8}>
                    <ModalState>
                        <IncidentNameText incidentName={incidentName} />
                    </ModalState>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid xs={8}>
                    <ModalState>
                    <div className="conteinerLeyend">
                        <div 
                            className="legendNonWorkingDay" 
                            >Día inhábil
                        </div>
                        <div 
                            className="legendEvent" 
                            >Evento
                        </div>
                    </div>
                        
                    </ModalState>
                </Grid>
            </Grid>
        </Box>
        
        <Box pt={3} ml={1}>
            <Grid container direction="row">
                <Grid xs={8} item className="Rectangle">
                    <ModalState>
                        <div className="calendar">
                            <div>
                                <div className="headerSchedule" >
                                    <div
                                    className="previous"
                                    onClick={() => setValue(prevMonth())}
                                    >{String.fromCharCode(60)}{String.fromCharCode(160)}</div>
                                    <div
                                    className="current"
                                    >
                                    {currMonthName()}{String.fromCharCode(32)}{currYear()}
                                    </div>
                                    <div
                                    className="next"
                                    onClick={() => setValue(nextMonth())}
                                    >{String.fromCharCode(160)}{String.fromCharCode(62)}</div>
                                </div>
                            </div>
                                
                            <div className="day-names">
                                {
                                    ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"].map(d => (
                                        <div className="week">{d}</div>
                                    ))
                                }
                            </div>
                            <div className="body">
                                {
                                    calendar.map((week) => (
                                        <div className="weekbox" >
                                            {

                                                week.map((day: any) => (
                                                    <div className={WeekStyles(day, value)}
                                                    onClick={(e: any)=> clickDay(day, startDayOfMonth, endDayOfMonth, e)}
                                                    >
                                                        <div 
                                                        className={dayStyles(day, value, startDayOfMonth, endDayOfMonth)}
                                                        >
                                                            <div>
                                                                <b>
                                                                    {
                                                                        dayNumber(day)
                                                                    }
                                                                </b>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="divBetweenDayIncident"></div>
                                                        <div className="containerDivIncidents">
                                                            <div>
                                                                <div className="divIncidents">
                                                                
                                                                    {
                                                                        incidentNameDateNotRepeated?.map((incident: any, index: any) =>(
                                                                            IncidentInDay(day, incident.Date, incident.Incident)
                                                                        )
                                                                            
                                                                        )
                                                                        
                                                                    }
                                                            
                                                                
                                                                </div>
                                                                
                                                            </div>  
                                                        </div>
                                                    </div>
                                                    
                                                ))
                                            }
                                            
                                            {
                                                nonWorkingDays?.map((nonWorking: any, index: any) =>(
                                                
                                                    showNonWorking(nonWorking.initDate, nonWorking.endDate, nonWorking.name, nonWorking.id)
                                                ))
                                            }

                                            {
                                                allEvent?.map((event: any, index: any) =>(
                                                    showEvent(event.initDate, event.endDate, event.name, event.id)
                                                ))
                                            }
                                            
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        {/*state.createNonWorkingDayModal ? <CreateNonWorkingDayEditModal2 calendarDate={setValue} />: null*/}
                        {state.createNonWorkingDayModal ? <CreateNonWorkingDayEditModal3 setDate={setValue} date={value} setNonWorkingDays={setNonWorkingDays} nonWorkingDays={nonWorkingDays} />: null}
                    </ModalState>
                    
                </Grid>
                <Grid xs={3} item className="Rectangle">
                    <ModalState>
                        <div className="divTitleIncident">
                            {containerDayMonth()}
                            <div className="divAddIncident">
                            <button 
                            className="botonHeaderIncident"
                            onClick={() => createModalEvent(idCalendar, true)}
                            >
                                <div className='contenedorBotonHeaderIncident'>
                                    <div className="textoBotonHeaderIncident">
                                    
                                    </div>
                                </div>
                            </button> 
                            </div>
                            {state.createEventModal ? <CreateEvent idCalendar ={idCalendar} setDate={setValue} />: null}
                            {state.deleteEditEventModal ? <DeleteEvent calendarDate={setValue} />: null}
                            {/*state.createEditEventModal ? <CreateEventEditModal calendarDate={setValue} />: null*/}
                            {state.createEditEventModal ? <CreateEventEditModal2 calendarDate={setValue} setDate={setValue} />: null}
                            
                        </div>
                        
                        <div className="containderImputs">
                            <div className="containderImputsSearcher">
                                <input 
                                className="inputSearcher"
                                onChange={(e: any) => datosFiltrados(e.target.value)}
                                />
                            </div>
                            <div className="containderImputsFilter">
                                {/*}
                                <input 
                                placeholder='Ordenar por'
                                className="inputFilter"
                                
                                />
                                {*/}
                                <select className="selectOrderCalendar"
                                 onChange={(e: any) => datosOrder(e.target.value)}
                                >
                                    <option value={""}>Ordenar nombre</option>
                                    <option value={"Mayor"}>Mayor</option>
                                    <option value={"Menor"}>Menor</option>
                                </select>
                            </div>
                        </div>
                        <div className="conteinerIncident">
                            {
                                incidentNameMonthNotRepeated?.map((typeIncident: any) =>(
                                    <div className="containerTitlesIncidentsMonth">
                                        
                                        {titleIncident(typeIncident)}
                                        <div className="containerCollaboratorDayIncident">
                                            {incidentDetail(typeIncident)}
                                        </div>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </ModalState>
                </Grid>
            </Grid>
        </Box>
    </>
    
}