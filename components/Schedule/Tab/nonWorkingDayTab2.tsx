import { ChangeEvent, useState, useEffect, useContext, useReducer } from 'react'
import {TabNonWorkingDaContext} from "../../../context/ScheduleContext/TabNonWorkingDay"
import { useToggle } from '../../../hooks/useToggle';
import { TabNonWorkingDayReducer } from "../../../context/ScheduleContext/TabNonWorkingDayReduce";
import CreaNonWorkingDay from "../../../components/Schedule/Modals/CreateNonWorkingDayModal";
import { getNonWorkingDay } from '../../../services/NonWorkingDayService'


export default function NonWorkingDayTab(idCalendar: any){

    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addNonWorkingDayOpen, setAddNonWorkingDayOpen] = useToggle(false);
    const [NonWorkingDayState, NonWorkingDayDispatch,] = useReducer(TabNonWorkingDayReducer, { loading: true, NonWorkingDays: [], NonWorkingDayFilter: [] });
    const [nonWorkingDay, setNonWorkingDay] = useState([])

    useEffect(()=>{
        obtenerDatos();
    },[])
    
    const obtenerDatos = async () =>{
        let nonWorkingDay = await getNonWorkingDay();
        //console.log(nonWorkingDay);
        
        setNonWorkingDay(nonWorkingDay)
        
    }

    return <div>
        <TabNonWorkingDaContext.Provider
            value={{
                inactiveOpen,
                setInactiveOpen,
                addNonWorkingDayOpen,
                setAddNonWorkingDayOpen,
                NonWorkingDayState,
                NonWorkingDayDispatch
            }}
        >
            <button onClick={setAddNonWorkingDayOpen} className="botonHeader">
                <div className='contenedorBotonHeader'>
                    <div className="textoBotonHeader">
                        <b>+ Agregar día inhábil</b>
                    </div>
                </div>
            </button> 
            <CreaNonWorkingDay idCalendar={idCalendar.idCalendar} />
        </TabNonWorkingDaContext.Provider>
    </div>
}