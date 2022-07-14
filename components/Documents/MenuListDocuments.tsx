import { useContext, useState } from "react";
import DocumentsContext from "../../context/DocumentContext/DocumentsContext";
import {updateDocumentsModal, deleteDocumentsModal} from '../../context/DocumentContext/Actions'
import { Box, Tooltip, IconButton, Menu, MenuItem, Grid } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './Documents.module.css'


export const MenuDocuments = (props: any) => {
    const {state,dispatch} = useContext(DocumentsContext)
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const openMenu = (e: any): void => {
      setAnchorEl(e.currentTarget);
    };
    const updateModal = (id:string, updateModal: boolean) =>{
      setAnchorEl(null);
      updateDocumentsModal(id, updateModal, dispatch)
    }
  
    const deleteModal = (id:string, deleteModal: boolean) =>{
      setAnchorEl(null);
      deleteDocumentsModal(id, deleteModal, dispatch)
    }
  
    return (
        <>
            <Tooltip title="Editar" placement="right" >
                <Box className="IconButtonPoints" mr={2}>
                    <IconButton onClick={openMenu}>
                        <MoreVertIcon style={{ color: "#fabb00" }} />
                    </IconButton>
                </Box>
            </Tooltip>
            <Menu
                className="MoreVerIcon"
                anchorEl={anchorEl}
                open={open}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => updateModal(props._id, true)}>
                    <div className={styles.contenedorTextoMenu}>
                        <span className={styles.textoMenuEditar}>Editar</span>
                    </div>
                    <div>
                        <img className={styles.iconoMenu} src="/assets/svg/icono-editar.svg" alt="Editar" />
                    </div>
                </MenuItem>
                <MenuItem onClick={() => deleteModal(props._id, true)}>
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