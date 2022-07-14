import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_NOTIFICATIONS } from "../../Querys/querys";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../../styles/Header/headerStyles.module.css'

const MenuListPrincipal = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);

  const [deleteNotifications] = useMutation(DELETE_NOTIFICATIONS,{})
  
  const eliminarNotificaciones = () => {
    deleteNotifications({})
  }

  return(
  <>
    <Tooltip title="Editar" placement="right">
      <Box className="IconButtonPoints" mr={1}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon style={{ color: "#fabb00" }} />
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
          maxHeight: '100px',
          borderRadius: '10px',
          marginBottom: 'none',
          border: '1px solid #D6D6D6'
        },
      }}
      >
        <MenuItem 
          button
          onClick={() => eliminarNotificaciones()}
          >
          <div className={styles.mn_contenedor}>
            <div className={styles.mn_iconoEliminarTodas}></div>
            <div className={styles.mn_texto}>Eliminar todas</div>
          </div>
        </MenuItem>
        </Menu >
    </>
)
}

export default MenuListPrincipal