import { ChangeEvent, useState, useEffect, useContext, useReducer } from 'react'
import {TabNonWorkingDaContext} from "../../../context/ScheduleContext/TabNonWorkingDay"
import { useToggle } from '../../../hooks/useToggle';
import { TabNonWorkingDayReducer } from "../../../context/ScheduleContext/TabNonWorkingDayReduce";
import CreaNonWorkingDay from "../../../components/Schedule/Modals/CreateNonWorkingDayModal";
import { getNonWorkingDay } from '../../../services/NonWorkingDayService'


export default function nonWorkingDayTab(){

    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addNonWorkingDayOpen, setAddNonWorkingDayOpen] = useToggle(false);
    const [NonWorkingDayState, NonWorkingDayDispatch,] = useReducer(TabNonWorkingDayReducer, { loading: true, NonWorkingDays: [], NonWorkingDayFilter: [] });
    const [nonWorkingDay, setNonWorkingDay] = useState([])

    useEffect(()=>{
        obtenerDatos();
    },[])
    
    const obtenerDatos = async () =>{
        let nonWorkingDay = await getNonWorkingDay();
        setNonWorkingDay(nonWorkingDay)
    }

    return
        <div>
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
                            <span>+ Nueva deducción</span>
                        </div>
                    </div>
                </button> 
                <CreaNonWorkingDay getDatos={obtenerDatos} />
            </TabNonWorkingDaContext.Provider>
        </div>
    


}