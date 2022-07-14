import { ChangeEvent, useState, useEffect, useContext, useReducer } from 'react'
import {TabEventIncidentContext} from "../../../context/ScheduleContext/tabEventIncident"
import { useToggle } from '../../../hooks/useToggle';
import { TabEventIncidentReducer } from "../../../context/ScheduleContext/TabEventIncidentReduce";
import {Events} from "../../../components/Schedule/Modals/event";
//import { getNonWorkingDay } from '../../../services/NonWorkingDayService'

import "../styles.css"


export default function EventIncidentTab(idCalendar: any){

    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addEventIncidentOpen, setAddEventIncidentOpen] = useToggle(false);
    const [EventIncidentState, EventIncidentDispatch,] = useReducer(TabEventIncidentReducer, { loading: true, EventIncidents: [], EventIncidentFilter: [] });
    const [EventIncident, setEventIncident] = useState([])
    /*
    useEffect(()=>{
        obtenerDatos();
    },[])
    
    const obtenerDatos = async () =>{
        let nonWorkingDay = await getNonWorkingDay();
        //console.log(nonWorkingDay);
        
        setNonWorkingDay(nonWorkingDay)
        
    }
    */
    return <div>
        <TabEventIncidentContext.Provider
            value={{
                inactiveOpen,
                setInactiveOpen,
                addEventIncidentOpen,
                setAddEventIncidentOpen,
                EventIncidentState,
                EventIncidentDispatch
            }}
        >
            <button onClick={setAddEventIncidentOpen} className="botonHeaderIncident">
                <div className='contenedorBotonHeaderIncident'>
                    <div className="textoBotonHeaderIncident">
                        <b>+</b>
                    </div>
                </div>
            </button> 
            <Events idCalendar={idCalendar.idCalendar} />
        </TabEventIncidentContext.Provider>
    </div>
}