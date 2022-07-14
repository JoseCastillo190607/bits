import { useContext, useState } from "react";
import { Box, Tooltip, IconButton, Menu, MenuItem, Grid } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { WarningAlert } from "../../../alerts/WarningAlert";
import { useHistory } from "react-router-dom";
import ModalContext from "../../../context/ModalContext/ModalContext";
import { openModal } from "../../Team/Modals/Modal";
import {AdminContext} from '../../../context/AdminContext/AdminContext'

interface Item {
    id: string;
}

const MenuButton = (props: Item) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const { dispatch } = useContext(ModalContext);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const {adminState} = useContext(AdminContext)


    const openMenu = (e: any): void => {
        setAnchorEl(e.currentTarget);
    };
    const reactiveCollaborator = async (): Promise<any> => {
        setAnchorEl(null);
        const result = await WarningAlert({ title: `Atención`, text: `¿Deseas reactivar el colaborador?`, confirmButtonText: `Reactivar`, showDenyButton: true });
        if (result.isConfirmed) {
            await openModal({ _id: props.id }, dispatch);
        }
    }
    return (
        <Grid direction="row" container justify="flex-end">
            <Tooltip title="Editar" placement="right" >
                <Box className="IconButtonPoints" mr={1}>
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
                onClose={() => setAnchorEl(null)}
            >
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Activar === true)?
                <MenuItem divider button onClick={reactiveCollaborator}>
                    Activar&nbsp;<img src="/assets/svg/icono-reactivar.svg" height="21" alt="Reactivar" />
                </MenuItem>
                :null
                }
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Inactivos?.Ver?.Acceso === true)?
                <MenuItem onClick={() => history.push(`/inactivos/${props.id}/1`)}>
                    Ver&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="/assets/svg/icono-ver.svg" alt="Editar" />
                    </Grid>
                </MenuItem>
                 :null
                }
            </Menu>
        </Grid>
    )
}

export default MenuButton;