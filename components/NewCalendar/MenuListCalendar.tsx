import { useContext, useState } from "react";
import CalendarsContext from "../../context/NewCalendarContext/CalendarsContext";
import {updateCalendarsModal, deleteCalendarsModal, createIncidentModal} from '../../context/NewCalendarContext/Actions'
import { Box, Tooltip, IconButton, Menu, MenuItem, Grid } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import styles from './Calendars.module.css'
import NonWorkingDayTabAllCalendar from '../../components/Schedule/Tab/nonWorkingDayTabAllCalendar'

export const MenuCalendar = (props: any) => {
    //console.log("mostrar eliminar", props.showDelete)
    
    const {state,dispatch} = useContext(CalendarsContext)
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const openMenu = (e: any): void => {
      setAnchorEl(e.currentTarget);
    };
    const updateModal = (id:string, updateModal: boolean) =>{
      setAnchorEl(null);
      updateCalendarsModal(id, updateModal, dispatch)
    }
    const nonWorkingModal = (id:string, createIncidentModalB: boolean) =>{

        setAnchorEl(null);
        createIncidentModal(id, createIncidentModalB, dispatch)
      }
  
    const deleteModal = (id:string, deleteModal: boolean) =>{
      setAnchorEl(null);
      deleteCalendarsModal(id, deleteModal, dispatch)
    }


    const menuDelete = ()=>{
        if(props.showDelete == 1){
            return <MenuItem onClick={() => deleteModal(props._id, true)}>
                <div className={styles.contenedorTextoMenu}>
                    <span className={styles.textoMenuEliminar}>Eliminar calendario</span>
                </div>
                <div>
                    <img className={styles.iconoMenuEliminar} src="/assets/svg/icono-eliminar-admin.svg" alt="Editar" />
                </div>
            </MenuItem>
        }else{
            return <MenuItem 
                style={{
                    opacity: "0.5",
                    cursor: "context-menu"
                }}
            >
                <div className={styles.contenedorTextoMenu}>
                    <span className={styles.textoMenuEliminar}>Eliminar calendario</span>
                </div>
                <div>
                    <img className={styles.iconoMenuEliminar} src="/assets/svg/icono-eliminar-admin.svg" alt="Editar" />
                </div>
            </MenuItem>
        }
    }
  
    return (
        <>
            <Tooltip title="Editar" placement="right" >
                <Box mr={2}>
                    <IconButton onClick={openMenu}>
                        <MoreVertIcon className={styles.moreOption} 

                        />
                    </IconButton>
                </Box>
            </Tooltip>
            <Menu
                className="MoreVerIcon"
                anchorEl={anchorEl}
                open={open}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => nonWorkingModal(props._id, true)}>
                    <div className={styles.contenedorTextoMenu}>
                        <span className={styles.textoMenuEditar}>Agregar día inhábil</span>
                    </div>
                    <div>
                        <AddIcon className={styles.addIconMenu}/>
                    </div>
                </MenuItem>
                {/*}<NonWorkingDayTabAllCalendar idCalendar={props._id} />{*/}
                <MenuItem onClick={() => updateModal(props._id, true)}>
                    <div className={styles.contenedorTextoMenu}>
                        <span className={styles.textoMenuEditar}>Editar calendario</span>
                    </div>
                    <div>
                        <img className={styles.iconoMenu} src="/assets/svg/icono-editar.svg" alt="Editar" />
                    </div>
                </MenuItem>
                {menuDelete()}
            </Menu>
            
        </>
    )
}