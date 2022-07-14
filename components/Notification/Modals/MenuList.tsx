import { useContext, useState } from "react";
import { Box, Grid, IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteNotification } from "../../../services/notificationService";
import { closeModal, openModal } from "../../Team/Modals/Modal";
import ModalContext from "../../../context/ModalContext/ModalContext";
import { AdminContext } from "../../../context/AdminContext/AdminContext";

const MenuList = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { dispatch } = useContext(ModalContext);
    const {adminState} = useContext(AdminContext)

    const onDelete = async () => {
        await deleteNotification(props._id);
        await closeModal(dispatch);
        setAnchorEl(null);
    }
    const onEditNotification = () => {
        openModal({ _id: props._id }, dispatch);
        setAnchorEl(null);
    }
    return (
        <>
            <Tooltip title="Editar" placement="right">
                <Box className="IconButtonPoints" mr={2}>
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
            >
                {(adminState?.PermisosContex?.Modulos?.Notificaciones?.Reenviar) === true?
                    <MenuItem divider button onClick={onEditNotification}>
                        Reenviar&nbsp;
                        <Grid container item justify="flex-end">
                            <img src={`/assets/svg/icono-reenviar.svg`} alt="Reenviar" />
                        </Grid>
                    </MenuItem>
                    :null
                }
                {(adminState?.PermisosContex?.Modulos?.Notificaciones?.Eliminar) === true?
                <MenuItem button onClick={() => onDelete()}>
                    Eliminar&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="/assets/svg/icono-eliminar.svg" alt="Eliminar" />
                    </Grid>
                </MenuItem>
                :null
                }
            </Menu >
        </>
    )
}

export default MenuList;