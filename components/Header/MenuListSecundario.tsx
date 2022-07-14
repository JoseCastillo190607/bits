import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../../styles/Header/headerStyles.module.css'
import { useHistory, useParams } from "react-router-dom"
import {useMutation} from "@apollo/client"
import { DELETE_NOTIFICATION } from "../../Querys/querys";

const MenuListSecundario = ({Desde, idRegistro, idNotificacion}:any) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const {id, tab} = useParams<any>();
  const history = useHistory();
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION,{})

  let ruta = ""

  if(Desde === "AtencionAzul"){
    ruta = '/payroll'
  }

  const eliminaNotificacion = () =>{
    deleteNotification({
      variables:{
        deleteNotificationId:idNotificacion
      }
    })
  }

  
  return(
  <>
    <Tooltip title="Editar" placement="right">
      <Box className="IconButtonPoints" mr={1}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon style={{ color: "#D6D6D6" }} />
        </IconButton>
      </Box>
    </Tooltip>
    <Menu
      className="MoreVerIcon"
      anchorEl={anchorEl}
      open={open}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => setAnchorEl(null)}
      PaperProps={{
        style: {
          maxHeight: '160px',
          borderRadius: '10px',
          border: '1px solid #D6D6D6'
        },
      }}
      >
        <MenuItem 
          divider 
          button
          onClick={() => eliminaNotificacion()}
          >
          <div className={styles.mn_contenedor}>
            <div className={styles.mn_iconoEliminarTodas}></div>
            <div className={styles.mn_texto}>Eliminar notificac&iacute;on</div>
          </div>
        </MenuItem>
        <MenuItem  button onClick={() => history.push(ruta) }>
          <div className={styles.mn_contenedor}>
            <div className={styles.mn_iconoIralProceso}></div>
            <div className={styles.mn_texto}>Ir al proceso</div>
          </div>
        </MenuItem>
        </Menu >
    </>
)
}

export default MenuListSecundario