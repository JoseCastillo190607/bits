import { useContext, useState } from "react";
import AdministratorsContext from '../../context/AdministratorsContext/AdministratorsContext'
import { updateAministratorsModal, deleteAdministratorsModal } from '../../context/AdministratorsContext/Actions'
// import { Box, Tooltip, IconButton, Menu, MenuItem, Grid, MoreVertIcon } from "@material-ui/core";
import {Box, Tooltip, IconButton, Menu, MenuItem, Grid} from '@material-ui/core';
import MoreVertIcon from "@material-ui/core";
// import MoreVertIcon from "@material-ui/core";
import styles from "../../styles/Administrators.module.css";


export const MenuAdministrators = (props:any) =>{
  const {state, dispatch} = useContext(AdministratorsContext)

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const openMenu = (e: any): void => {
    setAnchorEl(e.currentTarget);
  };

  const updateModal = (id:string, updateModal: boolean) =>{
    setAnchorEl(null);
    updateAministratorsModal(id, updateModal, dispatch)
  }

  const deleteModal = (id:string, deleteModal: boolean) =>{
    setAnchorEl(null);
    deleteAdministratorsModal({id, deleteModal}, dispatch)
  }

  return(
    <>
      <Tooltip title="Editar" placement="right" >
          <Box className="IconButtonPoints" mr={2}>
              <IconButton onClick={openMenu}>
                 {/* <MoreVertIcon styles={{color:"#fabb00"}}/>   Este es el error */}
                
              </IconButton>
          </Box>
      </Tooltip>
        <Menu                
          className="MoreVerIcon"
          anchorEl={anchorEl}
          open={open}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => updateModal(props._id, false)}>
              <div className={styles.contenedorTextoMenu}>
                <span className={styles.textoMenuEditar}>Editar</span>
              </div>
              <div>
                <img className={styles.iconoMenu} src="/assets/svg/icono-editar.svg" alt="Editar" />
              </div>
            </MenuItem>
            <MenuItem onClick={()=> deleteModal('1', true)}>
              <div className={styles.contenedorTextoMenu}>
                <span className={styles.textoMenuEliminar}>Eliminar</span>
              </div>
              <div>
                <img className={styles.iconoMenuEliminar} src="/assets/svg/icono-eliminar-admin.svg" alt="Editar" />
              </div>
            </MenuItem>
        </Menu>

    </>
  )
}