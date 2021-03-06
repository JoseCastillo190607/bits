import { Box, MenuItem, Menu, Fade } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { MouseEvent, useContext, useState } from "react";
import { Collaborator } from '../../../interfaces/TabCollaborator.interfaces';
import { TabCollaboratorContext } from '../../../context/TabCollaboratorContext/TabCollaboratorContext';
import { setCollaborator } from '../../../actions/tabColabortor';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { AdminContext } from '../../../context/AdminContext/AdminContext';


const UserOptionsField = (props: Collaborator) => {
    const {adminState} = useContext(AdminContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setInactiveOpen, collaboratorDispatch } = useContext(TabCollaboratorContext);
    const open = Boolean(anchorEl);
    const history = useHistory();

    const handleOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openInactive = () => {
        collaboratorDispatch(setCollaborator(props));
        setInactiveOpen()
    }

    return (
        <div>

            <Box>
                <Tooltip title="Opciones" placement="right">
                    <Box className="IconButtonPoints">
                        <IconButton onClick={handleOpen} aria-controls="fade-menu" aria-haspopup="true">
                            <MoreVertIcon style={{ color: "#fabb00" }} />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Box>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Inactivar === true)?
                <MenuItem divider onClick={openInactive}>
                    Inactivar&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="/assets/svg/icono-reactivar.svg" alt="Eliminar" />
                    </Grid>
                </MenuItem>
                :null
                }
                {(adminState?.PermisosContex?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Acceso === true)?
                <MenuItem onClick={() => history.push(`/collaborators/${props._id}/1`)}>
                    Editar&nbsp;
                    <Grid container item justify="flex-end">
                        <img src="/assets/svg/icono-editar.svg" alt="Editar" />
                    </Grid>

                </MenuItem>
                    :null
                }
            </Menu>
        </div>
    )
}

export default UserOptionsField;
