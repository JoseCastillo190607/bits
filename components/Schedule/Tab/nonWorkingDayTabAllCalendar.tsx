
import { ChangeEvent, useState, useEffect, useContext, useReducer } from 'react'
import {TabNonWorkingDaContext} from "../../../context/ScheduleContext/TabNonWorkingDay"
import { useToggle } from '../../../hooks/useToggle';
import { TabNonWorkingDayReducer } from "../../../context/ScheduleContext/TabNonWorkingDayReduce";
import CreaNonWorkingDay from "../../../components/Schedule/Modals/CreateNonWorkingDayModal";
import { getNonWorkingDay } from '../../../services/NonWorkingDayService'
import { Box, Tooltip, IconButton, Menu, MenuItem, Grid } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import styles from '../../../components/NewCalendar/Calendars.module.css'

export default function NonWorkingDayTabAllCalendar(idCalendar: any){

    const [inactiveOpen, setInactiveOpen] = useToggle(false);
    const [addNonWorkingDayOpen, setAddNonWorkingDayOpen] = useToggle(false);
    const [NonWorkingDayState, NonWorkingDayDispatch,] = useReducer(TabNonWorkingDayReducer, { loading: true, NonWorkingDays: [], NonWorkingDayFilter: [] });
    const [nonWorkingDay, setNonWorkingDay] = useState([])

    useEffect(()=>{
        obtenerDatos();
    },[])
    
    const obtenerDatos = async () =>{
        let nonWorkingDay:any = await getNonWorkingDay();
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
            <MenuItem onClick={setAddNonWorkingDayOpen}>
                <div className={styles.contenedorTextoMenu}>
                    <span className={styles.textoMenuEditar}>Agregar día inhábil</span>
                </div>
                <div>
                    <AddIcon className={styles.addIconMenu}/>
                </div>
            </MenuItem>
            <CreaNonWorkingDay idCalendar={idCalendar.idCalendar} />
        </TabNonWorkingDaContext.Provider>
    </div>
}