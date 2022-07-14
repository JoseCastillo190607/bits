import { Box, Grid, Menu, MenuItem, Tooltip } from '@material-ui/core'
import "../styles.css"
import { useContext, useState } from "react";
import {EditNonWorkingDay} from "./EditNonWorkingDay"

import {createNonWorkingDayModal, deleteNonWorkingDayModal} from '../../../context/ScheduleContext/Actions'
import CalendarsContext from "../../../context/NewCalendarContext/CalendarsContext";
import { CreateEvent } from '../../Schedule/Modals/createEvent';

interface TabMeasures {
    children?: React.ReactNode;
    measures: any;
    NonWorkingDayName: any;
    calendar: any;
    idNonWorkingDay: any
};

function NonWorkingDayDivModal(props: TabMeasures){

    const { children, measures, NonWorkingDayName, calendar, idNonWorkingDay } = props;
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const {state,dispatch} = useContext(CalendarsContext)
    
    
    const createModal = (id:string, createModal:boolean) => {
        //console.log("pantalla non",id);
        setAnchorEl(null);
        createNonWorkingDayModal(id, createModal, dispatch)
        //console.log("despues de dar clic",createModal, state);
        //console.log(state.createEventModal)
    }
    
    const deleteModal = (id:string, createModal:boolean) =>{
        setAnchorEl(null);
        console.log("inicial",state);
        deleteNonWorkingDayModal(id, createModal, dispatch)
        console.log("Termina",state);
    }

    return <>
        <div 
            className="nonWorkingDay" 
            style={
                {
                    width: measures.width,
                    left: measures.left
                }
            }
            onClick={(e) => {
                //console.log(e.currentTarget.style.width);
                
                setAnchorEl(e.currentTarget)
            }}
            >{NonWorkingDayName}
        </div>
        <Menu
            className="MoreVerIcon"
            anchorEl={anchorEl}
            open={open}
            transformOrigin={{ vertical: -40, horizontal: "left" }}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem divider button 
            onClick={() => createModal(idNonWorkingDay, true)}
            >
                Editar&nbsp;
                <Grid container item justify="flex-end">
                    <img src={`/assets/svg/icono-editar.svg`} alt="Editar" />
                </Grid>
            </MenuItem>
            <MenuItem divider button 
             onClick={() => deleteModal(idNonWorkingDay, true)}
            >
                Eliminar&nbsp;
                <Grid container item justify="flex-end" >
                    <img src={`/assets/svg/icono-eliminar.svg`} alt="Eliminar" />
                </Grid>
            </MenuItem>
        </Menu >
        
    </>

}

export default NonWorkingDayDivModal